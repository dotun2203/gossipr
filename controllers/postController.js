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

// populate comments if necessary
// if (req.query.populateComments) {
//   await Promise.all(
//     posts.map(async (post) => {
//       post.comments = await Comment.find({ _id: { $in: post.comments } });
//     })
//   );
// }
exports.getPosts = catchAsync(async (req, res) => {
  const posts = await Post.find({});

  handleResponse({
    res,
    status: 200,
    message: "comment posted successfully",
    data: posts,
  });
});

exports.singlePost = catchAsync(async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return handleResponse({ res, status: 404, message: "page not found" });
    }

    const comments = post.comments;
    // handleResponse({ res, status: 200, message: "success", data: post });

    return res.json({ post, comments });
  } catch (error) {
    return handleResponse({
      res,
      status: 500,
      message: "internal server error",
    });
  }
});
