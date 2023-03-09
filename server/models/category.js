const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true }
});

CategorySchema.virtual("url").get(function () {
  return `/monitors/${this.name}`;
});

module.exports = mongoose.model('Category', CategorySchema);