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
    
    const updates = Object.keys(req.body); 
    const id = req.account._id
    const userRole = req.account.role; 
    console.log(userRole)

    let allowedUpdates = [];
    if (userRole === "admin") {
      allowedUpdates = ["accountName", "password", "address", "phone", "role"];
    } else if (userRole === "user") {
      allowedUpdates = ["accountName", "password", "address", "phone"];
    }

    const isValid = updates.every((key) => allowedUpdates.includes(key));
    if (!isValid) {
      return res.status(400).json({ message: "not allow" });
    }

    const updateFields = {};
    updates.forEach((key) => {
      updateFields[key] = req.body[key];
    });

    const update = await accountModel.findByIdAndUpdate
    (
      id,
      {$set: updateFields},
      {new:true}
    );

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
