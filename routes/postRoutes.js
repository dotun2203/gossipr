const express = require("express");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

const router = express.Router();

router.route("/getPosts").get(postController.getPosts);
router.route("/getPosts/:postId").get(postController.singlePost);
router.route("/createPosts").post(postController.createPost);

// router.route("/:postId/comments").post(commentController.postComment);

module.exports = router;
