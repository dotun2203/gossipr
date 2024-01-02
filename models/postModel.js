const mongoose = require("mongoose");
const moment = require("moment");

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Posts must have contents"],
    trim: true,
    minlength: [10, "a post must have more than 10 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

postSchema.methods.formatDate = function () {
  return moment(this.createdAt).format("YYYY-MM-DD HH:mm:ss");
};
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
