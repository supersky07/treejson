# Tree Json

To generate a tree map json!

	{
	    "name": "head1",
	    "children": [
	        {
	            "name": "head11",
	            "children": [
	                {
	                    "name": "head111",
	                    "children": []
	                },
	                {
	                    "name": "head112",
	                    "children": [
	                        {
	                            "name": "head1121",
	                            "children": []
	                        },
	                        {
	                            "name": "head1122",
	                            "children": []
	                        }
	                    ]
	                }
	            ]
	        }
	    ]
	}

## Supported formats

### Markdown

	# head1

	## head11

	### head111

	### head112

	- head1121

	- head1122

#### Note

- Root should be `#`
- Just support `#` and `-`
- Igore other tag

### Orderly format
	
	1. head1
	-------------------------------------------------------------
	1.1. head11
	-------------------------------------------------------------

	1.1.1. head111

	1.1.2. head112

	  1.1.2.1. head1121

	  1.1.2.2. head1122

#### Note

- Root should be `1.`

## Install
via npm:

    npm install treejson [-g]

via github:

    https://github.com/supersky07/treejson


## Usage
With npm install -g:

    treejson -f ./test.jade

With npm install:

    var treejson = require('treejson');
    treejson('./test.md');

With github download:

    var treejson = require('treejson/index');
    treejson('./test.md');
