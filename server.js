var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 8080;

// middleware
app.use(bodyParser.urlencoded({ extended: true }));

// parse into JSON
app.use(bodyParser.json({ type: 'application/*+json' }));

// parse into buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));

// parse HTML body into string
app.use(bodyParser.text({ type: 'text/html' }));

// routes
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);


// listener
app.listen(PORT, function () {
  console.log("App listening on PORT: ", PORT);
})