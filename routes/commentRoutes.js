const express = require("express");
const commentController = require("../controllers/commentController");
const router = express.Router();

router.route("/:postId/comments").get(commentController.getComments);
router.route("/:postId/comments").post(commentController.createComment);
router
  .route("/:postId/comments/:commentId/replies")
  .post(commentController.createReply);

module.exports = router;
