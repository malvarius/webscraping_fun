// Using this template, the cheerio documentation,
// and what you've learned in class so far, scrape a website
// of your choice, save information from the page in a result array, and log it to the console.

var cheerio = require("cheerio");
var axios = require("axios");
var logger = require("morgan");
var mongoose = require('mongoose');
var ScrapeData = require('./connection.js')
var express = require('express');
var PORT = 3000;
var app = express();
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));
var express = require('express');
var exphbs  = require('express-handlebars');
 
var app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
 
app.get('/', function (req, res) {
    res.render('index');
});

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/cruises", { useNewUrlParser: true });

// Make a request via axios to grab the HTML body from the site of your choice
axios.get("https://www.princess.com/find/searchResults.do?trade=S").then(function(response) {

  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(response.data);

  // Select each element in the HTML body from which you want information.
  // NOTE: Cheerio selectors function similarly to jQuery's selectors,
  // but be sure to visit the package's npm page to see how it works
  $(".result").each(function(i, element) {
    var info = {
    title : $(element).find(".cruise-name").text(),
    summary : $(element).find(".depart-date").text(),
    link : $(element).find(".price-amount").text()
    }

    ScrapeData.create(info)

  });


  // Log the results once you've looped through each of the elements found with cheerio
});
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
