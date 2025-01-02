const express = require('express');
const router = express.Router();

const {
  createVpsConfig,
  getAllVpsConfig,
  getOneVpsConfig,
  updateVpsConfig,
  deleteVpsConfig,
} = require('../controllers/vpsConfig.controller');

const asyncMiddleware = require('../middleware/asyncMiddleware');
const roleMiddleWare = require('../middleware/role.middleware');
const authMiddleware = require('../middleware/auth.middleware');

router
  .route('/')
  .get(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin','user'])),
    asyncMiddleware(getAllVpsConfig),
  )
  .post(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin'])),
    asyncMiddleware(createVpsConfig),
  );

router
  .route('/:id')
  .get(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin','user'])),
    asyncMiddleware(getOneVpsConfig),
  )
  .patch(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin'])),
    asyncMiddleware(updateVpsConfig),
  )
  .delete(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleWare(['admin'])),
    asyncMiddleware(deleteVpsConfig),
  );

module.exports = router;
