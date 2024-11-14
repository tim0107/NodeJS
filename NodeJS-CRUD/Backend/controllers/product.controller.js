const productModel = require('../models/product.model');
const categoryModel = require('../models/category.model');
const { PER_PAGE } = require('../constant/paging');

module.exports = {
  createProduct: async (req, res) => {
    try {
      const { name, image, price, category_id, description } = req.body;
      const categoryExits = await categoryModel.findById(category_id);
      if (!categoryExits) {
        return res.status(400).json({ message: 'category id not exits' });
      }

      const products = await productModel.create({
        name,
        image,
        price,
        category_id,
        description,
      });
      return res.status(201).json(products);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getProducts: async (req, res) => {
    try {
      const { name, category_id, from_price, to_price, page = 1 } = req.query;
      const bodyQuery = {};

      if (category_id) {
        bodyQuery.category_id = category_id;
      }

      if (name) {
        bodyQuery.name = {
          $regex: `.*${name}.*`,
          $options: 'i',
        };
      }

      if (from_price && to_price) {
        bodyQuery.price = {
          $gte: from_price,
          $lte: to_price,
        };
      }
      const filterProducts = await productModel
        .find(bodyQuery)
        .populate('category_id')
        .limit(PER_PAGE)
        .skip(PER_PAGE * page - PER_PAGE)
        .sort({ createdAt: -1 });

      const count = await productModel.countDocuments(bodyQuery);

      return res.status(200).json({
        page: page,
        total_page: Math.ceil(count / PER_PAGE),
        data: filterProducts,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getProductById: async (req, res) => {
    try {
      const id = req.params.id;
      const findId = await productModel.findById(id);
      return res.status(200).json(findId);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const { name, image, price, category_id, description } = req.body;

      const isCateExits = await categoryModel.findById(category_id);
      if (!isCateExits) {
        return res.status(400).json({ message: 'category_id not exits' });
      }
      const update = await productModel.findByIdAndUpdate(
        id,
        { name, image, price, category_id, description },
        { new: true },
      );
      if (update) {
        return res.status(200).json(update);
      } else {
        return res.status(400).json({ message: 'failed' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  deleteProducts: async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await productModel.findByIdAndDelete(id);
      if (deleted) {
        return res.status(200).json(deleted);
      } else {
        return res.status(500).json({ message: 'failed' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
