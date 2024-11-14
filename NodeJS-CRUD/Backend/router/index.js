const accountRoute = require('./account.router');
const categoryRoute = require('./category.router')
const productRoute = require('./products.router')


// console.log('this is from index.js')

module.exports = (app) => {
    app.use('/api/accounts', accountRoute);
    app.use('/api/category', categoryRoute);
    app.use('/api/product', productRoute)
}