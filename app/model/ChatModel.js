
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: { type: String, unique: true, require: true, index: true },
    description: { type: String, index: true },
    createdDate: { type: Date, default: Date.now },
    createUser: { type: mongoose.Schema.Types.ObjectId, ref: 'account', index: true },
    updatedDate: Date,
    // messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'message', index: true }],
});

const model = mongoose.model('chat', schema);
module.exports = model;
