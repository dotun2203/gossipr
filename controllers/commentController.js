const Post = require("../models/postModel");
const catchAsync = require("../utils/catchAsync");

exports.postComment = catchAsync(async (req, res) => {
  const newComment = await Comment.create({
    content: req.body.content,
    postId: req.params.id,
  });

  await Post.findByIdAndUpdate(req.params.id, {
    $push: { comments: newComment._id },
  });

  res.status(200).json({
    status: "comment succesfully posted",
    data: newComment,
  });
});
