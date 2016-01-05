import lowdb from 'lowdb';
import _ from 'lodash';
let folders = lowdb('static/json/app_configuration.json');
folders._.mixin(require('underscore-db'));

module.exports = folders;