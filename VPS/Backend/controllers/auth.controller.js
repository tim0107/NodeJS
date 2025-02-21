const accountModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const emailSender = require('../helpers/email.sender');

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
    const { username, password, fullname, email } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000);


    const registerAcc = await accountModel.create({
      username,
      password,
      fullname,
      role: 'user',
      balance: 0,
      email,
      otp,
      otpExpiresAt: Date.now() + 10 * 60 * 1000,
    });

    console.log(registerAcc);

    // send mail
    emailSender({
      email,
      subject: 'Tieu de',
      html: `OTP is ${otp}, expired in 10 minutes`,
    });

    setTimeout(async () => {
      const user = await accountModel.find({ email });
      if (user && !user.isVerified) {
        await accountModel.findByIdAndDelete(registerAcc._id);
      }
    }, 10 * 60 * 1000);
    return res.status(201).json(registerAcc);
  },

  otpVerify: async (req, res) => {
    const { email, otp } = req.body;

    const user = await accountModel.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.otp === parseInt(otp) && user.otpExpiresAt > Date.now()) {
      user.isVerified = true; 
      await user.save();
      return res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      console.log(user.otp)
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
  },
};
