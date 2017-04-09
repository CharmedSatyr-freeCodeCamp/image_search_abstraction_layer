/*
* HELPFUL LINKS
* Get a Google API Key from https://developers.google.com/custom-search/json-api/v1/overview
* Manage Key: https://console.developers.google.com/apis/credentials
* Create/manage a Custom Google Search: https://cse.google.com/cse/
* NPM Package used here: https://www.npmjs.com/package/google-search
*/

const express = require('express'),
    app = express(),
    path = require('path'),
    search = require('./routes/search'),
    recent = require('./routes/recent'),
    mongoose = require('mongoose'),
    mongoLink = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/image_search_abstraction_layer',
    db = mongoose.connection,
    port = process.env.PORT || 8080;
require('dotenv').config();

/*
//Supposedly this function would load all our models if we had a lot
const fs = require('fs');
fs.readdirSync(path.join(__dirname + '/models')).forEach(function(filename) {
    if (~ filename.indexOf('.js'))
        require(path.join(__dirname + '/models/' + filename));
});
*/

mongoose.connect(mongoLink);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');

    app.use('/', express.static(path.join(__dirname + '/views')));
    app.get('/search/:input', search);
    app.get('/recent', recent);
    app.listen(port, () => {
        console.log('Listening on port', port)
    });

});
