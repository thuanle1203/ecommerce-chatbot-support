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

    if (data.sessionId && data.businessId) {

      customer = await CustomerService.findByData({ $and: [{ sessionId: data.sessionId  }, { businessId: data.businessId }]});

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

  addProductToCart: async (id, productList) => {
    return await Cart.findOneAndUpdate({ _id: id }, { productList: productList })
  },

  create: async (newCart) => {
    
    // Create a Cart
    const cart = new Cart({
      customerId: newCart.customerId,
      productList: newCart.productList,
    });
  
    // Save Cart in the database
    const data = await cart.save(cart);
    return data;
  },

   updateById: async (sessionId, businessId, updateData) => {

    const productList = updateData.productList.map((product) => {
      return {
        productId: product._id,
        quantity: product.quantity
      }
    })

    const customer = await CustomerService.findByData({ $and: [{ sessionId: sessionId }, { businessId: businessId }]});

    const data = await Cart.findOneAndUpdate({ customerId: customer._id }, { productList: productList });
    return data;
  },

  deleteById: async (id) => {
    return await Cart.findByIdAndRemove(id, { useFindAndModify: false });
  },

  deleteBySessionId: async (data) => {
    const customer = await CustomerService.findByData({ $and: [{ sessionId: data.sessionId  }, { businessId: data.businessId }]});
    
    return await Cart.deleteOne({ customerId: customer._id }); 
  },

  deleteAll: async () => {
    return await Cart.deleteMany({});
  }
}

module.exports = CartService;