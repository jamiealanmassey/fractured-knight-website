const express = require('express');
const router = express.Router();

function retrieveCommentForm(request, response) {

}

function createComment(request, response) {

}

router.get('/new', retrieveCommentForm);
router.post('/', createComment);

module.exports = router;
