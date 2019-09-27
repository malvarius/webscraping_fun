// Using this template, the cheerio documentation,
// and what you've learned in class so far, scrape a website
// of your choice, save information from the page in a result array, and log it to the console.
require('dotenv').config()
var cheerio = require("cheerio");
var axios = require("axios");
var logger = require("morgan");
var mongoose = require('mongoose');
var ScrapeData = require('./models')
var express = require('express');
var PORT = process.env.PORT||3000;
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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI ||"mongodb://localhost/cruises", { useNewUrlParser: true});
//  get to query the DB for cruise info
app.get('/', function (req, res) {
  ScrapeData.cruises.find({})
  .then((data)=>{
    res.render('index',{info:data});
  });
});
app.get('/info/:id',(req,res)=>{
  ScrapeData.cruises.findOne({_id:req.params.id}).populate('note')
  .then((response)=>{
    res.json(response);
  })
})
// post to post a note
app.post('/info/:id',function(req,res){
  console.log(req.body)
  console.log(req.params.id)
  const noteVal = req.body;
  const IDP = req.params.id;
  
    ScrapeData.notes.create(noteVal)
    .then(function(response1){
      console.log(response1)
     return ScrapeData.cruises.findOneAndUpdate({_id:IDP},{note:response1.body})
    }).then(function(jsonRes){
      res.json(jsonRes)
    }).catch(function(err){
      if(err) throw err
    })
  
  
  
})


// basic get to scrape website for cruise data
app.get('/scraping',(req,res)=>{
  axios.get("https://www.princess.com/find/searchResults.do?trade=S").then(function(response) {
  var $ = cheerio.load(response.data);
  $(".result").each(function(i, element) {
    var info = {
    title : $(element).find(".cruise-name").text(),
    summary : $(element).find(".depart-date").text(),
    price : $(element).find(".price-amount").text(),
    link : 'https://www.princess.com/find/'+ $(element).find('.invert-decoration').attr('href')
    }

    ScrapeData.cruises.create(info)
    .then((data)=>{
      res.json('You put the data in the thing')
    }).catch((err)=>{
      if (err) {
        console.log('there was an error here')
      }
    })

  });
  // Log the results once you've looped through each of the elements found with cheerio
})


})

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
