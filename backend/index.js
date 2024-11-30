import express from 'express'
import userRouter from './routes/user.route.js'
import postRouter from './routes/post.route.js'
import commentRouter from './routes/comment.route.js'
import connectDB from './lib/connectDB.js';
import webhookRouter from './routes/webhook.route.js'
import {clerkMiddleware} from '@clerk/express';
import cors from 'cors'

const app = express();
app.use(cors(process.env.CLIENT_URL))
app.use(clerkMiddleware())

app.use("/webhooks", webhookRouter);

app.use(express.json())

// allow cross-origin requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
      "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// app.get("/auth-state", (req, res) => {
//     const authState = req.auth
//     res.json(authState)
// })

// app.get("/protect", (req, res) => {
//     const {userId} = req.auth;
//     if (!userId) {
//         return res.status(401).json({message: "User Unauthorized"});
//     }

//     res.status(200).json({message: "User Authorized"})
// })

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500)

    res.json({
        message: err.message || "Something went wrong",
        stack: err.stack,
        status: err.status
    })
})


app.listen(3000, () => {
    connectDB();
    console.log('Server is running on port 3000...');
})
