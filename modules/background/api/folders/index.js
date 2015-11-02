'use strict';

import controller from './folders';
import Router from 'routes';

let router = new Router();

router.addRoute('get', controller.get);
router.addRoute('add', controller.add);

module.exports = router;