// Get dependencies and prepare Express
const express 			= require('express');
const bodyParser 		= require('body-parser');
const app 			  	= express();
var passport          	= require('passport');
var TwitterStrategy   	= require('passport-twitter').Strategy;
var cors              	= require('cors');
var session           	= require('express-session');
var MemoryStore         = session.MemoryStore;

// ROUTES
var api  = require('./routes/api');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(__dirname + '/dist'));

///////// SESSION
// Can use any kind of secret word, i jus used my API key for google
// https://github.com/expressjs/session
app.use(session({ 
  secret: process.env.APIKEYSEARCHGOOGLE,
  cookie: { secure: false, maxAge: 60000 }, 
  resave: true,
  store: new MemoryStore(),
  saveUninitialized: true
}));

//Set passport and cors on the app
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  //console.log(req.user);
  res.sendFile(__dirname + '/dist/index.html');
});

// Get port from environment and store in Express.
const port = process.env.PORT || '3000';

// Run Listener for App.
var listener = app.listen(port, function(){
	console.log("APP Listening at port: ", listener.address().port);
});