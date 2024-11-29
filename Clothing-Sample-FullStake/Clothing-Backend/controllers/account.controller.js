const accountModel = require('../models/account.model');

module.exports = {
  register: async (req, res) => {
    try {
      const body = req.body;
      const registerAcc = await accountModel.create(body);
      return res.status(201).json(registerAcc);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const body = req.body;
      const account = await accountModel.findOne(body);
      if (!account) {
        return res.status(400).json({
          statusCode: 400,
          message: 'Tài khoản hoặc mật khẩu không đúng',
        });
      }
      return res.status(200).json(account);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getAccounts: async (req, res) => {
    try {
        let account = await accountModel.find()
        return res.status(200).json(account);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
