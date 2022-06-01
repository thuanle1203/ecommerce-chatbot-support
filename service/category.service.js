'use strict';
const mongoose = require('mongoose');
const Category = mongoose.model('category');

const CategoryService = {

  findAllByData: async (data) => {
    return await Category.find(data);
  },

  findAll: async () => {
    const data = await Category.find();
    return data;
  },

  findById: async () => {
    const data = await Category.findOne({ _id: id });
    return data;
  },

  findByData: async (data) => {
    return await Category.findOne(data);
  },

  create: async (newCategory) => {
    
    // Create a Category
    const category = new Category({
      name: newCategory.name,
      code: newCategory.code,
      bussinessId: newCategory.bussinessId
    });
  
    // Save Category in the database
    const data = await category.save(category);
    return data;
  },

  updateById: async (id, updateData) => {
    const data = await Category.findOneAndUpdate({ _id: id }, updateData);
    return data;
  },

  deleteById: async (id) => {
    return await Category.findByIdAndRemove(id, { useFindAndModify: false });
  },

  deleteAll: async () => {
    return await Category.deleteMany({});
  }
}

module.exports = CategoryService;