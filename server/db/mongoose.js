const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO, {useNewUrlParser: true }).then(() => {
    console.log(`Mongo Connected to ${process.env.MONGO}`);
});

module.exports = { mongoose };