
var DisplayContainer = require('./DisplayContainer.jsx');

var SongStore = require('../stores/SongStore');
var AppConstants = require('../constants/AppConstants');
var actions = require('../actions/AppActionCreator');


var MainApp = React.createClass({

    getInitialState: function() {
        var o = this.getTruth();
        return o;
    },

    componentWillMount: function() {
        SongStore.addListener( AppConstants.CHANGE_EVENT, this._onChange );
    },


    componentDidMount: function() {
    },

    //========================================================================
    //
    // unmount

    componentWillUnmount: function() {
        SongStore.removeChangeListener( this._onChange );
    },

    componentDidUnmount: function() {
        //
    },

    //========================================================================
    //
    // update

    componentWillReceiveProps: function(nextProps) {
        //
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return true;
    },

    componentWillUpdate: function(nextProps, nextState) {
    },

    componentDidUpdate: function(prevProps, prevState) {
    },

    //========================================================================
    //
    // render

    render: function() {

        return (
        	<DisplayContainer song={this.state.currentSong} status={this.state.playStatus} />
        )

    },

    //
    _onChange: function(){
        this.setState( this.getTruth() );
    },

    //
    getTruth: function() {
        return SongStore.getAll();
    }


});

module.exports = MainApp;
