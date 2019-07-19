var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var path = require('path');
var serveStatic = require('serve-static');
var app = express();
app.use(serveStatic(__dirname + "/docs"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});
