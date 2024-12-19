const express = require('express');
const router = express.Router();

const {
  getCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  createCategory,
} = require('../controllers/category.controller');

const asyncMiddleware = require('../middleware/async.middleware');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router
  .route('/')
  .get(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleware(['admin'])),
    asyncMiddleware(getCategory),
  )
  .post(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleware(['admin'])),
    asyncMiddleware(createCategory),
  );

router
  .route('/:id')
  .get(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleware(['admin'])),
    asyncMiddleware(getCategoryById),
  )
  .patch(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleware(['admin'])),
    asyncMiddleware(updateCategory),
  )
  .delete(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleware(['admin'])),
    asyncMiddleware(deleteCategory),
  );

module.exports = router;
