const mongoose = require('mongoose');
const { Schema } = mongoose;

const businessSchema = new Schema({
  name: String,
  owner: String,
});

mongoose.model('business', businessSchema);
