var actions = require('../actions/AppActionCreator');
var util = require('../utils/util');

var Display = require('./Display.jsx');

// container 的資料來源有兩條路
// 1. 由外界傳入 → 例如本例是由 MainApp 傳進來
// 2. 內部向 Store 取得
//
// container 元件只做兩件事
// 建立 actionMap 傳入直屬母元件
// 將 domain props 傳入直屬母元件
//
var Comp = React.createClass({

	// 想法：container 的 map 也只是直接 mapping 到 actionCreator 身上的指令
	// 因此不會太麻煩，這是最貼近原始寫法的做法
	actionMap: {
		onRepeatClick: actions.toggleRepeat,
		onProgressChange: actions.updateSongProgess
	},

	//
  render: function() {

  	var song = this.props.song;
  	var status = this.props.status;

    return (
    	<Display actions={this.actionMap}
    					 song={song}
    					 status={status} />
    );

  },

  //
  noop: function(){
  }

});

module.exports = Comp;
