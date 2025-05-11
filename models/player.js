const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  _id:{
    type:mongoose.Schema.Types.ObjectId
  },
  prenom:{
    type:String
  },
  nom:{
    type:String
  },
  pv:{
    type:Number
  },
  role:{
    type:String
  }
});

module.exports = mongoose.model("player", playerSchema);