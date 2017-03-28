const mongoose = require('mongoose');

const config = require('./config.js');

// configuration ===============================================================
module.exports = function () {
    mongoose.Promise = global.Promise;
    console.log(config.db);
    mongoose.connect(config.db); // connect to our database
};
