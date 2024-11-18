const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    comments:{
        type: String,
        required: true
    },
    blogId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    },
    createBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true});

const commentsModel = mongoose.model('comments',commentsSchema);

module.exports = commentsModel;