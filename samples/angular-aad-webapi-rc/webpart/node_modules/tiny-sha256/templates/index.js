(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof module !== 'undefined' && module.exports){
		module.exports = factory();
	} else {
		global.sha256 = factory();
	}
})(this, function () {

{{sha256.js}}

sha256.code = {{json:sha256.min.js}};

return sha256;

});