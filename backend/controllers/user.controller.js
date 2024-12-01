import User from "../models/user.model.js";

export const getUserSavedPosts = async (req, res) => {
    const clerkUserId = req.auth.userId
    if (!clerkUserId) return res.status(401).json("Not authenticated!");

    const user = await User.findOne({ clerkUserId })

    res.status(200).json(user.savedPosts)
}

export const SavePost = async (req, res) => {
    const clerkUserId = req.auth.userId;
    const postId = req.body.postId;

    if (!clerkUserId) return res.status(401).json("Not authenticated!");

    const user = User.findOne({ clerkUserId });

    const isSaved = user.savedPosts.includes(postId);

    if (!isSaved) {
        await User.findOneAndUpdate(user._id, {
            $push: { savedPosts: postId },
        });
    } else {
        await User.findOneAndUpdate(user._id, {
            $pull: { savedPosts: postId },
        });
    }

    res.stauts(200).json(isSaved ? "Post unsaved" : "Post saved");
}