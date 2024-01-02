const express = require("express");
const commentController = require("../controllers/commentController");

const router = express.Router();

router.route("/:postId/comments").post(commentController.postComment);
router.route("/:postId/comments").get(commentController.getComments);

module.exports = router;
