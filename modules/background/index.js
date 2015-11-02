import dirsortjs from './logic'
import path from 'path';
import http from 'http';
import Promise from 'bluebird';
import configHelper from './api/configHelper.js';
import background from './background.js';
import ipc from 'ipc';

background();

require('./routes')(ipc);

process.on('uncaughtException', function (er) {
  console.error(er.stack)
  process.exit(1)
});

