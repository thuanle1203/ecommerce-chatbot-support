const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    productList: [],
    customerId: String,
    paymentMethod: String,
    amount: Number,
	currency: String,
    confirm: Boolean
});

mongoose.model('order', orderSchema);
