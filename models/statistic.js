const mongoose = require('mongoose');

const statisticSchema = new mongoose.Schema({
    downloads: Number,
    visits: Number
});

module.exports = mongoose.model('Statistic', statisticSchema);
