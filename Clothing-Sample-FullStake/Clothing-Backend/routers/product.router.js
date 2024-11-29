const express = require('express');
const router = express.Router();

const {
  createProduct,
  deleteProducts,
  updateProduct,
  getProductById,
  getProducts,
} = require('../controllers/product.controller');


router.route('/')
.get(getProducts)
.post(createProduct)

router.route('/:id')
.get(getProductById)
.patch(updateProduct)
.delete(deleteProducts)

module.exports = router;