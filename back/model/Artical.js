const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articalSchema = new Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  content: {
    type: String,
  },
  uid: {
    type: Schema.Types.ObjectId,
    ref: "Registration",
  },
});

module.exports = mongoose.model("Artical", articalSchema);
