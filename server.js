// Set db
require('./data/reddit-db');

// Require Libraries
const express = require('express');

// App Setup
const app = express();

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

// Get Post model
const Post = require('./models/post');

// Requirements
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);

//Mocha variable
module.exports = app;

// Start Server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))