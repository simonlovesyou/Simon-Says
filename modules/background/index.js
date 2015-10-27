import dirsortjs from './logic'
import path from 'path';
import http from 'http';
import Promise from 'bluebird';
import configHelper from './api/configHelper.js';
import app from './app.js';
import background from './background.js';

background();

http.createServer(app).listen('8151', () => {
  console.log('Express server listening on port ' + 8151);
});

require('./routes')(app);

app.get('/', function (req, res) {
  configHelper.get().then(config => {
    res.render('content', {layout: 'layout', folders: config});
  });
});

app.get('/overview', function (req, res) {
  res.render('overview', {layout: 'layout'});
});

app.get('/folders', function (req, res) {

  configHelper.get().then(config => {
    res.render('folders', {layout: 'layout', folders: config});
  });
});

app.get('/add/folder', function (req, res) {

  res.render('add_folder', {layout: 'layout'});
});

app.get('/client/index.js', function (req, res) {

  res.sendFile(path.join(__dirname, '../client/index.js'));
})
app.get('/client/main.css', function (req, res) {

  res.sendFile(path.join(__dirname, '../client/main.css'));
});



/*dirsortjs.start(function(result, err) {

  if(err) {
    throw Error(err);
  }
});*/

process.on('uncaughtException', function (er) {
  console.error(er.stack)
  process.exit(1)
});




// Expose app
exports = module.exports = app;

