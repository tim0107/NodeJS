const express = require('express');
const router = express.Router();

const {
  createOrder,
  getAllOrder,
  getOneOder,
  // updateOrder,
  deleteOrder,
  acceptOrderByAdmin,
} = require('../controllers/order.controller');

const asyncMiddleware = require('../middleware/asyncMiddleware');
const roleMiddleWare = require('../middleware/role.middleware');
const authMiddleware = require('../middleware/auth.middleware');

router
  .route('/')
  .get(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin'])),
    asyncMiddleware(getAllOrder),
  );

router
  .route('/:id')
  .get(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin','user'])),
    asyncMiddleware(getOneOder),
  )
  //.patch(asyncMiddleware(updateOrder))
  .delete(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin', 'user'])),
    asyncMiddleware(deleteOrder),
  )
  .post(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin', 'user'])),
    asyncMiddleware(createOrder),
  );

router
  .route('/adminAcceptOrder/:id')
  .patch(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin'])),
    asyncMiddleware(acceptOrderByAdmin),
  );

module.exports = router;
