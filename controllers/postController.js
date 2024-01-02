// const { path } = require("../app");
const Post = require("../models/postModel");
const {
  catchAsync,
  handleResponse,
  getpostsWithComments,
} = require("../utils/helper");

exports.createPost = catchAsync(async (req, res) => {
  const newPost = new Post(req.body);
  const savedPost = await newPost.save();
  res.status(201).json(savedPost);
});

exports.getPosts = catchAsync(async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

exports.singlePost = catchAsync(async (req, res) => {
  const post = await Post.findById(req.params.postId).populate({
    path: "comments",
    select: "content",
  });
  if (!post) {
    res.status(404).json({ message: "post not found" });
  } else {
    res.json(post);
  }
});

// exports.createPosts = catchAsync(async (req, res) => {
//   const newPost = await Post.create(req.body);
//   const createdAt = newPost.formatDate();
//   handleResponse({
//     res,
//     status: 200,
//     message: "post created successfully",
//     data: newPost,
//     createdAt,
//   });
// });

// populate comments if necessary
// if (req.query.populateComments) {
//   await Promise.all(
//     posts.map(async (post) => {
//       post.comments = await Comment.find({ _id: { $in: post.comments } });
//     })
//   );
// }

// exports.getPosts = catchAsync(async (req, res) => {
//   const posts = await getpostsWithComments();

//   handleResponse({
//     res,
//     status: 200,
//     message: "comment posted successfully",
//     data: posts,
//   });
// });

// exports.singlePost = catchAsync(async (req, res) => {
//   const { id } = req.params;

//   const post = await Post.findById(id).populate("comments");
//   if (!post) {
//     return handleResponse({ res, status: 404, message: "page not found" });
//   }

//   const comments = post.comments;
//   // handleResponse({ res, status: 200, message: "success", data: post });

//   return res.json({ post, comments });
// });
