const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

router.use('/recent', (req, res) => {
    /*display the queries collection*/
    mongoose.model('queries').find(function(err, results) {
        if (err)
            return console.error(err);
        res.json(results.slice(results.length - 10, results.length).reverse()); //Show most recent first
    });
});

module.exports = router;
