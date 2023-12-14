const express = require("express");
const commentController = require("../controllers/commentController");

const router = express.Router();

router.route("/:id/comments").post(commentController.postComment);

module.exports = router;
