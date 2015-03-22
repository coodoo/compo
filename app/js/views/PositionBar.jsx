
var Comp = React.createClass({

	propTypes: {
		duration: React.PropTypes.number,
		position: React.PropTypes.number
	},

  // todo
  // 顯示當前播放進度，例如總長  1:23 秒，目前播放到 0:47 秒位置
  render: function() {

    var duration = this.props.duration;
    var position = this.props.position;

    // var str = 'calc($percent%)';
    // str = str.replace('$percent', Math.round(position/duration*100) );
    var percent = Math.round(position/duration*100);
    var str = `calc(${percent}%)`;	// 用了 es6 template string

    // console.log( 'str: ', str );

    return (
    	<div className="positionBar" onClick={this.handleClick}>
    		<span>Duration: {duration}</span> / <span>Position: {position}</span>
	    	<div className="positionBar-now" style={{width: str}}></div>
    	</div>

    );

  },

  //
  handleClick: function(evt){
      // console.log( '點了: ', evt.clientX );
      var rect = evt.target.getBoundingClientRect();
      var left = rect.left;
      var pos = evt.clientX - left;
      var percent = pos / rect.width;
      var sec = Math.round(this.props.duration * percent);
      this.props.onChange(sec);
  },

})


module.exports = Comp;
