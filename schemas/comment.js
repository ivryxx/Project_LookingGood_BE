const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentsSchema = new Schema({
  // _id: Schema.Types.ObjectId,

  userId: {
    type: String,
    // required: true,
  },
  commentId: {
    type: String,
    // required: true,
  },
  postId: {
    type: String,
  },
  comment: {
    type: String,
    // required:true
  },
  userImageUrl: {
    type: String,
  },
  createAt: {
    type: String,
  }
});

module.exports = mongoose.model("comments", commentsSchema);
