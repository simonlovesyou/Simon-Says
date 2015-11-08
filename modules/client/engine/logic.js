import Promise from 'bluebird';
let fs = Promise.promisifyAll(require('fs'));
import path from 'path';
import pathExists from 'path-exists';
import events from './events.js';
import comparators from './comparators.js';
import db from '../app/db';

const start = cb => {

  /*configHelper.get()
  .each(
    directory => fs.readdirAsync(path.join(directory.folder.path, directory.folder.name))
    .then(files => {
      var fullPath = path.join(directory.folder.path, directory.folder.name);
      files = files || [];
      files.forEach(file => {
        directory.tasks = directory.tasks || [];
        directory.tasks.forEach(task => {
          if(testFile(fullPath, task.matchAll, task.rules,file) && task.events) {
            events[task.events[0].type](task, file, fullPath);
          }
        });
      })
    })
  ).catch(err => {
    throw new Error(err);
  });*/
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

//Expose
module.exports = {
  start
}




