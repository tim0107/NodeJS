const accountModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;

    console.log('Request Body:', req.body);

    const account = await accountModel.findOne({ username });
    console.log(account);
    

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
      { id: account._id, username: account.username, role: account.role },
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
  register: async (req, res) => {
    const { username, password, fullname } = req.body;

    const registerAcc = await accountModel.create({
      username,
      password,
      fullname,
      role: 'user',
      balance: 0
    });

    console.log(registerAcc);
    return res.status(201).json(registerAcc);
  },
};
