const Post = require("../models/postModel");
const { catchAsync, handleResponse } = require("../utils/helper");
// const catchAsync = require("../utils/catchAsync");

exports.createPosts = catchAsync(async (req, res) => {
  const newPost = await Post.create(req.body);
  const createdAt = newPost.formatDate();
  handleResponse({
    res,
    status: 200,
    message: "post created successfully",
    data: newPost,
    createdAt,
  });
});

exports.getPosts = catchAsync(async (req, res) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });

  // populate comments if necessary
  if (req.query.populateComments) {
    await Promise.all(
      posts.map(async (post) => {
        post.comments = await Comment.find({ _id: { $in: post.comments } });
      })
    );
  }
  handleResponse({
    res,
    status: 200,
    message: "comment posted successfully",
    data: posts,
  });
});

exports.singlePost = catchAsync(async (req, res) => {
  const post = await Post.findById(req.params.id).populate('comments')
  if (!post) {
    res.status(404).json({
      message: "post not found",
    });
  }

  handleResponse({ res, status: 200, message: "success", data: post });
});
