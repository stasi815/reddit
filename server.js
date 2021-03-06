// require dotenv for password encryption
require("dotenv").config();

// Set db
require('./data/reddit-db');

// Require Libraries
const express = require('express');

// Auth requirements
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");

// App Setup
const app = express();

app.use(cookieParser());

// Static Files
app.use(express.static('public'));

// Server port
const port = 3000;

// Middleware
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());


// checkAuth middleware
const checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    // first checks if there's a token stored in the user's cookies
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
        req.user = null;
    } else {
      const token = req.cookies.nToken;
      const decodedToken = jwt.decode(token, { complete: true }) || {};
      req.user = decodedToken.payload;
    }
    // callback to what was supposed to happen before each route is called; middleware; says, this piece of middleware is finished so you can move on; wouldn't run the next route without this piece; makes it so that we don't go on until that asynchronous process is finished
    next();
  };
  app.use(checkAuth);

// Get Post model
const Post = require('./models/post');

// Requirements
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);
require('./controllers/replies.js')(app);

//Mocha variable
module.exports = app;

// Start Server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))