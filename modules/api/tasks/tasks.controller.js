import Promise from 'bluebird';
import fs from 'fs';
import path from 'path';
import url from 'url';
import configHelper from '../configHelper.js'

const add = (req, res) => {

  let body = req.body;
  console.log(JSON.parse(body["rules"]));

  saveTask(body.folderName, body.folderPath, body.taskName, 
          body.taskDescription, body.matchAll, body.interval, JSON.parse(body.rules))
  .then(() => {
    return res.sendStatus(200);
  })
  .catch(err => {
    throw new Error(err);
  });

};

const get = (req, res) => {
  let urlParts = url.parse(req.url, true);
  let query = urlParts.query;
  if(!query || !query.folderName || !query.folderPath) {
    res.statusCode(400);
  } else {
    configHelper
    .getTasks(query.folderName, query.folderPath, query.taskId)
    .then(tasks => res.send(JSON.stringify(tasks)));
  }
}

const saveTask = (folderName, folderPath, taskName, taskDescription, matchAll, interval, rules, cb) => {

  let task = {
    "name": taskName,
    "description": taskDescription,
    "matchAll": matchAll,
    "interval": parseInt(interval, 10),
    "rules": rules
  };

  return configHelper.saveTask(folderName, folderPath, task);
}




module.exports = {
  add,
  get
};