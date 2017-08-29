const express         = require('express');
const routerAPI       = express.Router();
var passport          = require('passport');
var TwitterStrategy   = require('passport-twitter').Strategy;
var cors              = require('cors');
var session             = require('express-session');
var MemoryStore       = session.MemoryStore;
var memoryTemp        = new MemoryStore();
//Set Cors to avoid problems
routerAPI.use(cors())

//Serialize and des
passport.serializeUser(function(user, done) {
  done(null, user.id);
  memoryTemp['iduser'] = user.id;
});

passport.deserializeUser(function(id, done) {
    done(id);
    memoryTemp['iduser'] = id;
});

//Request information for Twitter
//http://localhost:3000/api/auth/twitter/callback
passport.use(new TwitterStrategy({
    consumerKey: process.env.FREECODECAMPTWITTERKEYNIGHTOUT,
    consumerSecret: process.env.FREECODECAMPTWITTERSECRETNIGHTOUT,
    callbackURL: "http://localhost:3000/api/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    done(null, profile);
  }
));

///////// AUTH for TWITTER

//Twitter Handlers
routerAPI.get('/auth/twitter', passport.authenticate('twitter'));

routerAPI.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/' }));

//Check Session of user.
routerAPI.get('/users/session/',function(req, res){
  console.log("running /users/session/ ", memoryTemp);
  if(memoryTemp['iduser'] !== undefined){
    res.send({
      'userid': memoryTemp['iduser'],
      'locationuser': memoryTemp['locationuser'],
      'placesuser': memoryTemp['placesuser']
    })
    res.end();
  } else {
    res.send({})
    res.end();
  }
});

// User is not logged in, save current state of the app
routerAPI.post('/users/savesession/',function(req, res){

  console.log("Request to save information for user")
  if(req.body.location !== undefined && req.body.places !== undefined){

      memoryTemp['locationuser'] = req.body.location;
      memoryTemp['placesuser'] = req.body.places;
      console.log(memoryTemp);      
      res.send({'status': 'success'})
      res.end();
  } else {
        res.send({'status': 'error'})
        res.end();
  }

});

/* Catch all for the API on get that is not declared */
routerAPI.get('*', (req, res) => {
  res.send('API to fetch information if functional, read documentation.');
  res.end();
});

module.exports = routerAPI;
