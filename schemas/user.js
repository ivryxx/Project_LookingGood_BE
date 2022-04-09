const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userImgUrl: {
    type: URL,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
