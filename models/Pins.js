const mongoose = require('mongoose')

const PinSchema = new mongoose. Schema({
  title: String, 
  content: String, 
  image: String,
  latitude: Number,
  longitude: Number,
  author: {type: mongoose.Schema.Objectid,ref: "User"},
  comments: [
    {
      text: String, 
      createdAt: {type: Date, default: Date.now},
      author: {type: mongoose.Schema.Ob, ref: "User"}
    }
  ] 
}, {timestamps: true}) 

module.exports = mongoose.model("Pin", PinSchema)

 