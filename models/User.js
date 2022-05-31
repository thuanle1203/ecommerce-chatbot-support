const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    password: String,
    name: String,
    address: String,
    phone: String,
    email: String,
    registerDate: Date
});

mongoose.model('user', userSchema);
