const categoryModel = require('../models/category.model');

module.exports = {
  createCategory: async (req, res) => {
    try {
        const body = req.body;
    const category = await categoryModel.create(body);
    return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    
  },
  getCategoryById: async (req, res) => {
    const id = req.params.id;

    const getAccount = await categoryModel.findById(id);
    return res.status(200).json(getAccount);
  },
  getCategory: async (req, res) => {
    const { name, number } = req.query;

    const bodyQuery = {};
    if (name) {
      bodyQuery.name = {
        $regex: `.*${name}.*`,
        $options: 'i',
      };
    }

    if (number) {
      bodyQuery.number = number;
    }

    const findByQuery = await categoryModel.find(bodyQuery);
    return res.status(200).json(findByQuery);
  },
  updateCategory: async (req, res) => {
    try {
      const id = req.params.id;
      const { name, image, order } = req.body;
      const update = await categoryModel.findByIdAndUpdate(
        id,
        { name, image, order },
        { new: true },
      );
      console.log(id);
      if (update) {
        return res.status(200).json({ message: ' updated' });
      } else {
        return res.status(400).json({ message: 'not found' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  deleteCategory: async (req,res) => {
    const id = req.params.id;

    const deleted = await categoryModel.findByIdAndDelete(id);
    
    if(!deleted) {
        return res.status(400).json({message: 'account not found'});
    }
    return res.status(200).json({message: 'account deleted'})
  }
};
