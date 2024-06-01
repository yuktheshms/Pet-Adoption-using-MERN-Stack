const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reqformSchema = new Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  reason: {
    type: String,
  },
  experience: {
    type: String,
  },
  petsOwned: {
    type: String,
  },
  reqpet: {
    type: Schema.Types.ObjectId,
    ref: "Pet",
  },
  uid: {
    type: Schema.Types.ObjectId,
    ref: "userid",
  },
});

module.exports = mongoose.model("AdoptionRequest", reqformSchema);
