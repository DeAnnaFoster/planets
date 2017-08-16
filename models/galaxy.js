var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId;

var galaxySchema = new mongoose.Schema({
  name: { type: String, required: true },
  
  //RELATIONSHIPS
  creatorId: { type: ObjectId, ref: 'User', required: true }
})

var Galaxy = mongoose.model("Galaxy", galaxySchema);

module.exports = Galaxy