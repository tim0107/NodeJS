const express = require('express');
const router = express.Router();

const {
  createAccount,
  getAllAccount,
  updateAccount,
  deleteAccount,
  getOneAccount,
  changeRole,
} = require('../controllers/account.controller');

const asyncMiddleware = require('../middleware/asyncMiddleware');
const roleMiddleWare = require('../middleware/role.middleware');
const authMiddleware = require('../middleware/auth.middleware');

router
  .route('/')
  .post(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin'])),
    asyncMiddleware(createAccount),
  )
  .get(
   // asyncMiddleware(authMiddleware),
   // asyncMiddleware(roleMiddleWare(['admin', 'user'])),
    asyncMiddleware(getAllAccount),
  );

router
  .route('/')
  .patch(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin', 'user'])),
    asyncMiddleware(updateAccount),
  )
  .delete(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin'])),
    deleteAccount,
  )
  .get(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin'])),
    asyncMiddleware(getOneAccount),
  );

router
  .route('/changeRole/')
  .patch(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin'])),
    asyncMiddleware(changeRole),
  );

console.log('this is from account route');

module.exports = router;
