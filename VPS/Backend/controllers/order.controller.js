const orderModel = require('../models/order.model');
const userModel = require('../models/user.model');
const accountModel = require('../models/user.model');
const vpsModel = require('../models/vps.model');
const vpsConfigModel = require('../models/vpsConfig.model');

module.exports = {
  createOrder: async (req, res) => {
    const id = req.params.id;

    const { vpsName, amount, startDate, endDate } = req.body;

    const user = await accountModel.findById(id);
    if (!user) {
      return res.status(400).json({ message: 'account not found' });
    }

    const vpsDetail = await vpsModel.findOne({ vpsName });
    if (!vpsDetail || vpsDetail.status === 'inactive') {
      return res.status(400).json({ message: 'vps not found' });
    }

    const order = await orderModel.create({
      userId: id,
      vpsId: vpsDetail._id,
      amount,
      startDate,
      endDate,
      status: 'pending',
    });
    return res.status(201).json(order);
  },
  acceptOrderByAdmin: async (req, res) => {
    const orderId = req.params.id;

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(400).json({ message: 'Order not found' });
    }

    if (order.status === 'success' || order.status === 'completed') {
      return res
        .status(400)
        .json({ message: 'Order is already success or complete' });
    }

    if (order.status === 'pending') {
      order.status = 'success';
      await order.save();
    }

    const vps = await vpsModel.findById(order.vpsId);
    if (!vps) {
      return res.status(400).json({ message: 'vps not found' });
    }

    const vpsConfig = await vpsConfigModel.findOne({ os: vps.os });
    if (!vpsConfig) {
      return res.status(400).json({ message: 'vps not found' });
    }

    const vpsPrice = vpsConfig.price;

    const start = new Date(order.startDate);
    const end = new Date(order.endDate);

    const diffInTime = end - start;
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    const fullMonths = Math.floor(diffInDays / 30);
    const remainingDays = diffInDays % 30;
    let totalCost = fullMonths * vpsPrice;
    if (remainingDays > 0) {
      totalCost += (remainingDays / 30) * vpsPrice;
    }

    const user = await userModel.findById(order.userId);
    console.log(user);

    if (!user) {
      return res.status(400).json({ message: 'user not found' });
    }
    const priceOfOrder = parseFloat(totalCost.toFixed(2));
    user.balance = parseFloat(user.balance);

    console.log({ userBalance: user.balance });
    console.log({ priceOfOrder });

    if (user.balance < priceOfOrder) {
      console.log('Not enough money');
      order.status = 'failed';
      await order.save();
      return res.status(400).json({
        status: 'failed',
        message: 'Not enough money',
      });
    }

    user.balance -= priceOfOrder;
    await user.save();
    order.status = 'success';
    await order.save();

    const currentDate = new Date();
    if (currentDate >= end) {
      order.status = 'completed';
      await order.save();
    }

    return res.status(200).json({
      status: 'success',
      message: 'Order accepted',
      updatedBalance: user.balance,
    });
  },
  getOneOder: async (req, res) => {
    const id = req.params.id;
    const getOne = await orderModel.findById(id);
    if (!getOne) {
      return res.status(400).json({ message: 'order not found' });
    }
    return res.status(200).json(getOne);
  },
  getAllOrder: async (req, res) => {
    const getAll = await orderModel.find({});
    return res.status(200).json(getAll);
  },
  //   updateOrder: async (req, res) => {
  //     const id = req.params.id;
  //     const { vpsName, amount } = req.body;

  //     const user = await accountModel.findById(id);
  //     if (!user) {
  //       return res.status(400).json({ message: 'account not found' });
  //     }

  //     const vpsDetail = await vpsModel.findOne({ vpsName });
  //     if (!vpsDetail) {
  //       return res.status(400).json({ message: 'vps not found' });
  //     }
  //     const update = await orderModel.findByIdAndUpdate(id,{
  //         vpsId: vpsDetail._id,
  //         amount,
  //         status: 'pending',
  //       });
  //       if(!update) {
  //         return res.status(400).json({message: 'failed to update'})
  //       }
  //       return res.status(200).json(update)
  //   },
  deleteOrder: async (req, res) => {
    const id = req.params.id;
    const deleteOrder = await orderModel.findByIdAndDelete(id);
    if (!deleteOrder) {
      return res.status(400).json({ message: 'failed to delete' });
    }
    return res.status(200).json({ message: 'deleted' });
  },
};
