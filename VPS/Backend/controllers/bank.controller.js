const bankModel = require('../models/bank.model');

module.exports = {
  createBank: async (req, res) => {
    const { bankName, bankNumber, bankOwner } = req.body;
    const bank = await bankModel.create({ bankName, bankNumber, bankOwner });
    return res.status(201).json(bank);
  },
  getAllBank: async (req, res) => {
    const getAllBank = await bankModel.find({});
    return res.status(200).json(getAllBank);
  },
  getOneBank: async (req, res) => {
    const id = req.params.id;
    const getBank = await bankModel.findById(id);
    return res.status(200).json(getBank);
  },
  updateBank: async (req, res) => {
    const id = req.params.id;
    const { bankName, bankNumber, bankOwner } = req.body;
    const update = await bankModel.findByIdAndUpdate(
      id,
      { bankName, bankNumber, bankOwner },
      { new: true },
    );
    if (update) {
      return res.status(200).json(update);
    } else {
      return res.status(400).json({ message: 'failed' });
    }
  },
  deleteBank: async (req,res) => {
    const id = req.params.id;
    const deleteBank = await bankModel.findByIdAndDelete(id);
    if(!deleteBank) {
        return res.status(400).json({message: 'failed or not found'});
    } else {
        return res.status(200).json({message: "deleted"})
    }
  }
};
