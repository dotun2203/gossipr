const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.route("/createPosts").post(postController.createPosts);

router.route("/getPosts").get(postController.getPosts);

router.route("/getPosts/:id").get(postController.singlePost);

module.exports = router;
