const express = require('express');
const router = express.Router();

const {login, register, getAccounts} = require('../controllers/account.controller');



router.route('/register')
.post(register)


router.route('/login')
.post(login)

router.route("/")
.get(getAccounts)

module.exports = router;