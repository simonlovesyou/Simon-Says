import fs from 'fs';
import Promise from 'bluebird';
import path from 'path';


let readFile = Promise.promisify(fs.readFile),
		writeFile = Promise.promisify(fs.writeFile),
		readdir = Promise.promisify(fs.readdir),
		rename = Promise.promisify(fs.rename),
		appendFile = Promise.promisify(fs.appendFile);

let config;

let start = (cb => {

	readFile('configuration.JSON', 'utf8')
	.then(data => JSON.parse(data))
	.then(config => {
		if(typeof cb === 'function') {
			if(config) {
				console.log("Calling callback with:");
				console.log(config);
				cb(config);
			} else {
				console.log("Throwing error");
				cb(null, new Error("Could not read file."));
			}
		}
		return config;
	})
	.each(
		directory => {
			console.log(directory);
			console.log("Reading:");
			console.log(path.relative(__dirname +'/..', path.join(directory.folder.path, directory.folder.name)));
			readdir(path.relative(__dirname +'/..', path.join(directory.folder.path, directory.folder.name)))
				.then(files => {
					var fullPath = path.join(directory.folder.path, directory.folder.name);
					console.log(fullPath);
					files.forEach(file => {
						directory.tasks.forEach(task => {
							if(testFile(fullPath, task.matchAll, task.rules,file)) {
								events[task.event.type](task, file);
							};
						});
					})
				})
				.catch(err => {
					throw new Error(err);
				});
		
		}


	).each(function(files) {
		//console.log("files:");
		//console.log(files);
	}).catch(err => {
		throw new Error(err);
	});
});

function testFile(dir, matchAll, rules, file) {
	console.log("inside tesfile");
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

		let origin = path.relative(__dirname+'/..', task.path)+'/'+file
		let dest = path.relative(__dirname+'/..', task.event.path)+'/'+file

		rename(origin, dest)
		.then(() => {
			log(task);
			console.log('moved file "%s" from %s to %s', file, origin, dest);
		})
		.catch((err) => {
			console.log('Could not move file "%s" from %s to %s', file, pathToOldFolder, pathToNewFolderFromOld);
			throw new Error(err);
		});
	},
	rename: (task, file) => {

		let origin = path.relative(__dirname+'/..', task.path)+'/'+file
		let newName = path.relative(__dirname+'/..', task.path)+'/'+task.event.newName;

		rename(origin, newName)
		.then(() => {
			log(task);
			console.log('renamed file "%s" from %s to %s', file, origin, newName);
		})
		.catch((err) => {
			console.log('Could not rename file "%s" from %s to %s', file, origin, newName);
			throw new Error(err);
		});
	}
};

function log(task) {

	var currentdate = new Date(); 
	var datetime = "[" + currentdate.getFullYear() + "/"
	                + (currentdate.getMonth()+1)  + "/" 
	                + currentdate.getDate() + " "  
	                + currentdate.getHours() + ":"  
	                + currentdate.getMinutes() + ":" 
	                + currentdate.getSeconds() + "]";

	let message = datetime + ' Task "'+task.name
								+'" fired event "'+task.event.type
								+'" inside folder "'+task.path
								+'"\n';


	appendFile('history.log', message)
	.catch(err => {throw new Error(err)});
}

//Expose
module.exports = {
	start,
	config
}




