// Dependencies

var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000


app.listen(PORT, function(){
    console.log("Friend Finder is listening on port: " + PORT);
});