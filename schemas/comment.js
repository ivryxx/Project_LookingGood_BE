const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentsSchema = new Schema({
  // _id: Schema.Types.ObjectId,

  userId: {
    type: String,
    // required: true,
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
    // required: true,
  },
  comment: {
    type: String,
  },
  userImageUrl: {
    type: String,
  },
  createAt: {
    type: String,
  }
});

module.exports = mongoose.model("comments", commentsSchema);
