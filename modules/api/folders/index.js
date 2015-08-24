'use strict';

let express = require('express'),
    controller = require('./folders'),
    router = express.Router();

router.post('/add', controller.add);


module.exports = router;