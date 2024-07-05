const mongoose = require("mongoose");
const signSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  phno : {
    type : String
  },
  password : {
    type : Number,
    maxLengh : 6,
    required : true
  }
});
const data = mongoose.model("data",signSchema);//collection and model name is same i.e. data

module.exports = data;