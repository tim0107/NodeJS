const express = require('express');
const router = express.Router();

const {
  createVps,
  getAllVps,
  getOneVps,
  updateVps,
  deleteVps,
  changeVpsStatus,
} = require('../controllers/vps.controller');

const asyncMiddleware = require('../middleware/asyncMiddleware');
const roleMiddleWare = require('../middleware/role.middleware');
const authMiddleware = require('../middleware/auth.middleware');

router
  .route('/')
  .get(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin','user'])),
    asyncMiddleware(getAllVps),
  )
  .post(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin'])),
    asyncMiddleware(createVps),
  );

router
  .route('/:id')
  .get(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin','user'])),
    asyncMiddleware(getOneVps),
  )
  .patch(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin'])),
    asyncMiddleware(updateVps),
  )
  .delete(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin'])),
    asyncMiddleware(deleteVps),
  );

router.route('/admin/:id').patch(asyncMiddleware(changeVpsStatus));

module.exports = router;
