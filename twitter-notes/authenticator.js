var OAuth = require('oauth').OAuth;
var config = require('./config');

// Create the oauth object for accessing Twitter
var oauth = new OAuth(
  config.request_token_url,
  config.access_token_url,
  config.consumer_key,
  config.consumer_secret,
  config.oauth_version,
  config.oauth_callback,
  config.oauth_signature
);

module.exports = {
  get: function(url, access_token, access_token_secret, cb) {
    
  },
  post: function(url, access_token, access_token_secret, body, cb) {
    
  },
  redirectToTwitterLoginPage: function(req, res) {
    
  },
  authenticate: function(req, res, cb) {
    
  }
};