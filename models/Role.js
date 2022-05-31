const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema({
    name: String,
    code: String
});

mongoose.model('role', roleSchema);
