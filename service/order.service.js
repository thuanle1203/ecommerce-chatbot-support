'use strict';
const mongoose = require('mongoose');
const CartService = require('./cart.service');
const CustomerService = require('./customer.service');
const ProductService = require('./product.service');
const Order = mongoose.model('order');
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)

const OrderService = {

  findAll: async () => {
    const data = await Order.find();
    return data;
  },

  findDetailById: async (id) => {
    const order = await Order.findOne({ _id: id });

    const customer = await CustomerService.findByData({ _id: order.customerId });

    let fullProductList = [];

    for (let item of order.productList) {
      let fullProduct = await ProductService.findById(item.productId);
      fullProduct.quantity = item.quantity;
      fullProductList.push(fullProduct);
    }

    order.productList = fullProductList

    return {
      fullOrder: order,
      customer: customer
    };
  },

  findByData: async (data) => {
    let customer;

    if (data.sessionId && data.businessId) {

      customer = await CustomerService.findByData({ $and: [{ sessionId: data.sessionId  }, { businessId: data.businessId }]});

      const Order = await Order.findOne({ customerId: customer._id });

      let fullOrder = [];

      for (let item of Order.productList) {
        let fullProduct = await ProductService.findById(item.productId);
        fullProduct.quantity = item.quantity;
        fullOrder.push(fullProduct);
      }

      return fullOrder;
    } else   {
      return await Order.find(data);
    }
  },

  create: async (sessionId, businessId, newOrder) => {
    let { paymentMethod } = newOrder

    console.log(newOrder)

    const cart = await CartService.findByData({ businessId: businessId, sessionId: sessionId });
    const customer = await CustomerService.findByData({ businessId: businessId, sessionId: sessionId });

    let confirm = false

    const address = newOrder.currentAddress ? customer.address[newOrder.currentAddress] : customer.address[customer.address.length - 1] 

    try {

      // Make payment if it's choose payment method is prepayment
      if (newOrder.status === 'COMPLETED') {
        confirm = true;
      }
      
      // Create a Order
      const order = new Order({
        customerId: customer._id,
        productList: cart.map(product => { 
          return {
            productId: product._id, 
            quantity: Number(product.quantity)
          } 
        }),
        address: address,
        paymentMethod: paymentMethod,
        payment: newOrder.payment || null,
        confirm: confirm,
        currency: 'USD',
        businessId: businessId,
        status: false
      });
    
      // Save Order in the database
      const data = await order.save(order);

      if (data) {
        CartService.deleteBySessionId({ sessionId: sessionId, businessId: businessId })
      }

      return {
        success: true,
        order: order
      };

    } catch (error) {
      console.log("Error", error)
      return {
        message: "Payment failed",
        success: false
      }
    }
  },

   updateById: async (sessionId, businessId, updateData) => {

    const productList = updateData.productList.map((product) => {
      return {
        productId: product._id,
        quantity: product.quantity
      }
    })

    const customer = await CustomerService.findByData({ $and: [{ sessionId: sessionId }, { businessId: businessId }]});

    const data = await Order.findOneAndUpdate({ customerId: customer._id }, { productList: productList });
    return data;
  },

  deleteById: async (id) => {
    return await Order.findByIdAndRemove(id, { useFindAndModify: false });
  },

  deleteAll: async () => {
    return await Order.deleteMany({});
  }
}

module.exports = OrderService;