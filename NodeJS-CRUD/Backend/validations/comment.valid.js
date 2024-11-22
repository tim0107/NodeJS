const Joi = require('joi');

const createCommentSchema = Joi.object({
    commentName: Joi.string()
    .min(3)
    .message('Username phải từ 3 ký tự')
    .max(16)
    .message('Username không vượt quá 16 ký tự'),
    description: Joi.string()
    .min(3)
    .message('Username phải từ 3 ký tự'),
    
    product_id: Joi.string()
    .length(24)
    .hex()
    .message('product_id phải 24 ký tự và là MongoDB ObjectId'),
});

const updateCommentSchema = Joi.object({
    commentName: Joi.string()
      .min(3)
      .message('Username phải từ 3 ký tự')
      .max(1000)
      .message('Username không vượt quá 1000 ký tự')
      .optional(), 
    
    description: Joi.string()
      .min(3)
      .message('Description phải từ 3 ký tự')
      .optional(), 
    
    product_id: Joi.string()
      .length(24)
      .hex()
      .message('product_id phải 24 ký tự và là MongoDB ObjectId')
      .optional(), 
  });
  
module.exports = {
    createCommentValidate: (comment) => createCommentSchema.validate(comment),
    updateCommentValidate: (comment) => updateCommentSchema.validate(comment),
}