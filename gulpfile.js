'use strict';

// imports
var gulp = require('gulp');
var concat = require('gulp-concat');
var suit = require('suitcss-preprocessor');
var del = require('del');
var run = require('run-sequence');

// webpack-dev-server
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var Webpack = require('webpack');
var HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
var ProgressPlugin = require('webpack/lib/ProgressPlugin');

// system
var fs = require('fs');
var http = require('http');

// 開發模式時，css 不會被 compress
var isDev = process.argv.indexOf('-d') > -1 || process.env.DEV || true;
// console.log( 'dev mode: ', isDev, ' >process: ', process.env.DEV );

// paths
var paths = {
    cssApp: './app/assets/css/app.css',
    cssComponents: './app/js/views/*.css',
    destDir: 'build',
    destCSS: 'build/assets/css'
};


// 處理 js: 轉換 jsx, es6, flow type, 結合為一個檔案
gulp.task('js-bundle', function(cb) {

    // console.log( '\nwpOpt: \n', require('util').inspect( wpOpt, false, 4, true) );

    // grab webpack options
    // 讀取 webpack.config.js 內的設定值
    var wpOpt = require('./webpack.config.js');

    // production 版不需 sourcemaps
    delete wpOpt.devtool;

    // 下面開始做 "-p" 的工作，也就是掛上兩個 plugin
    wpOpt.plugins.push(new webpack.optimize.UglifyJsPlugin());
    wpOpt.plugins.push(new webpack.optimize.OccurenceOrderPlugin());

    // wpOpt
    webpack( wpOpt, function(err, stats) {

        if(err) {
            // gulp.src('').pipe( notify('✖ Bunlde Failed ✖') )
            console.log( 'Bundle Error: ', err.stack );
        }

        // console.log( "[webpack]", stats.toString({/*output options*/}));

        cb();
    });
});


gulp.task('css-bundle', function(){

    // 取出所有目錄下的 .css 檔案
    gulp.src([ paths.cssApp, paths.cssComponents ])

        // 結合成一份檔案，名稱為 bundle.css
        .pipe( concat('bundle.css') )

        // 過 suitcss processor 自動加 vendor-prefix 與壓縮檔案
        .pipe( gulp.dest( function(file){
            file.contents = new Buffer( suit( file.contents.toString(), {
                compress: isDev
            }) );

            return paths.destCSS;
        }))
})

gulp.task('watch', function(){
	gulp.watch([ paths.cssApp, paths.cssComponents ], function(){
		run('css-bundle');
		console.log( 'css watch 結束' );
	})
})


// 將其餘 assets 複製到 build/ 目錄下
gulp.task('copy', function(){
    return gulp.src([ 'app/index.html', 'app/assets/images/**/*', 'app/vendor/**/*' ], { base: 'app' } )
    .pipe( gulp.dest(paths.destDir));
})

// 清除 build 目錄下舊資料
gulp.task('clean', function(cb) {
	console.log( 'hello world' );
    del( ['build/*'], cb);
});

//========================================================================
//
// webpack-dev-server


// 啟動 wbepack-dev-server
// 由於 build/ 內可能是空的，因此 css 與其它 assets 仍然要 copy 以預防萬一
gulp.task('dev', ['css-bundle', 'copy', 'watch'], function(){

    var wpOpt = require('./webpack.config.js');

    // 特別讀取該檔中 devServer 這段
    var options = wpOpt.devServer;

    var protocol = options.protocol || 'http';
    var host = options.host || 'localhost';
    var port = options.port || '8080';

    // webpack 的 devServer 裏原本沒有 inline 這參數，是我自定義的
    // 因此要檢查是否沒傳入，並將它設為預設值
    options.inline = options.inline || true;
    options.hot = options.hot || true;

    // jx: 這裏就是偷插兩個 script 進去
    // 第一個是 reload script
    // 第二個是 HMR
    var devClient = [];

    // 準備插入的 reload script
    if(options.inline){
    devClient.push( require.resolve('webpack-dev-server/client/') + '?' + protocol + '://' + host + ':' + port );
    }

    // 插入 HMR script
    if(options.hot){
        devClient.push("webpack/hot/dev-server");
    }

    // 將要偷插的 script 真正塞入每個 module entry 中
    // 這樣寫是最保險的做法，可以應付所有 entry{} 內可能的格式
    [].concat(wpOpt).forEach(function(wpOpt) {
    if(typeof wpOpt.entry === "object") {
      // 這是 multi-entry point 的情境，要個別走訪每個 key
      Object.keys(wpOpt.entry).forEach(function(key) {
        wpOpt.entry[key] = devClient.concat(wpOpt.entry[key]);
      });
    } else {
      // 普通的 entry 值應該是 String 或 Array，因此用 concat
      wpOpt.entry = devClient.concat(wpOpt.entry);
    }
    });

    // wpOpt.entry = devClient.concat(wpOpt.entry);
    wpOpt.output.path = '/';
    wpOpt.context = process.cwd();

    // HMR 啟動時要做兩件事
    // 1. 啟用 plugin
    // 2. 加上 react-hot loader
    if(options.hot){
      //
      wpOpt.plugins.push(new HotModuleReplacementPlugin());

      // 原本是 [ 'babel-loader' ]
      // 加完變 [ 'react-hot', 'babel-loader' ]
      // 注意：目前這個寫法有風險，因為它預設 loaders[] 第一筆一定就是處理 js 並負責跑 babel-loader
      // 如果將來不符合這個條件，就會爛掉，但目前沒更好解法
      wpOpt.module.loaders[0].loaders.unshift('react-hot');
    }

    // console.log( '\n最終: \n', require('util').inspect( wpOpt, false, 5, true) );

    new WebpackDevServer(new Webpack(wpOpt), options).listen(port, host, function(err) {
      if (err) {
          throw err;
      }

      console.log(protocol + '://' + host + ':' + port + '/');
      console.log('webpack result is served from ' + options.publicPath);
      console.log('content is served from ' + options.contentBase);
    });

})


//========================================================================
//
// entry points

gulp.task('default', ['dev']);

// 要先確定 clean 完成，再跑後面三件工作
// 因此必需使用 run-sequence 來協助
gulp.task('build', [ 'clean' ], function(cb){
    run([ 'js-bundle', 'css-bundle', 'copy' ], cb);
});
