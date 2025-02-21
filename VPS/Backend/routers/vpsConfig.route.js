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


const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const index = file.originalname.lastIndexOf('.');
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname.slice(index))
  }
})

const upload = multer({ storage: storage })
//const upload = multer({dest: 'uploads/images'})

router
  .route('/')
  .get(
   // asyncMiddleware(authMiddleware),
   // asyncMiddleware(roleMiddleWare(['admin','user'])),
    asyncMiddleware(getAllVpsConfig),
  )
  .post(upload.single('img'),
    //asyncMiddleware(authMiddleware),
   //asyncMiddleware(roleMiddleWare(['admin'])),
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
