const productRoute = require('./product.router');
const categoryRoute = require('./category.router');
const accountRoute = require('./account.router');
const cartRoute = require('./cart.router');
const orderRoute = require('./order.router');

const errorHandle = require('../middleware/error.handle')


module.exports = (app) => {
    app.use('/api/products', productRoute);
    app.use('/api/categorys', categoryRoute);
    app.use('/api/account', accountRoute);
    app.use('/api/cart', cartRoute);
    app.use('/api/order', orderRoute);


    // every coming request will eventually go through here
    // mean that every error in the route will meet this
    // global met
    app.use(errorHandle)




}






