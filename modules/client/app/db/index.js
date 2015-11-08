import lowdb from 'lowdb';
import _ from 'lodash';
let folders = lowdb('config/app_configuration.min.JSON');
folders._.mixin(require('underscore-db'));

module.exports = folders;