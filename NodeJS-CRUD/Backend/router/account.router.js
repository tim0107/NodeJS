const express = require('express');
const router = express.Router();

const {
    getAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
    getAccountById
} = require('../controllers/account.controller');

router
.route('/')
.post(createAccount)
.get(getAccounts);

router
.route('/:id')
.patch(updateAccount)
.delete(deleteAccount)
.get(getAccountById);

// console.log('this is from account route')


module.exports = router;