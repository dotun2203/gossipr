const Comment = require("../models/commentModel");

exports.catchAsync = function (fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

exports.handleResponse = ({ res, status, message, data }) => {
  return res.status(status).json({
    success: true,
    status: message,
    data: data !== null ? data : null,
  });
};

exports.getpostsWithComments = async () => {
  const posts = await Post.find();

  for (const post of posts) {
    post.comments = await Comment.find({ postId: post._id });
  }
  return post;
};
