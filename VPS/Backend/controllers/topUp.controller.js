const mongoose = require('mongoose');
const topUpModel = require('../models/topUp.model');
const bankModel = require('../models/bank.model');
const userModel = require('../models/user.model');

module.exports = {
  createTopUp: async (req, res) => {
    const { userId, amount, bankName } = req.body;

    console.log('UserID received:', userId);

    const bank = await bankModel.findOne({ bankName });
    if (!bank) {
      return res.status(400).json({ message: 'Bank not found' });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const topUp = await topUpModel.create({
      userId: user._id,
      bankId: bank._id,
      amount,
      status: 'pending',
    });

    return res.status(201).json({
      topUp,
      message: ' top up waitting for approve',
    });
  },

  approveTopUp: async (req, res) => {
    const topUpId = req.params.id;

    const topUp = await topUpModel.findById(topUpId);
    if (!topUp) {
      res.status(400).json({ message: 'top-up not found' });
    }
    console.log(topUp);

    if (topUp.status === 'accepted') {
      res.status(400).json({ message: 'top-up already accepted' });
    }

    const user = await userModel.findById(topUp.userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    console.log(user);

    user.balance = user.balance || 0;
    user.balance += topUp.amount;

    await user.save();

    topUp.status = 'accepted';
    await topUp.save();

    return res.status(200).json({
      message: 'Top-up approved ',
      topUp,
      updatedBalance: user.balance,
    });
  },

  getAllTopUpForUser: async (req,res) => {
    const userId = req.params.id;

    const topUps = await topUpModel.find({ userId }); 

    return res.status(200).json(topUps)
  },

  getAllTopUp: async (req, res) => {
    const getTopUp = await topUpModel.find({});
    return res.status(200).json(getTopUp);
  },
  getOneTopUp: async (req, res) => {
    const id = req.params.id;

    const getTopUp = await topUpModel.findById(id);
    return res.status(200).json(getTopUp);
  },
  updateTopUp: async (req, res) => {
    const id = req.params.id;
    const { amount, bankName } = req.body;

    const bank = await bankModel.findOne({ bankName });
    if (!bank) {
      return res.status(400).json({ message: 'bank not found' });
    }

    const update = await topUpModel.findByIdAndUpdate(
      id,
      { amount, bankId: bank._id },
      { new: true },
    );
    if (!update) {
      return res.status(400).json({ message: 'failed to update' });
    }
    return res.status(200).json(update);
  },
  deleteTopUp: async (req, res) => {
    const id = req.params.id;
    const deleteTopUp = await topUpModel.findByIdAndDelete(id);
    if (!deleteTopUp) {
      return res.status(400).json({ message: 'failed or not found' });
    }
    return res.status(200).json({ message: 'deleted' });
  },
};
