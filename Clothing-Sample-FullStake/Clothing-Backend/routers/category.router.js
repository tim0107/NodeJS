const express = require('express');
const router = express.Router();

const {
  getCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  createCategory,
} = require('../controllers/category.controller');

console.log('from cate router')


router.route('/')
.get(getCategory)
.post(createCategory)

router.route('/:id')
.get(getCategoryById)
.patch(updateCategory)
.delete(deleteCategory)

module.exports = router; 