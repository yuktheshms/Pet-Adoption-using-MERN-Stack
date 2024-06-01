const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fromSchema = new Schema({
  petType: {
    type: String,
  },
  petName: {
    type: String,
  },
  petType: {
    type: String,
  },
  age: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  friendlyWithKids: {
    type: String,
  },
  reasonForAdoption: {
    type: String,
  },
  anyIllness: {
    type: String,
  },
});

module.exports = mongoose.model("adoptionform", fromSchema);
