const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const { catchAsync, handleResponse } = require("../utils/helper");

exports.postComment = catchAsync(async (req, res) => {
  const newComment = await Comment({
    content: req.body.content,
    postId: req.params.id,
  });

  await Post.findByIdAndUpdate(req.params.id, {
    $push: { comments: newComment._id },
  });

  handleResponse({
    res,
    status: 200,
    message: "comment sucecesfully posted",
    data: newComment,
  });
});
