var mongoose = require("mongoose");


var Schema = mongoose.Schema;


var scrapeSchema = new Schema({
 
  
   title: {
    type: String
  },
  summary:{
    type: String,
    unique: true
  },
  link:{
    type: String
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "notes"
  }
  });

// This creates our model from the above schema, using mongoose's model method
var ScrapeData = mongoose.model("cruises", scrapeSchema);

// Export the User model
module.exports = ScrapeData;