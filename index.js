'use strict'

/*
 *  Generate tree map
 */
var path = require('path');
var kits = require('./kits');

module.exports = function(file_name) {
	var content = kits.read_file(file_name);
	if (!content) { return; }

	var type = path.extname(file_name).replace(/\./, '');
	type = type === 'txt' ? 'mind' : type;

	var tree_data = {};
	var all_lines = content.split('\n');

	for (var i = 0, len = all_lines.length; i < len; i++) {
		var line = all_lines[i];
		if (!line || line === '') { continue; }

		var line_data = kits['format_' + type + '_line'](line);

		if (!line_data) { continue; }

		if (line_data.tree_index.length === 1) {
			tree_data.name = line_data.val;
			tree_data.children = [];
		} else {
			kits.set_data(line_data.tree_index, line_data.val, tree_data);
		}
	}

	console.log('The formatted json:');
	console.log(JSON.stringify(tree_data));

	return JSON.stringify(tree_data);
};