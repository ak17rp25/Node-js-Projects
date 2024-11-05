const express = require('express');
const path = require('path');
const multer  = require('multer')
const app = express();
const port = 8002;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './fileupload/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,  uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

app.post('/profile', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    return res.redirect('/');
  })



app.set('view engine', 'ejs');
app.set("views", path.resolve('./fileupload/views'));
app.use(express.json());

app.get('/', (req, res) => {
    return res.render('home');
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});