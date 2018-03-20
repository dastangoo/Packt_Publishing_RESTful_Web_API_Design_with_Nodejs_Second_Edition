module.exports = function () {
    var url = require('url');
    var express = require('experess');
    var bodyParser = require('body-parser');
    var querystring = require('querystring');
    var async = require('async');
    var authenticator = require('./authenticator');
    var storage = require('./storage');
    var config = require('./config');
    var app = express();
    
    // Connect to MongoDB
    storage.connect();
    
    // Set the view engine to ejs
    app.set('view engine', 'ejs');
    
    // Add cookie parsing functionality to our Express app
    app.use(require('cookie-parser')());
    
    // Parse JSON body and store result in req.body
    app.use(bodyParser.json());
    
    // Take user to Twitter's login page
    app.get('/auth/twitter', authenticator.redirectToTwitterLoginPage());
    
    // This is the callback url that the user is redirected to a 
    app.get(url.parse(config.oauth_callback).path, function(req, res) {
      
    });
    
    // Main page handler
    app.get('/', function(req, res) {
    
    });
    
    function renderMainPageFromTwitter(req, res) {
      
    }
    
    // Show the login page
    app.get('/login', function(req, res) {
      
    });
    
    function ensureLoggedIn(req, res, next) {
      
    }
    
    // Get notes for a friend
    app.get('/friends/:uid/notes', ensureLoggedIn, function(req, res) {
      
    });
    
    // Add a new note to a friend
    app.post('/friends/:uid/notes', ensureLoggedIn, function(req, res) {
      
    });
    
    // Update a note
    app.put('/friends/:uid/notes/:noteid', ensureLoggedIn, function(req, res) {
      
    });
    
    // Delete a note
    app.delete('/friends/:uid/notes/:noteid', ensureLoggedIn, function(req, res) {
      
    });
    
    // Serve static files in public directory
    app.use(express.static(__dirname + '/public'));
    
    // Start listening for requests
    app.listen(config.port, function() {
      
    });
}
