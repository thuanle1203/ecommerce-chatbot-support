const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    productList: [],
    customerId: String,
    paymentMethod: String,
	currency: String,
    confirm: Boolean,
    payment: Object,
    businessId: String,
    address: Object,
    status: Boolean
});

mongoose.model('order', orderSchema);
