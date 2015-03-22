var actions = require('../actions/AppActionCreator');

/**
 *
 */
var Header = React.createClass({

  //
  componentDidMount: function() {
      // select once and cache it
      // this.$input = $(this.getDOMNode()).find('.searchBox-input');
  },

  //
  render: function() {


    return (

      <button className="Dummy-test" type="button">Click Me 123!</button>

    );

  },

  //
  handleKeyDown: function(evt){
      if(evt.keyCode == 13){
          this.doSearch();
      }
  },

  handleSubmit: function(evt){
      this.doSearch();
  },

  doSearch: function(){
      actions.loadItem( this.$input.val() );
      this.$input.val('');
  },

  // todo
  handleShowTotal: function(evt){
      actions.countTotal();
  },

  //
  noop: function(){
  }

});

module.exports = Header;
