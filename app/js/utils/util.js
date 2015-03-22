
var o = {
	
	numberWithCommas: function(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

}

module.exports = o;