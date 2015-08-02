import express from 'express';
import bodyParser from 'body-parser'
import dirsortjs from './logic'
import path from 'path';
import http from 'http';
import Promise from 'bluebird';

let app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');
app.set('view options', {
  layout: false
});
app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

http.createServer(app).listen('8151', () => {
  console.log('Express server listening on port ' + 8151);
  //console.log('Visit @ ' + config.DOMAIN);
});

console.log(dirsortjs.start);

let config;


dirsortjs.start(function(result, err) {

  if(err) {
    throw Error(err);
  }
  console.log('result:');
  console.log(result);
  config = result;
});


app.get('/', function (req, res) {
  var json_string = {'action': 'date +%s','result': '1367263074'};
  console.log('config:'+config);
  res.render('content', {layout: 'layout', folders: config});
})



process.on('uncaughtException', function (er) {
  console.error(er.stack)
  process.exit(1)
})

