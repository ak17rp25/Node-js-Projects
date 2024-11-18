const blogData = require('../models/blog')
const mongoose = require('mongoose');
const commentsData = require('../models/comment');
  

async function handleAddBlogEntry(req,res){
    return res.render('addBlog',{
        user:req.user
    });
}

async function handleCreateBlogEntry(req,res){
    const blogFile = await blogData.create({
        title: req.body.title,
        content: req.body.content,
        coverImage: req.file.filename,
        createBy: req.user.id,
        
    })
    return res.redirect(`/blog/${blogFile._id}`);
}



async function handleGetAllBlogEntries(req, res) {
    const id = req.params.id;
    if(!id.endsWith(".png")){
        const allBlogs = await blogData.find({_id:id}).populate("createBy");
        const allComments = await commentsData.find({blogId:id}).populate("createBy");
        console.log(allComments);
        return res.render("blog",{
            user:req.user,
            blogs: allBlogs,
            comments: allComments
        });
    }
    return res.status(400).json({message:'Not'});
    
}


module.exports = {
    handleAddBlogEntry,handleCreateBlogEntry,handleGetAllBlogEntries
};
