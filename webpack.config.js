var Path = require("path");
var webpack = require('webpack');

// 如果有傳入 -d 代表 dev 模式，反之如果有 -p 代表 production
// 此參數是給 $ webpack 用的，與 webpack-dev-server 無關
/*var isDev = process.argv.indexOf('-d') > -1;

// 特例，如果是執行 $ webpack-dev-server 要強迫進入 isDev 模式，才能啟動 HMR
isDev = process.env.DEV || isDev;

console.log( 'dev mode: ', isDev, ' >process: ', process.env.DEV );*/

//
module.exports = {

  // entry 下面不一定有 bundle 這個值，它僅用於 multiple entry point 情境
  // 此例中將來會生成一個 entry point 名稱為 bundle，因此也可新增其它名稱為 key
  // http://webpack.github.io/docs/multiple-entry-points.html
  entry: {
    // 第一個是為了 hot module replacement 而加的，要搭配 react-hot-loader，並且 cli 要加 --hot 才能發威
    // 如果只是單純為了取代 livereload 則不需加這個，也不需 --hot
    bundle: [ "./app/js/boot.js"]

    // foo: ['示範另個 entry point bundle'],
    // bar: [null]
  },

  // 主要是啟動 babel-loader
  module: {

    loaders: [

    // jx: 為了方便從 nodejs 直接啟動 webpack-dev-server，這裏第一筆一定要處理 js 並啟用 babel-loader
    {
      test: /\.jsx?$/,
      exclude: [ /node_modules/, /vendor/ ],
      loaders: [ 'babel-loader' ]
    },

    /*
    // 處理 html, 與各種圖檔
    {
      test: /\.(html|png)$/,
      loader: "file?name=[path][name].[ext]&context=./app"
    },

    // vendor 下各種檔案複製到 build/ 下面
    {
      test: /vendor\/*\.js$/,
      loader: "file?name=[path][name].[ext]&context=./app"
    },

    // 處理 css
    {
      test: /\.scss$/,
      loader: "style!css!sass?outputStyle=expanded"
    },*/
    ],

    noParse: ['react', 'jquery', 'bootstrap']
  },

  // 從本地目錄拉的檔案，用 alias 包起來
  // 從 cdn 拉的檔案，用 externals
  // alias 一定要寫絕對路徑，不然會以呼叫 require() 的檔案路徑為基準
  resolve: {

    alias: {

      // 示範從 npm 拿 jquery
      jquery: 'jquery',
      // jquery: Path.resolve(__dirname, "./app/vendor/jquery.js"),

      // 示範直接拿現成 js file
      bootstrap: Path.resolve(__dirname, "./app/vendor/bootstrap.js"),

      // 原本也想直接用編好的檔案，但會出錯，因此改成直接拿 node_module/react 裏的檔案
      react: 'react'
    },

    // 這樣 require() 裏不用寫副檔名
    extensions: ["", ".js", ".jsx", ".webpack.js", ".web.js"]

  },

  plugins: [
    // 這樣宣告後，在所有 module 內都可直接用 $, jQuery 與 windows.jQuery 三個變數
    // 它們都對應到 jquery 這個值 ← 即上面宣告在 alias 中的 'jquery' 字串
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery",
        'React': 'react'
    }),

  ],

  output: {
    path: Path.resolve(__dirname, "./build"),

    // 有 multiple entry point 時，這裏一定要用變數寫法，不然多個產出 js file 會彼此覆寫
    filename: "[name].js",
  },

  // 生成 sourcemaps
  // 這是給 webpack-dev-server 看的參數
  // 一般生成 production 檔案時會用 webpack -p 就預設不會吐出 sourcemaps
  devtool: 'eval', //'#source-map'
  // devtool: '#source-map',

  // 這是 webpack-dev-server 會看的 config
  // 有加這段的話，平常在 cli 跑 $ webpack-dev-server 時就不需另外加 --content-base .build/ 這參數
  devServer: {

    // 要完整絕對路徑
    contentBase: Path.resolve(__dirname, "./build"),

    // 下面三個永遠寫死
    filename: '[name].js',
    publicPath: '/',
    outputPath: '/',

    hot: true,
    // Enable special support for Hot Module Replacement
    // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
    // Use "webpack/hot/dev-server" as additional module in your entry point
    // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.

    // webpack 的 devServer 裏原本沒有 inline 這參數，是我自定義的
    // 等於是 cli 時有無下 --inline 參數
    inline: true,

    // 下列三者是我自定義的，方便在 nodejs 操作 api
    protocol: 'http',
    host: 'localhost',
    port: 8080,

    // webpack-dev-middleware options
    quiet: true,  // 設為 true 即不會顯示太多 debug 訊息，讓 console 乾淨一點
    noInfo: true,
    lazy: false,  // false 是啟動 watch mode，有變化即自動編譯
    stats: { colors: true, cached: false, cachedAssets: false },

    // set this as true if you want to access dev server from arbitrary url
    // this is handy if you are using a html5 router
    // historyApiFallback: false,
    // watchDelay: 300,
    // headers: { "X-Custom-Header": "yes" },
  }

};
