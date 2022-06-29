const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema({
  infor: Object,
  address: [],
  sessionId: String,
  businessId: String,
});

mongoose.model('customer', customerSchema);
