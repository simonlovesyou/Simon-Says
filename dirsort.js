import fs from 'fs';
import Promise from 'bluebird';


var readFile = Promise.promisify(fs.readFile);
var readdir = Promise.promisify(fs.readdir);

	readFile('configuration.JSON', 'utf8')
	.then(data => JSON.parse(data))
	.each(
		task => {
		readdir(task.path)
		.then(files => files.every(file => 
			{ 
				if(testFile(task.path, task.matchAll, task.rules,file)) {
					events[task.event.type](task.path, file, task.event.path);
				}
			}));
		}
	).each(function(files) {
		//console.log("files:");
		//console.log(files);
	}).catch(function(err) {
		throw new Error(err);
	});

function testFile(dir, matchAll, rules, file) {

	let nrOfMatches,
			matches = 0;

	if(matchAll) {
		nrOfMatches = rules.length;
	} else {
		nrOfMatches = 1;
	}


	for(let i = 0; i < rules.length; i++) {
		if(verifiers[rules[i].verifier](file, rules[i].type, rules[i].reference)) {
			console.log("%s passed test '%s' with type: %s, reference: %s", file, rules[i].verifier, rules[i].type, rules[i].reference);
			matches++;
		} else {
			console.log("%s did not pass test '%s' with type: %s, reference: %s", file, rules[i].verifier, rules[i].type, rules[i].reference);
		}
	}

	if(matches === nrOfMatches) {
		return true;
	} else {
		return false;
	}
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
	move: (originalFolder, file, folder) => {
		console.log('moved file "%s" from %s to %s', file, originalFolder, folder);
		/*let source = fs.createReadStream(originalFolder+file),
				dest = fs.createWriteStream(folder+file);
		source.pipe(dest);
		source.on*/
	}
}
