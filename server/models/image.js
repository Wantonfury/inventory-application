const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Image = new Schema({
  image: { data: Buffer, contentType: String }
});

Image.virtual("decode").get(function () {
  
});