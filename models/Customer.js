const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  address: Object,
  sessionId: String,
  businessId: String,
});

mongoose.model('customer', customerSchema);
