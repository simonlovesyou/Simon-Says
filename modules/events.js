import path from 'path';
import fs from 'fs';
import Promise from 'bluebird';

let readFile = Promise.promisify(fs.readFile),
    writeFile = Promise.promisify(fs.writeFile),
    readdir = Promise.promisify(fs.readdir),
    rename = Promise.promisify(fs.rename),
    appendFile = Promise.promisify(fs.appendFile),
    stat = Promise.promisify(fs.stat),
    unlink = Promise.promisify(fs.unlink);

const events = {

  move: (task, file, fullPath) => {

    let origin = path.join(fullPath,file),
        dest = path.join(task.events[0].path,file);

    rename(origin, dest)
    .then(() => {
      log(task);
      console.log('moved file "%s" from %s to %s', file, origin, dest);
      if(task.events.length > 1) {
        task.events.splice(0,1);
        events[task.events[0].type](task, file, fullPath);
      }
    })
    .catch((err) => {
      console.log('Could not move file "%s" from %s to %s', file, pathToOldFolder, pathToNewFolderFromOld);
      throw new Error(err);
    });
  },
  rename: (task, file, fullPath) => {

    let origin = path.join(fullPath,file),
        newName = path.join(fullPath,task.event[0].newName+path.parse(file).ext);

    rename(origin, newName)
    .then(() => {
      log(task);
      console.log('renamed file "%s" from %s to %s', file, origin, newName);
      if(task.events.length > 1) {
        task.events.splice(0,1);
        events[task.events[0].type](task, file, fullPath);
      }
    })
    .catch((err) => {
      console.log('Could not rename file "%s" from %s to %s', file, origin, newName);
      throw new Error(err);
    });
  },
  copy: (task, file, fullPath) => {
    let parts = file.split('.');
    let origin = path.join(fullPath,file),
        dest = task.events[0].copyName
          ? path.join(fullPath, path.join(task.events[0].copyName+path.extname(file)))
          : path.join(fullPath, path.join(path.parse(file).name+' (2)'+path.extname(file)));

    let rs = fs.createReadStream(origin),
        ws = fs.createWriteStream(dest);

    rs.pipe(ws);
    rs.on('error', function(err) {
      throw new Exception(err);
    });
    ws.on('error', err => {
      throw new Exception(err);
    })
    rs.on('close', () => {
      if(task.events.length > 1) {
        task.events.splice(0,1);
        events[task.events[0].type](task, file, fullPath);
      }
    });
    ws.on('finish', () => {
      console.log('Done writing to copy.');
    });

  },
  delete: (task, file, fullPath) => {
    let filePath = path.join(fullPath, file);

    unlink(filePath).then(() => {
      log(task);
      if(task.events.length > 1) {
        task.events.splice(0,1);
        events[task.events[0].type](task, file, fullPath);
      }
    })
    .catch(err => {
      throw new Error(err);
    });
  }
};

module.exports = events
