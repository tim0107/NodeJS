const ErrorResponse = require('../helpers/ErrorResponse');

function role(roles = []) {
  if (typeof roles === 'string') {
    roles = [roles];
    
  }

  return (req, res, next) => {
    const account = req.account;
    if (!roles.includes(account.role)) {
      throw new ErrorResponse(403, 'Bạn không có quyền truy cập');

    }

    next();
  };
}

module.exports = role;
