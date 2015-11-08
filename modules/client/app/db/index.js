import lowdb from 'lowdb';
let folders = lowdb('config/app_configuration.min.JSON');
folders._.mixin(require('underscore-db'));

module.exports = folders;