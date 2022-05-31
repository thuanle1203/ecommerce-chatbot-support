const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: String,
  code: String
});

mongoose.model('category', categorySchema);
