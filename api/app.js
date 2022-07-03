const express = require('express');
const cors = require('cors');
const { connectDB } = require('./routes/db/dbConnection');
const authRouter = require('./routes/auth/auth')
const userRouter = require('./routes/users/user')
const blogRouter = require('./routes/blogpost/blogpost')
const commentRouter = require('./routes/comment/comments');
const cookieParser = require("cookie-parser");
const imageUploadRouter = require('./routes/imageupload/imageupload');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors(
    {
        exposedHeaders: ['*', 'Authorization' ],
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "DELETE", "PUT"],
        credentials: true, 
    }
));

app.use(cookieParser());

connectDB();

app.get('/', (req, res) => {
    return res.send("working");
});
app.post('/uploads', (req, MultiPartyMiddleware, res) => {
    let tempFile = req.files.upload;
    let path = tempFile.path;
    return res.status(200).json({
        uploaded: true,
        url: `http://localhost:8000/${path}`
    });

});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/comments', commentRouter);
app.use('/upload/images', imageUploadRouter);
app.listen(port=8000, () => {
    console.log("Running on port 8000");
});

