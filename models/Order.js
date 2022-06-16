const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    productList: [],
    customerId: String,
    paymentMethod: String,
	currency: String,
    confirm: Boolean,
    payment: Object
});

mongoose.model('order', orderSchema);
