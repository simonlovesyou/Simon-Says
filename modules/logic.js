import fs from 'fs';
import Promise from 'bluebird';
import path from 'path';
import async from 'async';
import pathExists from 'path-exists';
import events from './events.js';
import comparators from './comparators.js';

console.log(comparators);


let readFile = Promise.promisify(fs.readFile),
    writeFile = Promise.promisify(fs.writeFile),
    readdir = Promise.promisify(fs.readdir),
    rename = Promise.promisify(fs.rename),
    appendFile = Promise.promisify(fs.appendFile),
    stat = Promise.promisify(fs.stat),
    asyncP = Promise.promisifyAll(async),
    exists = Promise.promisify(pathExists),
    unlink = Promise.promisify(fs.unlink),
    config;

const start = cb => {

  readFile('configuration.JSON', 'utf8')
  .then(data => JSON.parse(data))
  .then(config => {
    if(typeof cb === 'function') {
      if(config) {
        
        cb(config);
      } else {
        console.log('Throwing error');
        cb(null, new Error('Could not read file.'));
      }
    }
    return config;
  })
  .each(
    directory => {
      console.log(directory);
      console.log('Reading:');
      console.log('opt:'+ path.join(directory.folder.path, directory.folder.name));
      readdir(path.join(directory.folder.path, directory.folder.name))
        .then(files => {
          var fullPath = path.join(directory.folder.path, directory.folder.name);
          files = files || [];
          files.forEach(file => {
            directory.tasks = directory.tasks || [];
            directory.tasks.forEach(task => {
              if(testFile(fullPath, task.matchAll, task.rules,file)) {
                events[task.events[0].type](task, file, fullPath);
              }
            });
          })
        })
        .catch(err => {
          throw new Error(err);
        });
    }


  ).each(function(files) {
    //console.log('files:');
    //console.log(files);
  }).catch(err => {
    throw new Error(err);
  });
};

function testFile(dir, matchAll, rules, file) {
  let nrOfMatches = matchAll ? rules.length : 1,
      matches = 0;
  for(let i = 0; i < rules.length; i++) {
    if(file.indexOf('.') >= 0 && comparators[rules[i].comparator](file, rules[i].type, rules[i].reference)) {
      console.log('%s passed test "%s" with type: %s, reference: %s', file, rules[i].comparator, rules[i].type, rules[i].reference);
      matches++;
    } else {
      console.log('%s did not pass test "%s" with type: %s, reference: %s', file, rules[i].comparator, rules[i].type, rules[i].reference);
    }
  }

  return matches >= nrOfMatches;
}

function log(task) {
  let currentDate = new Date(),
      datetime = '[' + currentDate.getFullYear() + '/' +
                  (currentDate.getMonth()+1) + '/' +
                  currentDate.getDate() + ' ' +
                  currentDate.getHours() + ':' +
                  currentDate.getMinutes() + ':' +
                  currentDate.getSeconds() + ']';

  let message = datetime + ' Task "' + task.name +
                '"" fired event "'+ task.events[0].type + '"\n';


  appendFile('history.log', message)
  .catch(err => {throw new Error(err)});
}

//Expose
module.exports = {
  start,
  config
}




