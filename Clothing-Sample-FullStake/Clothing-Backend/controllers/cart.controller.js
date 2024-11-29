const cartModel = require('../models/cart.model');

module.exports = {
  addToCart: async (req, res) => {
    try {
      const { account_id, product_id, quantity } = req.body;

      if (!account_id || !product_id) {
        return res.status(400).json({ message: 'account_id, product_id are required' });
      }

      let cart = await cartModel.findOne({
        account_id,
        isOrder: false,
      });

      if (!cart) {
        cart = await cartModel.create({
          account_id,
          items: [{ product: product_id, quantity: quantity || 1 }],
        });
      } else {
        const Item = cart.items.find(
          (item) => item.product.toString() === product_id
        );

        if (Item) {
            Item.quantity ++ || 1;
        } else {
          
          cart.items.push({ product: product_id, quantity: quantity || 1 });
        }

        await cart.save();
      }

      return res.status(201).json(cart);
    } catch (error) {
      console.error('failed', error.message);
      return res.status(500).json({ message: error.message });
    }
  },
  getCart : async (req,res) => {
    const account_id = req.params.account_id;
    const cart = await cartModel.findOne({
        isOrder: false,
        account_id : account_id,
    }).populate("items.product")
    return res.status(200).json(cart || {})
  },
  deleteCart: async (req,res) => {
    const account_id = req.params.account_id;
    const product_id = req.params.product_id;
    let cart = await cartModel.findOne({
      isOrder: false,
      account_id: account_id,
    })
    const items = cart.items.filter((item) => item.product != product_id);
    cart = await cartModel.findByIdAndUpdate(cart._id, {items}, {new: true})
    return res.status(200).json(cart);
  },
  updateCart: async (req,res) => {
    const account_id = req.params.account_id;
    const product_id = req.params.product_id;
    const quantity = req.body.quantity;
    let cart = await cartModel.findOne({
      isOrder: false,
      account_id: account_id,
    });
    const items = cart.items.map((v) => {
      if( v._id == product_id){
        v.quantity = quantity
      }
      return v
    })
    cart = await cartModel.findByIdAndUpdate(cart._id, {items}, {new: true})
    return res.status(200).json(cart);
  }
};
