'use strict';

let express = require('express'),
    controller = require('./tasks'),
    router = express.Router();

router.post('/add', controller.add);
router.get('/get', controller.get);

module.exports = router;