import { Schema } from "mongoose"
import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    desc: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})

export default mongoose.model("Comment", commentSchema)