import Promise from 'bluebird';
import path from 'path';
import configHelper from '../configHelper.js';

let Response = (status, error, data) => {
  return {
    status, //Use HTTP status code
    error,  //Error object
    data    //Response data
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
        }).then(() => res.sendStatus(201));

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
    folders.fest = 'hej';
    res.sender.send('folders/get', new Response(200, null, folders));
  })
  .catch(err => {
    res.sender.send('folders/get', new Response(404, err.message, null));
  })
}

module.exports = {
  add,
  get
};