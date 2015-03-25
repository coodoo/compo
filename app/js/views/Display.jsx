var util = require('../utils/util');

var Duration = require('./Duration.jsx');
var RepeatButton = require('./RepeatButton.jsx');
var PositionBar = require('./PositionBar.jsx');

//
var Comp = React.createClass({

	// component interface
	propTypes: {

		song: React.PropTypes.shape({
      artist: React.PropTypes.string,
      name: React.PropTypes.string,
      duration: React.PropTypes.number
    }),

		status: React.PropTypes.shape({
      repeat: React.PropTypes.boolean,
      position: React.PropTypes.number
    }),

		// callbacks
    onRepeatClick: React.PropTypes.func,
    onProgressChange: React.PropTypes.func,
	},

  componentDidMount: function() {
  },

  //
  render: function() {

    var song = this.props.song;
    var status = this.props.status;

    return (

      <div className="display">

      	<div className="display-top">
	      	<div>{song.artist}</div>
	      	<div>{song.name}</div>
	      	<Duration length={song.duration} />

	      	<RepeatButton repeat={status.repeat} onClick={this.props.onRepeatClick} />
      	</div>

      	<PositionBar className="display-bottom"
      							 duration={song.duration}
      							 position={status.position}
      							 onChange={this.props.onProgressChange} />

      </div>
    );

  },

  //
  noop: function(){
  }

});


module.exports = Comp;
