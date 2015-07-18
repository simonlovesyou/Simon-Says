import fs from 'fs';
import Promise from 'bluebird';
import path from 'path';


var readFile = Promise.promisify(fs.readFile);
var readdir = Promise.promisify(fs.readdir);
var rename = Promise.promisify(fs.rename);

	readFile('configuration.JSON', 'utf8')
	.then(data => JSON.parse(data))
	.each(
		task => {
		setInterval(() => {
			
		console.log("Getting path from %s to %s", task.path, __dirname);
		console.log(path.relative(__dirname, task.path));


		readdir(path.relative(__dirname, task.path))
		.then(files => files.forEach(file => 
			{ 
				if(testFile(task.path, task.matchAll, task.rules,file)) {
					events[task.event.type](task, file);
				}
			}))}, task.interval);
		}
	).each(function(files) {
		//console.log("files:");
		//console.log(files);
	}).catch(err => {
		throw new Error(err);
	});

function testFile(dir, matchAll, rules, file) {

	let nrOfMatches = matchAll ? rules.length : 1,
			matches = 0;

	for(let i = 0; i < rules.length; i++) {
		if(file.indexOf('.') >= 0 && verifiers[rules[i].verifier](file, rules[i].type, rules[i].reference)) {
			console.log("%s passed test '%s' with type: %s, reference: %s", file, rules[i].verifier, rules[i].type, rules[i].reference);
			matches++;
		} else {
			console.log("%s did not pass test '%s' with type: %s, reference: %s", file, rules[i].verifier, rules[i].type, rules[i].reference);
		}
	}

	let pass = (matches === nrOfMatches) ? true : false;

	return pass;
}


const verifiers = {
	match: (file, type, reference) => {
		let parts = file.split('.');
		if(type === 'extension') {
			return parts[1] === reference
		}
		if(type === 'name') {
			return parts[0] === reference
		}
	},
	contains: (file, type, reference) => {
		let parts = file.split('.');
		if(type === 'extension') {
			return (parts[1].indexOf(reference) >= 0)
		}
		if(type === 'name') {
			return (parts[0].indexOf(reference) >= 0)
		}
	}
}

const events = {
	move: (task, file) => {

		let origin = path.relative(__dirname, task.path)+'/'+file
		let dest = path.relative(__dirname, task.event.path)+'/'+file

		rename(origin, dest)
		.then(() => {
			console.log('moved file "%s" from %s to %s', file, origin, dest);
		})
		.catch((err) => {
			console.log('Could not move file "%s" from %s to %s', file, pathToOldFolder, pathToNewFolderFromOld);
			throw new Error(err);
		});
	},
	rename: (task, file) => {

		let origin = path.relative(__dirname, task.path)+'/'+file
		let newName = path.relative(__dirname, task.path)+'/'+task.event.newName;

		rename(origin, newName)
		.then(() => {
			console.log('renamed file "%s" from %s to %s', file, origin, newName);
		})
		.catch((err) => {
			console.log('Could not move file "%s" from %s to %s', file, origin, newName);
			throw new Error(err);
		});
	}
};
