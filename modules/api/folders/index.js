'use strict';

let express = require('express'),
    controller = require('./folders'),
    router = express.Router();

console.log(controller);

router.post('/add', controller.add);


module.exports = router;