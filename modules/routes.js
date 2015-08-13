/**
 * Main application routes
 */

'use strict';


module.exports = function(app) {

  app.use('/api/folders', require('./api/folders'));

  // All undefined asset or api routes should return a 404
  /*app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);*/
}


