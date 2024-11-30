import { Webhook } from "svix";
import User from "../models/user.model.js";

export const clerkWebhook = async (req, res) => {
    const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!CLERK_WEBHOOK_SECRET) {
        throw new Error("Missing Clerk Webhook Secret");
    }

    const payload = req.body;
    const headers = req.headers;

    const wh = new Webhook(CLERK_WEBHOOK_SECRET);
    let evt;

    try {
        evt = wh.verify(payload, headers);
    } catch (error) {
        res.status(400).json({
            message:"Webhook verification failed",
        });
    }

    //console.log(evt.data);
    

    if (evt.type === "user.created") {
        const newUser = new User({
            clerkUserId : evt.data.id,
            username: evt.data.username || evt.data.email_addresses[0].email_address,
            email: evt.data.email_addresses[0].email_address,
            img: evt.data.profile_img_url,
        });

        await newUser.save();
    }

    if (evt.type === "user.deleted") {
        const deletedUser = await User.findOneAndDelete({
          clerkUserId: evt.data.id,
        });
    
        await Post.deleteMany({user:deletedUser._id})
        await Comment.deleteMany({user:deletedUser._id})
      }

    return res.status(200).json({
        message: "Webhook processed successfully",
    });

}