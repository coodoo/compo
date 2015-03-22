
//
var Comp = React.createClass({

  componentWillMount: function() {
      this.imgCount = 0;
      console.log( 'loading images...' );
  },

  componentDidMount: function() {
      this.$node = $(this.getDOMNode())
      this.$btnClose = this.$node.find('.listItem-removeBtn');
  },

  // 顯示歌曲長度為 1:23 這種格式 ← 傳入的是 96s 這種值
  render: function() {

    var length = this.props.length;

    return (
    	<div>{formatTime(length)}</div>
    );

  },

  //
  noop: function(){
  }

});

function formatTime(value){
	var min = Math.floor(value/60);
	var sec = value%60;
	return min + ':' + sec;
}

module.exports = Comp;
