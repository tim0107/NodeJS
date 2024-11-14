const Joi = require('joi');

const createAccountSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .message('Username phải từ 3 ký tự')
    .max(16)
    .message('Username không vượt quá 16 ký tự'),
  password: Joi.string()
    .pattern(
      // Tối thiểu tám ký tự, ít nhất một chữ cái, một số và một ký tự đặc biệt
      new RegExp(
        '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$',
      ),
    )
    .required()
    .messages({
      'string.pattern.base':
        'Mật khẩu phải chứa tối thiểu tám ký tự, ít nhất một chữ cái, một số và một ký tự đặc biệt.',
    }),
  phone: Joi.string()
    .min(10)
    .message('Phone phải từ 10 ký tự')
    .max(12)
    .message('Phone không vượt quá 12 ký tự')
    .required(),
});

const updateAccountSchema = Joi.object();

module.exports = {
  createAccountValidate: (account) => createAccountSchema.validate(account),
  updateAccountValidate: (account) => updateAccountSchema.validate(account),
};
