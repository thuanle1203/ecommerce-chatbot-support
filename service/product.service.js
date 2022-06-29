'use strict';
const mongoose = require('mongoose');
const CategoryService = require('./category.service');
const Product = mongoose.model('product');

const ProductService = {

  findAll: async () => {
    const data = await Product.find();
    return data;
  },

  findById: async (id) => {
    const data = await Product.findOne({ _id: id });
    return data;
  },

  findByData: async (data) => {
    const result = await Product.find(data);
    return result;
  },

  findByCategoryName: async (cateName, businessId) => {
    const category = await CategoryService.findByData({ $and: [{ name: cateName }, { bussinessId: businessId } ] });

    const products = await Product.find({ businessId: businessId });

    return products.filter(product => product.categoryId.includes(category._id));
  },

  create: async (newProduct) => {
    // Create a Product
    const product = new Product({
      name: newProduct.name,
      quantity: newProduct.quantity,
      price: newProduct.price,
      description: newProduct.description,
      image: newProduct.image,
      link: newProduct.link,
      header: newProduct.header,
      categoryId: newProduct.categoryId,
      businessId: newProduct.businessId
    });
  
    // Save Product in the database
    const data = await product.save(product);
    return data;
  },

  updateById: async (id, updateData) => {
    const data = await Product.findOneAndUpdate({ _id: id }, updateData);
    return data;
  },

  deleteById: async (id) => {
    return await Product.findByIdAndRemove(id, { useFindAndModify: false });
  },

  deleteAll: async () => {
    return await Product.deleteMany({});
  },

  searchByName: async (dataInput, businessId) => {
    return await Product.find({ $and: [{ name: { $regex: dataInput, $options: 'i' } }, { businessId: businessId }]})
  }
}

module.exports = ProductService;