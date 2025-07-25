import Post from "../models/Post.js";

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        console.log(post)

        if(!post) {
            return res.status(404).json({message: "Post not found"})
        }

        if(post.author.toString() !== req.user._id && req.user.role !=="admin") {
            return res.status(403).json({message: "not authorized to delete this post"})
        }

        await post.deleteOne();
        res.status(200).json({message: "post deleted successfully"})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "server Error"})
    }
}