const accountModel = require('../models/user.model');

module.exports = {
  createAccount: async (req, res) => {
    const { username, password, fullname, role } = req.body;
    const create = await accountModel.create({
      username,
      password,
      fullname,
      role,
      balance: 0,
    });

    console.log(create);

    return res.status(201).json(create);
  },
  getAllAccount: async (req, res) => {
    const get = await accountModel.find({});
    return res.status(200).json(get);
  },
  getOneAccount: async (req, res) => {
    const id = req.params.id;
    const account = await accountModel.findById({ id });
    if (!account) {
      return res.statusA(400).json({ message: ' account not found' });
    }
    return res.status(200).json(account);
  },
  updateAccount: async (req, res) => {
    const updates = Object.keys(req.body);

    const userRole = req.account.role;
    console.log(userRole);

    let idToUpdate = req.account._id;

    let allowedUpdates = [];
    if (userRole === 'admin') {
      allowedUpdates = ['username', 'password', 'fullname', 'role'];
      if (req.body.id) {
        idToUpdate = req.body.id;
      }
    } else if (userRole === 'user') {
      allowedUpdates = ['username', 'password', 'fullname'];
    }

    const newTableFields = updates.filter((key) => key !== 'id');
    const isValid = newTableFields.every((key) => allowedUpdates.includes(key));

    if (!isValid) {
      return res.status(400).json({ message: 'not allow' });
    }

    const updateFields = {};
    updates.forEach((key) => {
      updateFields[key] = req.body[key];
    });

    const update = await accountModel.findByIdAndUpdate(
      idToUpdate,
      { $set: updateFields },
      { new: true },
    );

    if (update) {
      return res.status(200).json({ message: 'updated' });
    } else {
      return res.status(400).json({ message: 'not found' });
    }
  },
  deleteAccount: async (req, res) => {
    const id = req.params.id;
    const deleted = await accountModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(400).json({ message: 'not found' });
    }
    return res.status(200).json({ message: 'deleted' });
  },
  changeRole: async (req, res) => {
    const { id, role } = req.body;
    if (role !== 'user' && role !== 'admin') {
      return res.status(400).json({ message: 'enter a valid role' });
    }
    const user = await accountModel.findById(id);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const newRole = await accountModel.findByIdAndUpdate(
      id,
      { role },
      { new: true },
    );

    return res.status(200).json({
      message: ' updated role',
      data: newRole,
    });
  },
};
