const express = require("express");
const commentController = require("../controllers/commentController");

const router = express.Router();

router.route("comments/:id/comments").post(commentController.postComment);

module.exports = router;
