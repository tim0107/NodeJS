const productRoute = require('./product.router');
const categoryRoute = require('./category.router');
const accountRoute = require('./account.router');
const cartRoute = require('./cart.router');
const orderRoute = require('./order.router');



console.log('this is from index,js');

module.exports = (app) => {
    app.use('/clothe/products', productRoute);
    app.use('/clothe/categorys', categoryRoute);
    app.use('/clothe/account', accountRoute);
    app.use('/clothe/cart', cartRoute);
    app.use('/clothe/order', orderRoute);

}






