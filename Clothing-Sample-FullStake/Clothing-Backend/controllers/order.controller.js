const orderModel = require('../models/order.model');
const cartModel = require('../models/cart.model');


module.exports = {
    createOrder: async (req,res) => {
        const body = req.body;
        console.log(req.body);
        console.log('rererer')
        
        const create = await orderModel.create(body);
        await cartModel.findByIdAndUpdate(body.cart_id, {isOrder : true})
        return res.status(201).json(create)
    },
    getAllOrder: async (req,res) => {
        const customer = req.query.customer;
        const address = req.query.address;
        const phone = req.query.phone;
        const status = req.query.status;

        const body_query = {};

        if(customer) {
            body_query.customer = customer;
        }

        if(address) {
            body_query.address = address;
        }

        if(phone) {
            body_query.phone = phone;
        }

        if(status) {
            body_query.status = status;
        }

        const order = await orderModel.find(body_query).populate({
            path: 'cart_id',
            populate: [
                {
                    path: 'account_id'
                },
                {
                    path: 'items.product'
                }
            ]
        })


        return res.status(200).json(order)
    },
    getOrderByAccount: async (req,res) => {
        const account_id = req.params.account_id;
        console.log(account_id)
        const carts = await cartModel.find({account_id : account_id, isOrder: true})
        console.log(carts)
        const orders = []

        for( let cart of carts) {
            const order = await orderModel.findOne({
                cart_id: cart._id
            }).populate({
                path: 'cart_id',
                populate: [
                    {
                        path: 'account_id'
                    },
                    {
                        path: 'items.product'
                    }
                ]
            })
            orders.push(order)
        }
        return res.status(200).json(orders)
    }
}