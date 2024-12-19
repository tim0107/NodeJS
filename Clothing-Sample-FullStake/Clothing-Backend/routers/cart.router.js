const express = require('express');
const router = express.Router();

const {addToCart,getCart,deleteCart,updateCart} = require('../controllers/cart.controller');

const asyncMiddleware = require('../middleware/async.middleware')

router.route('/')
.post(asyncMiddleware(addToCart))



router.route('/account/:account_id')
.get(asyncMiddleware(getCart));

router.route('/account/:account_id/:product_id')
.delete(asyncMiddleware(deleteCart))
.patch(asyncMiddleware(updateCart))









module.exports = router;