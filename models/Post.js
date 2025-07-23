import mongoose from "mongoose";

const postScheme = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
},{timestamps: true});

const Post = mongoose.model('Post', postScheme);
export default Post;
