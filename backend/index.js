const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const cors = require('cors');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comments');
const path = require('path');

dotenv.config({ path: "./config/config.env" });
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")))
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(cookieParser());
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);


const storage = multer.diskStorage({
    destination: (req, file, fn) => {
        fn(null, "images")
    },
    filename: (req, file, fn) => {
        fn(null, req.body.img)
            //fn(null, "image1.jpg")
    }
})

const upload = multer({ storage: storage })
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("Image has been uploaded successfully!")
})


connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is working on http://localhost:${PORT}`);
});