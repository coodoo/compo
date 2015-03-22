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

    /*loadItem: function( url ){

        var requestUrl = url + '/stats.json';

        // console.log( 'url: ', requestUrl );

        if( SongStore.hasItem(url) == true ){
            console.log( 'duped item, no OP!' );
            return;
        }

        try{


        $.ajax( requestUrl,
        {

            type: 'GET',

            dataType: 'jsonp',

            //
            success: function(data, status, jqxhr){

                var obj = data.campaign;
                obj.url = url;  // as a key for dedupe

                AppDispatcher.handleViewAction({
                    actionType: AppConstants.ITEM_LOAD,
                    item: obj
                });

            },

            //
            error: function( xhr, status, errText ){
                console.log( 'xhr error: ', status, errText );
            }

        })

	    }catch(e){
	        console.log( '有錯喔？', e.stack );
	    }

    },*/

    // dummy
    noop: function(){}
};


module.exports = AppActionCreators;
