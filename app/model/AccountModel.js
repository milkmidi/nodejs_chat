
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: { type: String, unique: true, require: true, index: true },
    email: { type: String, unique: true, require: true, index: true },
    createdDate: { type: Date, default: Date.now },
    lastLogonDate: Date,
    updatedDate: Date,
});

const model = mongoose.model('account', schema);
module.exports = model;
