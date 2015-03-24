
var DisplayContainer = require('./DisplayContainer.jsx');

//
var MainApp = React.createClass({


    componentWillMount: function() {

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
        	<DisplayContainer />
        )

    }

});

module.exports = MainApp;
