const categoryModel = require('../models/category.model');

module.exports = {
  createCategory: async (req, res) => {
    const body = req.body;
    const category = await categoryModel.create(body);
    return res.status(201).json(category);
  },
  getCategoryById: async (req, res) => {
    const id = req.params.id;

    const getAccount = await categoryModel.findById(id);
    return res.status(200).json(getAccount);
  },
  getCategories: async (req, res) => {
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
    const id = req.params.id;
    const { categoryName, description } = req.body;
    const update = await categoryModel.findByIdAndUpdate(
      id,
      { categoryName, description },
      { new: true },
    );
    console.log(id);
    if (update) {
      return res.status(200).json({ message: ' updated' });
    } else {
      return res.status(400).json({ message: 'not found' });
    }
  },
  deleteCategory: async (req, res) => {
    const id = req.params.id;

    const deleted = await categoryModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(400).json({ message: 'category not found' });
    }
    return res.status(200).json({ message: 'category deleted' });
  },
};
