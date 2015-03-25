
//
var Comp = React.createClass({

	propTypes: {
		repeat: React.PropTypes.bool,
		onClick: React.PropTypes.func
	},


  //
  render: function() {

  	// 目前 repeat 狀態: true|false
    var repeat = this.props.repeat;
    var elem;

    if(repeat){
    	// repeat 現在為開啟狀態，放 on 圖
    	// 當被 click 時，要傳下一個狀態，也就是 false 值，給 callback
    	elem = <img
    							className="repeat-btn"
    							src="/assets/images/repeat-on.png"
    							onClick={this.props.onClick.bind(this, !repeat)} />
    }else{
    	elem = <img
    							className="repeat-btn"
    							src="/assets/images/repeat-off.png"
    							onClick={this.props.onClick.bind(this, !repeat)} />
    }

    return elem;
  },

  //
  noop: function(){
  }

});


module.exports = Comp;
