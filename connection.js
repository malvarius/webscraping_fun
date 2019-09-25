var mongoose = require("mongoose");


var Schema = mongoose.Schema;


var scrapeSchema = new Schema({
 
  
   title: {
    type: String,
    required: true,
    trim:true
  },
  summary:{
    type: String,
    required: true,
  },
  link:{
    type: String,
    required: true,
    trim:true
  }
  });

// This creates our model from the above schema, using mongoose's model method
var ScrapeData = mongoose.model("cruises", scrapeSchema);

// Export the User model
module.exports = ScrapeData;