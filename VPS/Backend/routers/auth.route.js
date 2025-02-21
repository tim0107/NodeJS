const express = require('express');
const router = express.Router();
const roleMiddleWare = require('../middleware/role.middleware');

const { login, register, otpVerify } = require('../controllers/auth.controller');

const asyncMiddleware = require('../middleware/asyncMiddleware');
const validateRegistration = require('../validate/role.validate');

router.route('/login').post(asyncMiddleware(login));

router
  .route('/register')
  .post(asyncMiddleware(validateRegistration), asyncMiddleware(register));

router
 .route('/verifyotp')
 .get(asyncMiddleware(validateRegistration), asyncMiddleware(otpVerify));


module.exports = router;
