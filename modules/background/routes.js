/**
 * Main application routes
 */

'use strict';

module.exports = function(ipc) {
  ipc.on('folders', (sender, req) => {
    require('./api/folders').match(req.query).fn(req, sender);
  });
  ipc.on('tasks', (sender, req) => {
    require('./api/tasks').match(req.query).fn(req, sender);
  });
}