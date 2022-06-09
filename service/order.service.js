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

  findById: async () => {
    const data = await Order.findOne({ _id: id });
    return data;
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
    } else {
      return await Order.findOne(data);
    }
  },

  create: async (sessionId, businessId, newOrder) => {

    let { id, paymentMethod } = newOrder

    let confirm = false

    const cart = await CartService.findByData({ businessId: businessId, sessionId: sessionId });
    const customer = await CustomerService.findByData({ businessId: businessId, sessionId: sessionId });

    let amount = 0

    cart.map((productInCart) => {
      amount += productInCart.price * productInCart.quantity
    })

    console.log(newOrder);

    try {

      // Make payment if it's choose payment method is prepayment
      if (id != 0) {
        const payment = await stripe.paymentIntents.create({
          amount,
          currency: "USD",
          payment_method: id,
          confirm: true
        })
        confirm = true;
        console.log(payment);
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
        paymentMethod: paymentMethod,
        currency: 'USD',
        amount: amount,
        confirm: confirm
      });
    
      // Save Order in the database
      const data = await order.save(order);

      if (data) {
        CartService.deleteBySessionId({ sessionId: sessionId, businessId: businessId })
      }

      return {
        success: true,
        order: data
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