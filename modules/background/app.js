import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

let app = express();

app.set('views', path.join(__dirname, '../'));
app.set('view engine', 'html');
app.set('view options', {
  layout: false
});

app.use(express.static(path.join(__dirname, '../client/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = app;