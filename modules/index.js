import express from 'express';
import bodyParser from 'body-parser'
import dirsortjs from './logic'
import path from 'path';
import http from 'http';
import Promise from 'bluebird';
import fs from 'fs';


let stat = Promise.promisify(fs.stat),
    app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');
app.set('view options', {
  layout: false
});

app.use(express.static(path.join(__dirname, '../client/')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes')(app);

http.createServer(app).listen('8151', () => {
  console.log('Express server listening on port ' + 8151);
});

let config;


app.get('/', function (req, res) {
  console.log('config:'+config);
  res.render('content', {layout: 'layout', folders: config});
});

app.get('/overview', function (req, res) {

  res.render('overview', {layout: 'layout', lol: 'hejdå'});
});

app.get('/folders', function (req, res) {

  res.render('folders', {layout: 'layout', folders: config});
});

app.get('/add/folder', function (req, res) {

  res.render('add_folder', {layout: 'layout'});
});

app.get('/client/index.js', function (req, res) {

  res.sendFile(path.join(__dirname, '../client/index.js'));
});



dirsortjs.start(function(result, err) {

  if(err) {
    throw Error(err);
  }
  console.log('result:');
  console.log(result);
  config = result;
});

process.on('uncaughtException', function (er) {
  console.error(er.stack)
  process.exit(1)
});

// Expose app
exports = module.exports = app;

