const blog = require('../models/blog')

  

async function handleAddBlogEntry(req,res){
    return res.render('addBlog',{
        user:req.user
    });
}

async function handleCreateBlogEntry(req,res){
    console.log(req.file.originalname);
    const blogFile = await blog.create({
        title: req.body.title,
        content: req.body.content,
        coverImage: req.file.originalname,
        createBy: req.user._id,
        
    })
    console.log(blogFile);
    return res.redirect(`/blog/${blogFile._id}`);
  
}

module.exports = {
    handleAddBlogEntry,handleCreateBlogEntry
};
