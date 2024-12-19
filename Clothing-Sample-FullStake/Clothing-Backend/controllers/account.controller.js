const jwt = require('jsonwebtoken');
require('dotenv').config();
const accountModel = require("../models/account.model");
const { param } = require('../routers/order.router');

require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY; 


module.exports = {

  createAccount: async (req,res) => {
    const body = req.body;
    const createAcc = await accountModel.create(body);
    return res.status(201).json(createAcc);
  },

  updateAccount: async(req,res) => {
    
    const body = req.body;

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    } const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;

    console.log(body)
    console.log(decoded)
    console.log(userId)
    

    const update = await accountModel.findByIdAndUpdate(userId,body,{new:true});

    if(update) {
      return res.status(200).json({message: "updated"})
    } else {
      return res.status(400).json({message: "not found"})
    }
  },

  deleteAccount: async(req,res) => {
    const id = req.params.id;

    const deleted = await accountModel.findByIdAndDelete(id);

    if(!deleted) {
      return res.status(400).json({message: 'account not found'});
  }

    return res.status(200).json({message: "deleted"});
  },
};
