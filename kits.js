/*
 * tools
 */

var fs = require('fs');

var tree_index = '';
var last_tab_count = -1;

module.exports = {
	read_file: function(file) {
		var content_text = fs.readFileSync(file,'utf-8');

		if (!content_text) {
			console.log('Read file ***' + file + '*** error!');
			return null;
		}

		return content_text;
	},
	format_md_line: function(line) {
		if (!setTreeIndexForMD(line)) {
			return null;
		}

		return {
			tree_index: tree_index,
			val: line.replace(/^\#*/, '').replace(/^\s*\-/, '').replace(/^\s*/, '')
		}
	},
	format_mind_line: function(line) {
		if (line.indexOf('1') > -1) {
			var real = line.replace(/^\s+/, '').replace(/\./g, '').replace(/\s+/g, ' ');
			
			return {
				tree_index: real.split(' ')[0],
				val: real.split(' ')[1]
			};
		}

		return null;
	},
	set_data: function(index, val, data) {
		if (index.length === 2) {
			var target_index = index[1];

			if (target_index == 1) {
				data.children = [];
				data.children.push({
					name: val,
					children: []
				});
			} else {
				data.children[target_index - 1] = {
					name: val,
					children: []
				};
			}
		} else {
			var target_index = index[1];
			index = index.substring(1, index.length);

			if (!data.children[target_index - 1]) {
				data.children[target_index - 1] = {
					name: "",
					children: []
				}
			}

			arguments.callee(index, val, data.children[target_index - 1]);
		}
	}
};

function setTreeIndexForMD(str) {
	if (str.indexOf('#') === 0) {
		var title_count = str.replace(/[^\#]/g, '').length;
		calc_tree_index(tree_index.length, title_count);
		last_tab_count = -1;

		return true;
	} else if (str.indexOf('-') > -1) {
		var tab_count = 0;
		str.replace(/^(\s*)/g, function(a, b){
			tab_count = b.length;
		});

		calc_tree_index(last_tab_count, tab_count);
		last_tab_count = tab_count;

		return true;
	}

	return false;
}

function calc_tree_index(last_len, now_len) {
	if (now_len > last_len) {
		tree_index += '1';
	} else if (now_len === last_len) {
		tree_index = tree_index.replace(/(\d)$/, function(a) {
			return parseInt(a) + 1;
		});
	} else {
		var slice_count = last_len - now_len;
		tree_index = tree_index.substring(0, tree_index.length - slice_count);
		tree_index = tree_index.replace(/(\d)$/, function(a) {
			return parseInt(a) + 1;
		});
	}
}
