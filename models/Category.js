const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: String,
  code: String,
  bussinessId: String
});

mongoose.model('category', categorySchema);
