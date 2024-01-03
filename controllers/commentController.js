const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const { catchAsync, handleResponse } = require("../utils/helper");

exports.postComment = catchAsync(async (req, res) => {
  const { postId, createdAt, commentBody } = req.body;

  Post.findById(postId).then((post) => {
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }

    post.comments.push({ content, createdAt, commentBody });
    post.save().then((updatedPost) =>
      res.json({
        message: "comment added succesfully",
        updatedPost,
      })
    );
  });
});

exports.getComments = catchAsync(async (req, res) => {
  const comments = await Comment.find({ postId: req.params.postId });
  res.json(comments);
});

// exports.postComment = catchAsync(async (req, res) => {
//   //  const newComment = await Comment({
//   //    content: req.body.content,
//   //    postId: req.params.id,
//   //  });

//   //  await Post.findByIdAndUpdate(req.params.id, {
//   //    $push: { comments: newComment._id },
//   //  });

//   //  handleResponse({
//   //    res,
//   //    status: 200,
//   //    message: "comment sucecesfully posted",
//   //    data: newComment,
//   //  });
//   const { content } = req.body;
//   const { id } = req.params;

//   const post = await Post.findById(id);

//   if (!post) {
//     return res.status(404).json({ message: "page not found" });
//   }

//   const newComment = new Comment({ content, post: post._id });

//   await newComment.save();

//   post.comments.push(newComment._id);
//   await post.save();

//   return res.json({
//     status: 201,
//     message: "commented successfully",
//     data: newComment,
//   });
// });
