var actions = require('../actions/AppActionCreator');
var Btn = require('./Dummy.jsx');

/**
 *
 */
var Header = React.createClass({

  //
  componentDidMount: function() {
      // select once and cache it
      this.$input = $(this.getDOMNode()).find('.searchBox-input');
  },

  //
  render: function() {


    return (

      <div className="searchBox">

        <input className="rightGap searchBox-input"
               type="text" placeholder="campaign url"
               onKeyDown={this.handleKeyDown} />

        <div className="rightGap"
             onClick={this.handleSubmit} >submit</div>

        <div className=""
             onClick={this.handleShowTotal} >show total</div>

        <Btn />

      </div>
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
