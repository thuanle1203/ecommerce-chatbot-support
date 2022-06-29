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
    status: Boolean,
    createdAt: { type: Date, default: Date.now },
    approveAt: { type: Date, default: null }
});

mongoose.model('order', orderSchema);
