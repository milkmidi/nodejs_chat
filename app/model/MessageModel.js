const mongoose = require('mongoose');

const DEFAULT_FIELD = 'name message chat who created_date';
const schema = mongoose.Schema({
    message: { type: String, index: true },
    // name: { type: String },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'chat', index: true },
    who: { type: mongoose.Schema.Types.ObjectId, ref: 'account', index: true },
    created_date: { type: Date, default: Date.now },
});

schema.statics.findWithRef = function (options, cb) {
    return this.find(options, DEFAULT_FIELD)
        .populate({ path: 'who', select: 'name' }).then(cb);
};

const model = mongoose.model('message', schema);
model.DEFAULT_FIELD = DEFAULT_FIELD;


module.exports = model;
