const express = require('express')
const app = express()
const host = 3000
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
app.use(express.json())
app.use(cookieParser())

const cors = require('cors')
const { log } = require('console')
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
}))

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString('hex');
    return secretKey;
}


const SECRET_KEY = generateSecretKey();
console.log('Generated Secret Key:', SECRET_KEY);


mongoose.connect('mongodb+srv://muskan:moveOn@twitter.jajcpxi.mongodb.net/twitter?retryWrites=true&w=majority&appName=Twitter');
const db = mongoose.connection;
db.once('open', () => {
    console.log('DB Connected...');
})



const User = mongoose.model('User', {
    name: String,
    contact: Number,
    username: String,
    password: String,
    connections: [String],
    requests: [String],
});


const Post = mongoose.model('Post', {
    user: String,
    userId: mongoose.Schema.Types.ObjectId,
    content: String,
    title: String
});


const authenticateUser = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ "msg": "Not authenticated" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ "msg": "Invalid token" });
    }
}




app.post('/register', async (req, res) => {

    try {
        const existingUser = await User.findOne({ username: req.body.username })

        if (existingUser) {
            return res.status(409).json({ "msg": "Username already exists", "code": 409 })
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            name: req.body.name,
            contact: req.body.contact,
            username: req.body.username,
            password: hashedPassword,
            connections: [],
            requests: []
        })

        const saveUser = await newUser.save()
        const token = jwt.sign({
            username: saveUser.username, connections: saveUser.connections,
            requests: saveUser.requests, posts: saveUser.posts, name: saveUser.name, userId: saveUser._id
        }, SECRET_KEY)
        res.cookie('token', token, { httpOnly: true })
        res.status(201).json({ "msg": "Registration successful", "code": 201, "user": saveUser })
    }
    catch (error) {
        res.status(500).json(error)
    }
})




app.post('/login', async (req, res) => {

    try {
        const user = await User.findOne({ username: req.body.username })

        if (!user) {
            return res.status(401).json({ "msg": "Invalid credentials", "code": 401 })
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ "msg": "Invalid credentials", "code": 401 });
        }

        const token = jwt.sign({
            username: user.username, connections: user.connections,
            requests: user.requests, posts: user.posts, name: user.name, userId: user._id
        }, SECRET_KEY);
        res.cookie('token', token, { httpOnly: true });

        res.json({ "msg": 'Login successful', "code": 200, "user": user })
    }
    catch (error) {
        res.status(500).json(error)
    }
})



app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ "msg": "Logout successful", "code": 200 });
})



app.post('/createPost', authenticateUser, async (req, res) => {

    try {
        const username = req.user.username;
        const newPost = new Post({ 
            user: username,
            userId: req.user.userId,
            content: req.body.content,
            title: req.body.title
        });
        const savePost = await newPost.save();
        res.status(201).json({ "msg": "Post created successfully", "post": savePost, "code": 201 });
    } 
    catch (error) {
        res.status(500).json(error);
    }
});



app.get('/getPosts', authenticateUser, async (req, res) => {

    try {
        const userId = req.user.userId;
        const posts = await Post.find({userId});
        res.json({ "posts": posts, "code": 200 });
    } catch (error) {
        res.status(500).json(error);
    }
    
});



app.put('/editPost/:postId', authenticateUser, async (req, res) => {
    try {
        const { content, title } = req.body;
        const postId = req.params.postId;

        const post = await Post.findOne({ _id: postId, userId: req.user.userId });
        if (!post) {
            return res.status(403).json({ "msg": "You are not authorized to edit this post", "code": 403 });
        }

        post.content = content;
        post.title = title;
        const updatedPost = await post.save();

        res.json({ "msg": "Post updated successfully", "post": updatedPost, "code": 200 });
    } catch (error) {
        res.status(500).json({ "msg": "Internal server error", "code": 500 });
    }
});



app.delete('/deletePost/:postId', authenticateUser, async (req, res) => {
    try {
        const postId = req.params.postId;

        const post = await Post.findOne({ _id: postId, userId: req.user.userId });
        if (!post) {
            return res.status(403).json({ "msg": "You are not authorized to delete this post", "code": 403 });
        }

        await Post.deleteOne({ _id: postId });

        res.json({ "msg": "Post deleted successfully", "code": 200 });
    } catch (error) {
        res.status(500).json({ "msg": "Internal server error", "code": 500 });
    }
});


app.listen(host, () => {
    console.log("Server Started...");
});