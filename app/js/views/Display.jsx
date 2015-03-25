var actions = require('../actions/AppActionCreator');
var util = require('../utils/util');

var Duration = require('./Duration.jsx');
var RepeatButton = require('./RepeatButton.jsx');
var PositionBar = require('./PositionBar.jsx');

//
var Comp = React.createClass({

	// component interface
	propTypes: {

		actions: React.PropTypes.shape({
      onRepeatClick: React.PropTypes.func,
      onProgressChange: React.PropTypes.func,
    }),

		song: React.PropTypes.shape({
      artist: React.PropTypes.string,
      name: React.PropTypes.string,
      duration: React.PropTypes.number
    }),

		status: React.PropTypes.shape({
      repeat: React.PropTypes.boolean,
      position: React.PropTypes.number
    }),
	},

  componentDidMount: function() {
      // this.$node = $(this.getDOMNode())
      // this.$btnClose = this.$node.find('.listItem-removeBtn');
  },

  //
  render: function() {

    var actions = this.props.actions;
    var song = this.props.song;
    var status = this.props.status;

    return (

      <div className="display">

      	<div className="display-top">
	      	<div>{song.artist}</div>
	      	<div>{song.name}</div>
	      	<Duration length={song.duration} />

	      	<RepeatButton repeat={status.repeat} onClick={actions.onRepeatClick} />
      	</div>

      	<PositionBar className="display-bottom"
      							 duration={song.duration}
      							 position={status.position}
      							 onChange={actions.onProgressChange} />

      </div>
    );

  },

  //
  handleMouseOver: function(evt){
      this.$btnClose.removeClass('visible invisible ').addClass('visible');
  },

  handleMouseOut: function(evt){
      this.$btnClose.removeClass('visible invisible').addClass('invisible');
  },

  handleRemove: function( url, evt ){
      // console.log( 'remove: ', url );
      actions.removeItem( url );
  },

  // don't show widget before all images are loaded
  handleImgLoaded: function(){
      this.imgCount++;
      console.log( '\timage loaded count: ', this.imgCount );
      if( this.imgCount >= 2 ){
          this.$node.removeClass('hide');
      }
  },

  //
  noop: function(){
  }

});

function formatDollar(value){
    return util.numberWithCommas(value)
}

module.exports = Comp;
