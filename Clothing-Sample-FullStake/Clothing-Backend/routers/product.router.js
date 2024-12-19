const express = require('express');
const router = express.Router();

const {
  createProduct,
  deleteProducts,
  updateProduct,
  getProductById,
  getProducts,
} = require('../controllers/product.controller');

const asyncMiddleware = require('../middleware/async.middleware')



router.route('/')
.get(asyncMiddleware(getProducts))
.post(asyncMiddleware(createProduct))

router.route('/:id')
.get(asyncMiddleware(getProductById))
.patch(asyncMiddleware(updateProduct))
.delete(asyncMiddleware(deleteProducts))

module.exports = router;