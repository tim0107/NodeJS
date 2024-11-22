const express = require('express');
const router = express.Router();

const {
  getComment,
  getCommentById,
  deleteComment,
  updateComment,
  createComment,
} = require('../controllers/comment.controller');


router.route('/')
.get(getComment)
.post(createComment)

router.route('/:id')
.get(getCommentById)
.patch(updateComment)
.delete(deleteComment)

console.log('from comment router');

module.exports = router;
