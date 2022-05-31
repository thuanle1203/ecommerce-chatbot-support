'use strict';
const mongoose = require('mongoose');
const CustomerService = require('./customer.service');
const ProductService = require('./product.service');
const Cart = mongoose.model('cart');

const CartService = {

  findAll: async () => {
    const data = await Cart.find();
    return data;
  },

  findById: async () => {
    const data = await Cart.findOne({ _id: id });
    return data;
  },

  findByData: async (data) => {
    let customer;

    if (data.sessionId) {
      customer = await CustomerService.findByData({ sessionId: data.sessionId })
      const cart = await Cart.findOne({ customerId: customer._id });

      let fullCart = [];

      for (let item of cart.productList) {
        let fullProduct = await ProductService.findById(item.productId);
        fullProduct.quantity = item.quantity;
        fullCart.push(fullProduct);
      }
      return fullCart;
    } else {
      return await Cart.findOne(data);
    }
  },

  addProductToCart: async (id, data) => {
    return await Cart.updateOne({ _id: id }, { $push: { productList: data }})
  },

  create: async (newCart) => {
    
    // Create a Cart
    const cart = new Cart({
      customerId: newCart.customerId,
      productList: newCart.productList
    });
  
    // Save Cart in the database
    const data = await cart.save(cart);
    return data;
  },

  updateById: async (sessionId, updateData) => {
    const customer = await CustomerService.findByData({ sessionId: sessionId })
    const cart = await Cart.findOne({ customerId: customer._id });

    const productList = updateData.productList.map((product) => {
      return {
        productId: product._id,
        quantity: product.quantity
      }
    })

    const data = await Cart.findOneAndUpdate({ _id: cart._id }, { productList: productList });
    return data;
  },

  deleteById: async (id) => {
    return await Cart.findByIdAndRemove(id, { useFindAndModify: false });
  },

  deleteAll: async () => {
    return await Cart.deleteMany({});
  }
}

module.exports = CartService;