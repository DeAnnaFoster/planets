var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId

var starSchema = new mongoose.Schema({
  name: {type: String, required:true},

  // RELATIONSHIPS
  galaxyId: {type: ObjectId, ref: 'Galaxy', required: true},
  creatorId: { type: ObjectId, ref: 'User', required: true }
})


var Star = mongoose.model("Star", starSchema);

module.exports = Star;