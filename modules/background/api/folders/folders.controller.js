import Promise from 'bluebird';
import path from 'path';
import configHelper from '../configHelper.js';

let Response = (error, data, status) => {
  return {
    error,
    data,
    status
  };
}

let fs = Promise.promisifyAll(require('fs'));


const add = (req, res) => {
  if(!path.isAbsolute(req.body.folder)) {
    res.sendStatus(404);
  } else {
    fs.statAsync(req.body.folder)
    .then(stats => {
      if(stats.isDirectory()) {
        configHelper.saveFolder(
        {'folder': {
            'name': path.basename(req.body.folder),
            'path': path.dirname(req.body.folder)
          }
        }).then(() => res.sendStatus(null, null, 200));

      } else {

        res.sendStatus(420);
      }
    })
    .catch(err => {
      res.sendStatus(420);
    })
  }
};

const get = (req, res) => {
  configHelper.get().then((folders) => {
    console.log(folders);
    folders.fest = 'hej';
    console.log("Skickar response!");
    res.sender.send('folders/get', new Response(null, folders, 200));
  })
  .catch(err => {
    res.sender.send('folders/get', new Response(err.message, null, 404));
  })
}

module.exports = {
  add,
  get
};