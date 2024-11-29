const express = require('express');
const router = express.Router();

const {addToCart,getCart,deleteCart,updateCart} = require('../controllers/cart.controller');

router.route('/')
.post(addToCart)



router.route('/account/:account_id')
.get(getCart);

router.route('/account/:account_id/:product_id')
.delete(deleteCart)
.patch(updateCart)







module.exports = router;