const express = require('express')
const router = express.Router();

const {createOrder,getAllOrder,getOrderByAccount} = require('../controllers/order.controller');

const asyncMiddleware = require('../middleware/async.middleware')


router.route('/')
.post(asyncMiddleware(createOrder))
.get(asyncMiddleware(getAllOrder))


router.route('/:account_id')
.get(asyncMiddleware(getOrderByAccount))



module.exports = router; 