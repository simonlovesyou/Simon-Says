import express from 'express';
import bodyParser from 'body-parser'
import dirsortjs from './logic_c'
import path from 'path';
import http from 'http';

let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

http.createServer(app).listen('8151', () => {
  console.log('Express server listening on port ' + 8151);
  //console.log('Visit @ ' + config.DOMAIN);
});

console.log(dirsortjs);

dirsortjs.start();


