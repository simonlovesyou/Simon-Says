var fs = require('fs');
var Promise = require('bluebird');
var async = require('async');

var readFile = Promise.promisify(fs.readFile);
var readdir = Promise.promisify(fs.readdir);
var asyncEach = Promise.promisify(async.each);

	readFile('configuration.JSON', 'utf8')
	.then(function(data) {
		return JSON.parse(data);
	}).each(function(task) {
		readdir(task.path).then(function(files) {

				files.map(function(file) {
					testFile(task.path, task.matchAll, task.rules,file);
				})

		});
	}).each(function(files) {
		//console.log("files:");
		//console.log(files);
	}).catch(function(err) {
		throw new Error(err);
	});



function testFile(dir, matchAll, rules, file) {

	var splitted = file.split('.')
	, nrOfMatches;

	console.log(splitted);

	if(matchAll) {
		nrOfMatches = rules.length;
	} else {
		nrOfMatches = 1;
	}

	var matches = 0;
	for(var i = 0; i < rules.length; i++) {
		//console.log(rules[i].type);
		if(rules[i].type === 'extension') {
			if(rules[i].verifier === 'contains') {
				if(rules[i].reference.indexOf(splitted[1]) >= 0) {
					console.log("True test contains");
					matches++;

				}
			} else if(rules[i].verifier === 'match') {
				if(rules[i].reference === splitted[1]) {
					console.log("True test match");
					matches++;
				}
			}
		} else if(rules[i].type === 'name') {
			if(rules[i].verifier === 'contains') {
				if(rules[i].reference.indexOf(splitted[0]) >= 0) {
					console.log("True test contains");
					matches++;

				}
			} else if(rules[i].verifier === 'match') {
				if(rules[i].reference === splitted[0]) {
					console.log("True test match");
					matches++;
				}
			}
		}
	}

	console.log(matches, nrOfMatches);
	console.log(matches === nrOfMatches);
	if(matches === nrOfMatches) {
		return true;
	} else {
		return false;
	}


}