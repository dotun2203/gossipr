const Post = require("../models/postModel");
const catchAsync = require("../utils/catchAsync");

exports.createPosts = catchAsync(async (req, res) => {
  const newPost = await Post.create(req.body);

  res.status(200).json({
    status: "success",
    data: newPost,
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

  res.status(200).json({
    status: "success",
    results: posts.length,
    data: {
      posts,
    },
  });
});

exports.singlePost = catchAsync(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404).json({
      message: "post not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});
