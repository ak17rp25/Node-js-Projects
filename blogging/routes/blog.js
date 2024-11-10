const express = require('express');
const {fileUpload} = require("../../multerFileUpload");
const uploadedFile = fileUpload("./blogging/uploads");

const {handleAddBlogEntry,handleCreateBlogEntry} = require('../controller/blog');

const route = express.Router();

route.get('/addBlog',handleAddBlogEntry);
route.post('/addBlog', uploadedFile.single('coverImage'),handleCreateBlogEntry);

module.exports = route;