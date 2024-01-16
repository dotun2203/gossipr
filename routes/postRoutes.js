const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.route("/getPosts").get(postController.getPosts);
router.route("/getPosts/:postId").get(postController.singlePost);
router.route("/createPosts").post(postController.createPosts);
// router.route("/:postId/comments").post(postController.addComments);

module.exports = router;
