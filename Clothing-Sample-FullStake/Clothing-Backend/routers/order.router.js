const express = require('express')
const router = express.Router();

const {createOrder,getAllOrder,getOrderByAccount} = require('../controllers/order.controller');

console.log('this is from order');


router.route('/')
.post(createOrder)
.get(getAllOrder)


router.route('/:account_id')
.get(getOrderByAccount)



module.exports = router; 