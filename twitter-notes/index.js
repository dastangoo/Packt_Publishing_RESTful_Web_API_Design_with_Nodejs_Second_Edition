var url = require('url');
var express = require('express');
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
app.get('/auth/twitter', authenticator.redirectToTwitterLoginPage);

// This is the callback url that the user is redirected to a 
app.get(url.parse(config.oauth_callback).path, function(req, res) {
  authenticator.authenticate(req, res, function(err) {
    if (err) {
      console.log(err);
      res.sendStatus(401);
    } else {
      res.send("Authentication Successful");
    }
  });
});

app.get('/tweet', function(req, res) {
  if (!req.cookies.access_token || !req.cookies.access_token_secret) {
    return res.sendStatus(401);
  }
  
  authenticator.post('https://api.twitter.com/1.1/statuses/update.json', 
    req.cookies.access_token, req.cookies.access_token_secret,
    {
      status: "Hello Twitter REST API"
    },
    function(error, data) {
      if (error) {
        return res.status(400).send(error);
      }
      
      res.send("Tweet successful!");
    }
  );
});

// Search for tweets
app.get('/search', function(req, res) {
  if (!req.cookies.access_token || !req.cookies.access_token_secret) {
    return res.sendStatus(401);
  }
  
  authenticator.get('https://api.twitter.com/1.1/search/tweets.json?' + querystring.stringify({ q: 'French' }),
    req.cookies.access_token, req.cookies.access_token_secret,
    function(error, data) {
      if (error) {
        return res.status(400).send(error);
      }
      
      res.send(data);
    }
  );
});

// List friends
app.get('/friends', function(req, res) {
  if (!req.cookies.access_token || !req.cookies.access_token_secret) {
    return res.sendStatus(401);
  }
  
  var url = 'https://api.twitter.com/1.1/friends/list.json';
  if (req.query.cursor) {
    url += '?' + querystring.stringify({ cursor: req.query.cursor });
  }
});


// List all friends
app.get('/allfriends', function(req, res) {
  async.waterfall([
    // Get friends IDs
    function(cb) {
      var cursor = -1;
      var ids = [];
      
      // Get IDs by traversing the cursored collection
      async.whilst(function() {
        return cursor != 0;
      }, function(cb) {
        authenticator.get('https://api.twitter.com/1.1/friends/ids.json?' + querystring.stringify({ q: 'French' }),
          req.cookies.access_token, req.cookies.access_token_secret, 
          function(error, data) {
            if (error) {
              return res.status(400).send(error);
            }
            data = JSON.parse(data);
            cursor = data.next_cursor_str;
            ids = ids.concat(data.ids);
            
            cb();
          });
    }, function(error) {
      if (error) {
        return res.status(400).send(error);
      }
      
      cb(null, ids);
    });
  },
  // Get friend's data
  function(ids, cb) {
    // Returns up to 100 ids starting from 100*i
    var getHundredthIds = function(i) {
      return ids.slice(100*i, Math.min(ids.length, 100*(i+1)));
    }
    
    var requestsNeeded = Math.ceil(ids.length/100);
    
    async.times(requestsNeeded, function(n, next) {
      var url = 'https://api.twitter.com/1.1/users/lookup.json?' + querystring.stringify({ q: 'French' });
      authenticator.authenticate(url, 
        req.cookies.access_token, req.cookies.access_token_secret, 
        function(error, data) {
          if (error) {
            return res.status(400).send(error);
          }
          
          var friends = JSON.parse(data);
          next(null, friends);
        });
    })
  }, function(error, friends) {
    // Flatten friends array
    friends = friends.reduce(function(previousValue, currentValue) {
      return previousValue.concat(currentValue);
    }, []);
    
    // Sort the friends alphabetically by name
    friends.sort(function(a, b) {
      return a.name.toLowerCase().localCompare(b.name.toLowerCase());
    });
    
    res.send(friends);
  }
  ]);
});
// Main page handler
app.get('/', function(req, res) {

});
// 
function renderMainPageFromTwitter(req, res) {

}
// 
// // Show the login page
app.get('/login', function(req, res) {

});
// 
function ensureLoggedIn(req, res, next) {

}
// 
// Get notes for a friend
app.get('/friends/:uid/notes', ensureLoggedIn, function(req, res) {

});
// 
// // Add a new note to a friend
app.post('/friends/:uid/notes', ensureLoggedIn, function(req, res) {

});
// 
// // Update a note
app.put('/friends/:uid/notes/:noteid', ensureLoggedIn, function(req, res) {

});
// 
// // Delete a note
app.delete('/friends/:uid/notes/:noteid', ensureLoggedIn, function(req, res) {

});
// 
// Serve static files in public directory
app.use(express.static(__dirname + '/public'));

// Start listening for requests
app.listen(config.port, function() {
  console.log("Listening on port " + config.port);
});
