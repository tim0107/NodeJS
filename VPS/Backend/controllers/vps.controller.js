const { config } = require('dotenv');
const vpsModel = require('../models/vps.model');
const vpsConfigModel = require('../models/vpsConfig.model');

module.exports = {
  createVps: async (req, res) => {
    const { vpsName, os } = req.body;

    const osDetail = await vpsConfigModel.findOne({ os });
    if (!osDetail) {
      return res.status(400).json({ message: 'Os not match' });
    }

    console.log(osDetail);

    const vps = await vpsModel.create({
      vpsName,
      os,
      status: 'inactive',
      config_id: osDetail._id,
    });
    return res.status(200).json(vps);
  },
  getOneVps: async (req, res) => {
    const id = req.params.id;

    const getOne = await vpsModel.findById(id);
    return res.status(200).json(getOne);
  },
  getAllVps: async (req, res) => {
    const getAll = await vpsModel.find({});
    return res.status(200).json(getAll);
  },
  updateVps: async (req, res) => {
    const id = req.params.id;
    const { vpsName, os } = req.body;

    const osDetail = await vpsConfigModel.findOne({ os });
    if (!osDetail) {
      return res.status(400).json({ message: 'Os not match' });
    }

    const update = await vpsModel.findByIdAndUpdate(
      id,
      {
        vpsName,
        os: osDetail.os,
        status: 'inactive',
        config_id: osDetail._id,
      },
      { new: true },
    );
    if (!update) {
      return res.status(400).json({ message: 'failed' });
    }
    return res.status(200).json(update);
  },
  changeVpsStatus: async (req, res) => {
    const vpsId = req.params.id;

    const vps = await vpsModel.findById(vpsId);
    if (!vps) {
      res.status(400).json({ message: 'vps not found' });
    }

    if (vps.status === 'active') {
      vps.status = 'inactive';
    } else if(vps.status === 'inactive') {
    vps.status = 'active';
    }

    await vps.save();


    return res.status(200).json({status: vps.status});
  },
  deleteVps: async (req, res) => {
    const id = req.params.id;
    const deleteVps = await vpsModel.findByIdAndDelete(id);
    if (!deleteVps) {
      return res.status(400).json({ message: 'failes' });
    }
    return res.status(200).json({ message: 'deleted' });
  },
};
