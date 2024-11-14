const express = require('express');
const router = express.Router();

const {getProductById,
    createProduct,
    updateProduct,
    deleteProducts,
    getProducts
} = require('../controllers/product.controller');


router.route('/')
.get(getProducts)
.post(createProduct)



router.route('/:id')
.get(getProductById)
.patch(updateProduct)
.delete(deleteProducts)

// console.log('from products route');

module.exports = router;