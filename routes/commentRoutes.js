const express = require("express");
const commentController = require("../controllers/commentController");

const router = express.Router();

router.route("/api/posts/:id/comments").post(commentController.postComment);

module.exports = router;
