
//========================================================================
//
// IMPORT

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var actions = require('../actions/AppActionCreator');

// var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter; // 取得一個 pub/sub 廣播器

//========================================================================
//
// Public API

var currentSong = {
	artist: 'Eric Clapton',
	name: 'San Francisco Bay Blues',
	duration: 96, //seconds
}

var playStatus = {
	repeat: false,
	position: 34 //seconds
}

var Store = {};
Object.assign( Store, EventEmitter.prototype, {

    getAll: function(){
        return {
            currentSong: currentSong,
            playStatus: playStatus
        }
    },

    //
    noop: function(){}
});

//========================================================================
//
// event handlers

Store.dispatchToken = AppDispatcher.register( function eventHandlers(evt){

    // evt .action 就是 view 當時廣播出來的整包物件
    // 它內含 actionType
    var action = evt.action;

    switch (action.actionType) {

        //
        case AppConstants.TOGGLE_REPEAT:
        	playStatus.repeat = action.value;
            Store.emit( AppConstants.CHANGE_EVENT );
            break;

        //
        case AppConstants.UPDATE_POSITION:
        	playStatus.position = action.pos;
            Store.emit( AppConstants.CHANGE_EVENT );
            break;

        default:
            //
    }

})

module.exports = Store;
