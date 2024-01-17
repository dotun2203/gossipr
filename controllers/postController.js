const Post = require("../models/postModel");
const { catchAsync, handleResponse } = require("../utils/helper");

exports.createPosts = catchAsync(async (req, res) => {
  const { content } = req.body;
  const post = new Post({ content });

  await post.save();

  handleResponse({
    res,
    status: 200,
    message: "post created successfully",
    data: post,
  });
});

exports.getPosts = catchAsync(async (req, res) => {
  const post = await Post.find({}).sort({ createdAt: -1 });

  handleResponse({
    res,
    status: 200,
    message: "success",
    data: post,
  });
});

// exports.singlePost = catchAsync(async (req, res) => {
//   const { postId } = req.params;

//   const post = await Post.findById(postId).populate("comments");

//   if (!post) {
//     return handleResponse({
//       res,
//       status: 404,
//       message: "post not found",
//       data: null,
//     });
//   }

//   handleResponse({ res, status: 200, message: "success", data: post });
// });

exports.singlePost = catchAsync(async (req, res) => {
  const post = await Post.findById(req.params.postId).populate({
    path: "comments",
    populate: {
      path: "replies",
      populate: {
        path: "replies",
      },
    },
  });

  if (!post) {
    handleResponse({ res, status: 404, message: "post not found", data: null });
  }

  handleResponse({ res, status: 200, message: "success", data: post });
});

// exports.addComments = catchAsync(async (req, res) => {
//   const { commentBody } = req.body;
//   const { postId } = req.params;

//   const post = await Post.findById(postId);
//   if (!post) {
//     return handleResponse({
//       res,
//       status: 404,
//       message: "post not found",
//       data: null,
//     });
//   }
//   post.comments.push({ commentBody });
//   await post.save();

//   handleResponse({
//     res,
//     status: 200,
//     message: "success",
//     data: post.comments,
//   });
// });
