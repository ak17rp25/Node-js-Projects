const express = require('express');
const path = require('path');
const routes = require("./routes/user");



const app = express();

const port = 8002;
const {createConnection} = require('./connect');

app.set("view engine", "ejs");
app.set("views",path.resolve("./blogging/views"));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
createConnection('mongodb://localhost:27017/blog').then(()=>{
    console.log('Connected to MongoDB');
})


app.use("/",routes);


app.get('/', (req, res) => {
    return res.render('./home', { title: 'Home Page', message: 'Welcome to our website!' });
});
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});