const express = require('express');
const router = express.Router();

const {getCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
    createCategory
} = require('../controllers/category.controller')



router.route('/')
.get(getCategory)
.post(createCategory)

router.route('/:id')
.patch(updateCategory)
.delete(deleteCategory)
.get(getCategoryById)


module.exports = router;
