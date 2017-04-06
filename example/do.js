var convert = require('../index');

var a = convert('markdown.md');
var b = convert('mind.txt');

console.log(a === b);