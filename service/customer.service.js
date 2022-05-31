'use strict';
const mongoose = require('mongoose');
const Customer = mongoose.model('customer');

const CustomerService = {

  findAll: async () => {
    const data = await Customer.find();
    return data;
  },

  findById: async () => {
    const data = await Customer.findOne({ _id: id });
    return data;
  },

  findByData: async (data) => {
    return await Customer.findOne(data);
  },

  create: async (newCustomer) => {

    const checkData = await Customer.findOne({ sessionId: newCustomer.sessionId });

    if (checkData) {
      return checkData;
    }
    
    // Create a Customer
    const customer = new Customer({
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone,
      sessionId: newCustomer.sessionId,
      businessId: newCustomer.businessId,
    });
  
    // Save Customer in the database
    const data = await customer.save(customer);
    return data;
  },

  updateById: async (id, updateData) => {
    const data = await Customer.findOneAndUpdate({ _id: id }, updateData);
    return data;
  },

  deleteById: async (id) => {
    return await Customer.findByIdAndRemove(id, { useFindAndModify: false });
  },

  deleteAll: async () => {
    return await Customer.deleteMany({});
  }
}

module.exports = CustomerService;