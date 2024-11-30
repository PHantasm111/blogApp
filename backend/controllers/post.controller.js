import Post from "../models/post.model.js"
import User from "../models/user.model.js"
import ImageKit from "imagekit";

export const getPosts = async (req, res) => {
    // page number and limit
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const posts = await Post.find()
        .populate("user", "username")
        .limit(limit)
        .skip((page - 1) * limit)

    // total number of posts
    const totalPosts = await Post.countDocuments();

    // verify if there are more posts
    const hasMore = page * limit < totalPosts;

    res.status(200).json({ posts, hasMore })
}

export const getPost = async (req, res) => {
    const post = await Post.findOne({ slug: req.params.slug }).populate("user", "username img")
    res.status(200).json(post)
}

export const createPost = async (req, res) => {

    const clerkUserId = req.auth.userId;

    if (!clerkUserId) {
        return res.status(401).json({ message: "User Unauthorized" });
    }

    const user = await User.findOne({ clerkUserId });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    let slug = req.body.title.replace(/ /g, "-").toLowerCase();
    let existingPost = await Post.findOne({ slug });

    let counter = 2;

    while (existingPost) {
        slug = `${slug}-${counter}`;
        existingPost = await Post.findOne({ slug });
        counter++;
    }

    const newPost = new Post({ user: user._id, slug, ...req.body })

    const savedPost = await newPost.save()
    res.status(200).json(savedPost)
}

export const deletePost = async (req, res) => {

    const clerkUserId = req.auth.userId;

    if (!clerkUserId) {
        return res.status(401).json({ message: "User Unauthorized" });
    }

    const user = await User.findOne({ clerkUserId });

    const deletedPost = await Post.findByIdAndDelete({
        _id: req.params.id,
        user: user._id
    })

    if (!deletedPost) {
        return res.status(403).json({ message: "You can delete only your posts" });
    }

    res.status(200).json("Post has been deleted")
}

const imagekit = new ImageKit({
    urlEndpoint: process.env.IK_URL_ENDPOINT,
    publicKey: process.env.IK_PUBLIC_KEY,
    privateKey: process.env.IK_PRIVATE_KEY,
});

export const uploadAuth = async (req, res) => {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
}