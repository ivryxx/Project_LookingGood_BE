const mongoose = require("mongoose");
require("mongoose-type-url");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  //   userImgUrl: {
  //     type: String,
  //     required: true,
  //   },
});

module.exports = mongoose.model("User", userSchema);
