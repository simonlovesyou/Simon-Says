import fs from 'fs';
import Promise from 'bluebird';
import path from 'path';
import async from 'async';
import pathExists from 'path-exists';
import events from './events.js';
import comparators from './comparators.js';
import configHelper from './api/configHelper.js'

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

  configHelper.get().then(config => {
    console.log(config);
    return config;
  })
  .each(
    directory => readdir(path.join(directory.folder.path, directory.folder.name))
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
     
  ).catch(err => {
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


//Expose
module.exports = {
  start,
  config
}




