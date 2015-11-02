'use strict';

import controller from './tasks';
import Router from 'routes';

let router = new Router();

router.addRoute('add', controller.add);
router.addRoute('get', controller.get);

module.exports = router;