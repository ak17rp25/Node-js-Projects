const express = require('express');
const path = require('path');
const routes = require("./routes/user");
const blogRoute = require("./routes/blog");
const commentRoute = require('./routes/comment');
const cookieParser = require('cookie-parser');
const {checkForAuthentication} = require("./middleware/auth");
const blog = require("./models/blog");
const app = express();

const port = 8002;
const {createConnection} = require('./connect');


app.set("view engine", "ejs");
app.set("views",path.resolve("./blogging/views"));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());
app.use(checkForAuthentication('token'));

app.use('/', express.static(path.resolve(__dirname, 'uploads')));
app.use('/blog', express.static(path.resolve(__dirname, 'uploads')))
app.use('/comments', express.static(path.resolve(__dirname, 'uploads')))
createConnection('mongodb://localhost:27017/blog').then(()=>{
    console.log('Connected to MongoDB');
})


app.use("/",routes);
app.use("/blog",blogRoute);
app.use("/comments",commentRoute);
app.get('/', async(req, res) => {
    const allBlogs = await blog.find({});
    return res.render('home', { 
        user: req.user,
        blogs: allBlogs
    });
});


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});