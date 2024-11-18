const comments = require('../models/comment');

async function handleCreateComments(req,res){
    await comments.create({
        comments: req.body.comment,
        blogId: req.params.blogId,
        createBy: req.user.id,
    });
    return res.redirect(`/blog/${req.params.blogId}`);
}

module.exports = {handleCreateComments};