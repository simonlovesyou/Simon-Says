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
  let values = req.values;

  let task = {
    'name':         values.name,
    'description':  values.description,
    'matchAll':     values.matchAll,
    'interval':     parseInt(values.interval, 10),
    'rules':        values.rules
  };

  return configHelper
  .saveTask(values.folderName, values.folderPath, task)
  .then(() => {
    return res.sender.send('tasks/add', new Response(null, null, 200));
  })
  .catch(err => {
    throw err;
  });

};

const get = (req, res) => {

  return configHelper
  .getTasks(req.where.name, req.where.path)
  .then(tasks => res.sender.send('tasks/get', new Response(null, tasks, 200)))
  .catch(err => {
    res.sender.send('tasks/get', new Response(err.message, null, 404));
    console.log(err.message);
  });
}

module.exports = {
  add,
  get
};