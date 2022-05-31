const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
  customerId: String,
  productList: [],
});

mongoose.model('cart', cartSchema);
