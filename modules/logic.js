import fs from 'fs';
import Promise from 'bluebird';
import path from 'path';
import async from 'async';
import pathExists from 'path-exists';


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
        console.log('Calling callback with:');
        console.log(config);
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
      console.log(path.isAbsolute(directory.folder.path));
      console.log(path.relative(__dirname +'/..', path.join(directory.folder.path, directory.folder.name)));
      readdir(path.join(directory.folder.path, directory.folder.name))
        .then(files => {
          var fullPath = path.join(directory.folder.path, directory.folder.name);
          console.log(fullPath);
          files.forEach(file => {
            directory.tasks.forEach(task => {
              if(testFile(fullPath, task.matchAll, task.rules,file)) {
                events[task.event.type](task, file, fullPath);
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
  console.log('inside tesfile');
  let nrOfMatches = matchAll ? rules.length : 1,
      matches = 0;

  for(let i = 0; i < rules.length; i++) {
    if(file.indexOf('.') >= 0 && verifiers[rules[i].verifier](file, rules[i].type, rules[i].reference)) {
      console.log('%s passed test "%s" with type: %s, reference: %s', file, rules[i].verifier, rules[i].type, rules[i].reference);
      matches++;
    } else {
      console.log('%s did not pass test "%s" with type: %s, reference: %s', file, rules[i].verifier, rules[i].type, rules[i].reference);
    }
  }

  let pass = (matches === nrOfMatches);

  return pass;
}


const verifiers = {

  equals: (file, type, reference) => {
    if(type === 'extension') {
      return path.parse(file).ext === reference;
    } else if(type === 'name') {
      return path.parse(file).name === reference;
    }
  },
  doesNotEquals: (file, type, reference) => {
    if(type === 'extension') {
      return path.parse(file).ext !== reference;
    } else if(type === 'name') {
      return path.parse(file).name !== reference;
    }
  },
  contains: (file, type, reference) => {
    if(type === 'extension') {
      return (path.parse(file).ext.indexOf(reference) >== 0)
    } else if(type === 'name') {
      return (path.parse(file).name.indexOf(reference) >== 0)
    }
  }
  doesNotContain: (file, type, reference) => {
    if(type === 'extension') {
      return (path.parse(file).ext.indexOf(reference) === -1)
    } else if(type === 'name') {
      return (path.parse(file).name.indexOf(reference) === -1)
    }
  }
}

const events = {

  move: (task, file, fullPath) => {

    let origin = path.join(fullPath,file),
        dest = path.join(task.event.path,file);

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
  rename: (task, file, fullPath) => {

    let origin = path.join(fullPath,file),
        newName = path.join(fullPath,task.event.newName+path.parse(file).ext);

    rename(origin, newName)
    .then(() => {
      log(task);
      console.log('renamed file "%s" from %s to %s', file, origin, newName);
    })
    .catch((err) => {
      console.log('Could not rename file "%s" from %s to %s', file, origin, newName);
      throw new Error(err);
    });
  },
  copy: (task, file, fullPath) => {
    let parts = file.split('.');
    console.log(fullPath);
    let origin = path.join(fullPath,file),
        dest = task.event.copyName
          ? path.join(fullPath, path.join(task.event.copyName+path.extname(file)))
          : path.join(fullPath, path.join(path.parse(file).name+' (2)'+path.extname(file)));

    let rs = fs.createReadStream(origin),
        ws = fs.createWriteStream(dest);

    console.log(path.isAbsolute(origin));
    console.log(origin);
    console.log('dest: ' + dest);

    rs.pipe(ws);
    rs.on('error', function(err) {
      throw new Exception(err);
    });
    ws.on('error', err => {
      throw new Exception(err);
    })
    rs.on('close', () => (console.log('Done reading original file.')));
    ws.on('finish', () => (console.log('Done writing to copy.')))
  },
  delete: (task, file, fullPath) => {
    let filePath = path.join(fullPath, file);

    unlink(filePath).then(() => {
      log(task);
    })
    .catch(error => {
      throw new Error(err);
    });
  }
};

function log(task) {

  let currentdate = new Date(),
      datetime = '[' + currentdate.getFullYear() + '/' +
                  (currentdate.getMonth()+1) + '/' +
                  currentdate.getDate() + ' ' +
                  currentdate.getHours() + ':' +
                  currentdate.getMinutes() + ':' +
                  currentdate.getSeconds() + ']';

  let message = datetime + ' Task ' + task.name +
                ' fired event '+ task.event.type +
                ' inside folder ' + task.path +
                '\n';


  appendFile('history.log', message)
  .catch(err => {throw new Error(err)});
}

//Expose
module.exports = {
  start,
  config
}




