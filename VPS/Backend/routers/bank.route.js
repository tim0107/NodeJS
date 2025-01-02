const express = require('express');
const router = express.Router();

const {
  createBank,
  getAllBank,
  getOneBank,
  updateBank,
  deleteBank,
} = require('../controllers/bank.controller');

const asyncMiddleware = require('../middleware/asyncMiddleware');
const roleMiddleWare = require('../middleware/role.middleware');
const authMiddleware = require('../middleware/auth.middleware');

router
  .route('/')
  .post(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin'])),
    asyncMiddleware(createBank),
  )
  .get(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin', 'user'])),
    asyncMiddleware(getAllBank),
  );

router
  .route('/:id')
  .get(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin'])),
    asyncMiddleware(getOneBank),
  )
  .patch(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin'])),
    asyncMiddleware(updateBank),
  )
  .delete(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin'])),
    asyncMiddleware(deleteBank),
  );

console.log('this is from bank router');

module.exports = router;
