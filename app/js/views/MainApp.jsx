// MainApp is a plain structural component
// which shall never be re-rendered for that it only holds other components but no data

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
