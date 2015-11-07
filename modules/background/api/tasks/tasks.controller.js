import Promise from 'bluebird';
import fs from 'fs';
import path from 'path';
import url from 'url';
import configHelper from '../configHelper.js'

let Response = (error, data, status) => {
  return {
    error,
    data,
    status
  };
}

const add = (req, res) => {

  let body = req.body;
  console.log(JSON.parse(body['rules']));

  saveTask(body.folderName, body.folderPath, body.taskName,
          body.taskDescription, body.matchAll, body.interval, JSON.parse(body.rules))
  .then(() => {
    return res.sender.send('tasks/add', new Response(null, null, 200));
  })
  .catch(err => {
    throw new Error(err);
  });

};

const get = (req, res) => {

  return configHelper
  .getTasks(req.where.name, req.where.path)
  .then(tasks => res.sender.send('tasks/get', new Response(200, null, tasks)))
  .catch(err => {
    res.sender.send('tasks/get', new Response(404, err.message, null));
    console.log(err.message);
  });
}

const saveTask = (folderName, folderPath, taskName, taskDescription, matchAll, interval, rules, cb) => {

  let task = {
    'name':         taskName,
    'description':  taskDescription,
    'matchAll':     matchAll,
    'interval':     parseInt(interval, 10),
    'rules':        rules
  };

  return configHelper.saveTask(folderName, folderPath, task);
}


module.exports = {
  add,
  get
};