const commentModel = require('../models/comment.model');
const productModel = require('../models/product.model');
const {
  createCommentValidate,
  updateCommentValidate,
} = require('../validations/comment.valid');

module.exports = {
  
    createComment: async (req, res) => {
      try {
        const { commentName, description, product_id } = req.body;
  
        const productExists = await productModel.findById(product_id);
        if (!productExists) {
          return res.status(400).json({ message: 'Product ID does not exist' });
        }
  
        const { value, error } = createCommentValidate({
          commentName,
          description,
          product_id,
        });
        if (error) {
          return res.status(400).json({
            statusCode: 400,
            message: error.details.map((e) => e.message).join(', '),
          });
        }
  
        
        const comment = await commentModel.create(value); 
        return res.status(201).json(comment);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    },
  
    getComment: async (req, res) => {
      try {
        const { commentName, product_id, page, limit } = req.query;
  
        const bodyQuery = {};
        if (product_id) bodyQuery.product_id = product_id;
        if (commentName) {
          bodyQuery.commentName = {
            $regex: `.*${commentName}.*`,
            $options: 'i',
          };
        }
  
       
  
      
        const filterComment = await commentModel
          .find(bodyQuery)
          .populate('product_id')
          .sort({ createdAt: -1 })
         
        return res.status(200).json(filterComment);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    },
  
  getComment: async (req, res) => {
    try {
      const { commentName, product_id } = req.query;
      const bodyQuery = {};

      if (product_id) {
        bodyQuery.product_id = product_id;
      }

      if (commentName) {
        bodyQuery.commentName = {
          $regex: `.*${commentName}.*`,
          $options: 'i',
        };
      }

      const filterComment = await commentModel
        .find(bodyQuery)
        .populate('product_id')
        .sort({ createdAt: -1 });

      return res.status(200).json(filterComment);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getCommentById: async (req, res) => {
    try {
      const id = req.params.id;
      const findId = await commentModel.findById(id);
      return res.status(200).json(findId);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateComment: async (req, res) => {
    try {
      const id = req.params.id;
      const { commentName, description, product_id } = req.body;

      const isProExits = await productModel.findById(product_id);
      if (!isProExits) {
        return res.status(400).json({ message: 'product_id not exits' });
      }

      const { value, error } = createCommentValidate({
        commentName,
        description,
        product_id,
      });
      if (error) {
        return res.status(400).json({
          statusCode: 400,
          message: error.details.map((e) => e.message).join(', '),
        });
      }
      const update = await commentModel.findByIdAndUpdate(
        id,
        value,
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
  deleteComment: async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await commentModel.findByIdAndDelete(id);
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
