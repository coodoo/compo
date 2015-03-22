var actions = require('../actions/AppActionCreator');
var ListItem = require('./ListItem.jsx');

var Comp = React.createClass({

  render: function() {
    
    var t = this.props.truth;
    
    //
    var items = this.props.truth.arrCampaigns.map(function(item){
        return <ListItem truth={item} />;
    })

    return (
      
      <div className="listBox">
        {items}
      </div>
    );
  
  },

  handleChange: function(evt){
      var val = evt.target.value.trim();
      actions.doSearch(val);
  },

  //
  noop: function(){
  }

});

module.exports = Comp;