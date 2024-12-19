const express = require('express');
const router = express.Router();

const {
  login,
  register,
  getAccounts,
} = require('../controllers/auth.controller');
const {
  createAccount,
  updateAccount,
  deleteAccount,
} = require('../controllers/account.controller');
//const {authAdmin} = require('../controllers/account.controller')

const asyncMiddleware = require('../middleware/async.middleware');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router.route('/register').post(asyncMiddleware(register));

router.route('/login').post(asyncMiddleware(login));

router
  .route('/')
  .get(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleware(['admin'])),
    asyncMiddleware(getAccounts),
  )
  .post(asyncMiddleware(createAccount));

router
  .route('/')
  .patch(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleware(['admin','user'])),
    asyncMiddleware(updateAccount),
  )
  .delete(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleware(['user'])),
    asyncMiddleware(deleteAccount),
  );

module.exports = router;
