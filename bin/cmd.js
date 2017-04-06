#!/usr/bin/env node
/*
 * -h, --help
 * -v, --version
 * path
 * desPath
 */

var program = require('commander');
var create_tree = require('../index');
 
program
  .version(require('../package.json').version)
  .option('-f, --file_name [file_name]', 'source file', 'default')
  .parse(process.argv);

if (program.file_name){
    if (program.file_name == 'default') {
        console.log('Error:');
        console.log('You need specify a file path');
    } else {
        create_tree(program.file_name);   
    }
}