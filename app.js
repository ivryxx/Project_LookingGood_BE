const express = require('express')
const mongoose = require('mongoose')
const port = 3000;

const app = express();


// const multer = require('multer');

// const filestorageEngine =mulert.distorage({
//     destination : (req, file, cb) => {
//         cb(null, './images');
//     },
//     filename : (req, file, cb) => {
//         cb(null, Date.now() +'--' file.originalname);
//     },
// });

// const upload = multer({storage : filestorageEngine});

// app.post(/single',upload.single('image') ,(req,res)=> {
//     res.send("single file upload success");
// });










// const multer = require('multer')
// let storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename(req, file, cb)  {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   }
// });
// let upload = multer({dest: 'uploads/'});
// let toImage = multer({storage: storage});


app.get('/upload', function(req, res){
    res.render('upload');
  });
  
  app.post('/upload', function(req, res){
    res.send('업로드 성공!');
  });



app.use('/users', express.static('uploads'));



app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
  });


 