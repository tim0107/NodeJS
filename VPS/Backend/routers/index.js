const bankRoute = require('./bank.route');
const accountRoute = require('./account.route');
const topUpRoute = require('../routers/topUp.router');
const vpsConfigRoute = require('../routers/vpsConfig.route');
const vpsRoute = require('../routers/vps.route')
const orderRoute = require('../routers/order.route')
const authRoute = require('../routers/auth.route')

const errorHanlde = require('../middleware/error.handle');

module.exports = (app) => {
  app.use('/api/account', accountRoute);
  app.use('/api/bank', bankRoute);
  app.use('/api/topup', topUpRoute);
  app.use('/api/vpsConfig', vpsConfigRoute);
  app.use('/api/vps', vpsRoute);
  app.use('/api/order', orderRoute);
  app.use('/api/auth', authRoute);
  app.use(errorHanlde);
};
