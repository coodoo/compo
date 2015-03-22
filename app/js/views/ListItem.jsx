var actions = require('../actions/AppActionCreator');
var util = require('../utils/util');

/**
 * 
 */
var Comp = React.createClass({

  componentWillMount: function() {
      this.imgCount = 0;
      console.log( 'loading images...' );
  },

  componentDidMount: function() {
      this.$node = $(this.getDOMNode())
      this.$btnClose = this.$node.find('.listItem-removeBtn');
  },

  /**
   * 
   */
  render: function() {
    
    var t = this.props.truth;
    
    return (
      
      <div className="listItem hide">
        
        <img className="listItem-campaignImage imageRadius" 
             src={t.img}
             onMouseEnter={this.handleMouseOver} 
             onMouseOut={this.handleMouseOut} 
             onLoad={this.handleImgLoaded} />

        <img className="listItem-removeBtn invisible" src="/assets/images/close-icon.png" 
             onMouseEnter={this.handleMouseOver} 
             onMouseOut={this.handleMouseOut}
             onClick={this.handleRemove.bind(this, t.url)} />

        <div className="listItem-campaignTitle">{t.title}</div>

        <div className="listItem-campaignDetails">
          <img src={t.admin.img} className="listItem-campaignDetailsUserImage imageRadius" />
            <div className="listItem-campaignDetailsRight">
              <span className="listItem-userName">{t.admin.firstname} {t.admin.lastname}</span><br/>
              <img className="listItem-icon" src="/assets/images/tilt-icon.png" onLoad={this.handleImgLoaded} />
              <span className="listItem-Fund">$ {formatDollar(t.raised_amount)}</span>
              <span className="listItem-raised">raised</span>
          </div>
        </div>

      </div>
    );
  
  },

  /**
   * 
   */
  handleMouseOver: function(evt){
      this.$btnClose.removeClass('visible invisible ').addClass('visible');
  },

  handleMouseOut: function(evt){
      this.$btnClose.removeClass('visible invisible').addClass('invisible');
  },

  handleRemove: function( url, evt ){
      // console.log( 'remove: ', url );
      actions.removeItem( url );
  },

  // don't show widget before all images are loaded
  handleImgLoaded: function(){
      this.imgCount++;
      console.log( '\timage loaded count: ', this.imgCount );
      if( this.imgCount >= 2 ){
          this.$node.removeClass('hide');
      }
  },

  //
  noop: function(){
  }

});

function formatDollar(value){
    return util.numberWithCommas(value)
}

module.exports = Comp;