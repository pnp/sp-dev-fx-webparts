var path = require("path");
var SourceNode = require("source-map").SourceNode;
var loaderUtils = require("loader-utils");

module.exports = function(content, map) {
	this.cacheable();

	var id = this.options.name;
	if(!id) this.callback(null, content, map);

	if(map) {
		var sourceNode = SourceNode.fromSourceWithMap(content, map);
	} else {
		var fileName = loaderUtils.getRemainingRequest(this);
		var sourceNode = new SourceNode(null, null, null);
		content.split("\n").forEach(function(line, idx) {
			sourceNode.add(new SourceNode(idx + 1, 0, fileName, line + "\n"));
		})
		sourceNode.setSourceContent(fileName, content);
	}

	var concatSrc = new SourceNode();
	concatSrc.add([
		"describe(" + JSON.stringify(id)  + ", function() {\n",
		sourceNode,
		"\n});"
	]);

	var result = concatSrc.toStringWithSourceMap();
	this.callback(undefined, result.code, result.map.toString());
};
