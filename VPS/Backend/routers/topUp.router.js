const express = require('express');
const router = express.Router();

const {
  createTopUp,
  getOneTopUp,
  updateTopUp,
  deleteTopUp,
  getAllTopUp,
  approveTopUp,
  getAllTopUpForUser,
} = require('../controllers/topUp.controller');

const asyncMiddleware = require('../middleware/asyncMiddleware');
const roleMiddleWare = require('../middleware/role.middleware');
const authMiddleware = require('../middleware/auth.middleware');

router
  .route('/')
  .get(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin'])),
    asyncMiddleware(getAllTopUp),
  )
  .post(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin','user'])),
    asyncMiddleware(createTopUp),
  );

router
  .route('/:id')
  .patch(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin','user'])),
    asyncMiddleware(updateTopUp),
  )
  .get(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin'])),
    asyncMiddleware(getOneTopUp),
  )
  .delete(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin','user'])),
    asyncMiddleware(deleteTopUp),
  );

router.route('/admin/:id').patch(asyncMiddleware(approveTopUp));

router.route('/user/:id').get(asyncMiddleware(getAllTopUpForUser));

module.exports = router;
