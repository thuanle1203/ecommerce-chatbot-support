const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    productList: [],
    customerId: String,
    businessId: String
});

mongoose.model('order', orderSchema);
