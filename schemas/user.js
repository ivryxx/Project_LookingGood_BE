const mongoose = require("mongoose");
const Url = require("mongoose-type-url");
require("mongoose-type-url");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userImageUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
