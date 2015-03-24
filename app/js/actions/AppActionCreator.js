var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var SongStore = require('../stores/SongStore');
var util = require('../utils/util');

var AppActionCreators = {

    //
    toggleRepeat: function(value){
    	console.log( 'repeat 要切換到的下一狀態: ', value );

    	AppDispatcher.handleViewAction({
    	    actionType: AppConstants.TOGGLE_REPEAT,
    	    value: value
    	});
    },

    updateSongProgess: function(pos){
    	AppDispatcher.handleViewAction({
    	    actionType: AppConstants.UPDATE_POSITION,
    	    pos: pos
    	});
    },

    // dummy
    noop: function(){}
};


module.exports = AppActionCreators;
