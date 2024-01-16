const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const { catchAsync, handleResponse } = require("../utils/helper");

exports.getComments = catchAsync(async (req, res) => {
  const postId = req.params.postId;

  const comments = await Comment.find({ postId });

  handleResponse({ res, status: 200, message: "successs", data: comments });
});

exports.createComment = catchAsync(async (req, res) => {
  const { commentBody } = req.body;
  const postId = req.params.postId;

  const comment = new Comment({ commentBody, postId });

  await comment.save();

  await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

  handleResponse({ res, status: 200, message: "success", data: comment });
});

exports.createReply = catchAsync(async (req, res) => {
  const { commentBody } = req.body;
  const postId = req.params.postId;
  const parentCommentId = req.params.commentId;

  const reply = new Comment({
    commentBody,
    postId,
    parentComment: parentCommentId,
  });

  await reply.save();
  await Comment.findByIdAndUpdate(parentCommentId, {
    $push: { replies: reply._id },
  });

  handleResponse({ res, status: 200, message: "success", data: reply });
});
