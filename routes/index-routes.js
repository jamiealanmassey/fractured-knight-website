const mongoose = require('mongoose');
const Statistic = mongoose.model('Statistic');
const express = require('express');
const router = express.Router();

function requestDownload(request, response) {
    Statistic.updateOne({}, { $inc: { downloads: 1 } }, { upsert: true })
             .exec(function(error, statistic) {
                 if (error) {
                     console.log(error);
                     response.redirect('/');
                 } else {
                     response.redirect('/fractured-knight.zip');
                 }
             });
}

router.get('/download', requestDownload);
router.get('/', function(request, response) {
    Statistic.findOne({})
        .exec(function(error, statistics) {
            if (error) {
                console.log(JSON.stringify(statistics, null, '\t'));
            } else {
                if (statistics === null) {
                    statistics = { downloads: 0 };
                }
                
                console.log(statistics);
                console.log(statistics.downloads);
                response.render('index', { statistics: statistics });
            }
        });
});

module.exports = router;
