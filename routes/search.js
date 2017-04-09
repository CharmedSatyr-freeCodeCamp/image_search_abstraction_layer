const express = require('express'),
    router = express.Router(),
    Queries = require('../models/input.js'),
    mongoose = require('mongoose');
require('dotenv').config();

const GoogleSearch = require('google-search'),
    googleSearch = new GoogleSearch({key: process.env.API_KEY, cx: process.env.CX});

//Automatically save search to DB then move to next route
router.use('/search/:input', (req, res, next) => {
    let qs = new Queries({input: req.params.input});
    qs.save(function(err, response) {
        if (err)
            return console.error(err);
        console.log('Saving:', response);
    });
    next();
});

//Show results of search
router.get('/search/:input', (req, res, next) => {
    let group,
        mtch,
        obj;

    googleSearch.build({
        q: req.params.input, //search terms
        start: req.query.offset || 1, //starting index for the results
        fileType: "*", //
        gl: "us", //geolocation,
        lr: "lang_en",
        num: 10, // Number of search results to return between 1 and 10, inclusive //20 tops according to the Google documentation
        filter: 0, //0 is enabled; 1 is disabled
        siteSearch: "" // Restricts results to URLs from a specified site
    }, function(error, response) {

        group = [];

        for (let x in response.items) {
            mtch = response.items[x];

            obj = {
                url: mtch.pagemap.imageobject[0].url,
                snippet: mtch.snippet,
                thumbnail: mtch.pagemap.cse_thumbnail, //Not every result has a thumbnail, so [0] breaks the search
                context: mtch.link
            }
            group.push(obj);
        }
        res.json(group);
    });
});

module.exports = router;
