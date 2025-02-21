const vpsConfigModel = require('../models/vpsConfig.model');

module.exports = {
  createVpsConfig: async (req, res) => {
    const { ram, cpu, gpu, os, storage, price } = req.body;
    const file = req.file;
    const imagePath = 'images/' + file.filename;
    console.log(file);
    
    const vpsCon = await vpsConfigModel.create({
      ram,
      cpu,
      gpu,
      os,
      storage,
      price,
      img: imagePath,
    });
    return res.status(201).json(vpsCon);
  },
  getOneVpsConfig: async (req, res) => {
    const id = req.params.id;
    const getOne = await vpsConfigModel.findById(id);
    return res.status(200).json(getOne);
  },
  getAllVpsConfig: async (req, res) => {
    const getAll = await vpsConfigModel.find({});
    return res.status(200).json(getAll);
  },
  updateVpsConfig: async (req, res) => {
    const { ram, cpu, gpu, os, storage, price, img } = req.body;
    const id = req.params.id;
    const update = await vpsConfigModel.findByIdAndUpdate(
      id,
      { ram, cpu, gpu, os, storage, price, img },
      { new: true },
    );
    if (!update) {
      return res.status(400).json({ message: 'failed' });
    }
    return res.status(200).json(update);
  },
  deleteVpsConfig: async (req, res) => {
    const id = req.params.id;
    const deleteVps = await vpsConfigModel.findByIdAndDelete(id);
    if (!deleteVps) {
      return res.status(400).json({ message: 'failed' });
    }
    return res.status(200).json(deleteVps);
  },
};
