const accountModel = require('../models/account.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
  register: async (req, res) => {
    const body = req.body;
    const registerAcc = await accountModel.create(body);
    return res.status(201).json(registerAcc);
  },
  login: async (req, res) => {
    const { accountName, password } = req.body;

    console.log('Request Body:', req.body);

    const account = await accountModel.findOne({ accountName });

    if (!account) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Tài khoản hoặc mật khẩu không đúng',
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, account.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Tài khoản hoặc mật khẩu không đúng',
      });
    }

    const token = jwt.sign(
      { id: account._id, username: account.accountName, role: account.role },
      SECRET_KEY,
      { expiresIn: '15h' },
    );

    return res.status(200).json({
      account,
      role: account.role,
      message: 'logged in',
      token,
    });
  },

  getAccounts: async (req, res) => {
    let account = await accountModel.find();
    return res.status(200).json(account);
  },

  adminAccount: async (req, res) => {
    const body = req.body;
    const account = await accountModel.findOne(body);
    if (!account) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Tài khoản hoặc mật khẩu không đúng',
      });
    }
  },
};
