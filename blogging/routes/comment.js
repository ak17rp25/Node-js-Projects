const express = require('express')
const route = express.Router();

const {handleCreateComments} = require('../controller/comments');

route.post('/:blogId',handleCreateComments);

module.exports = route;
