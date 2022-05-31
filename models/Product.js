const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: String,
    quantity: String,
    price: Number,
    description: String,
    image: String,
    link: String,
    header: String,
    businessId: String,
    categoryId: []
});

mongoose.model('product', productSchema);
