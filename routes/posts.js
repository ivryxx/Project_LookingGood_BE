const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const authmiddlewares = require("../middlewares/auth-middleware");
const Post = require("../schemas/post");
// const UserController = require("../controllesrs/userController");
const upload = require('../modules/multer');
const req = require("express/lib/request");
const res = require("express/lib/response");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// 이미지 파일 AWS S3 저장

// router.post(
//   "/single",
//   upload.single("imageUrl"), async (req, res) => {
//     const file = await req.file;
//     console.log(file)
//     try {
//       const result = await file.location;
//       res.status(200).json({ imageUrl: result })
//     } catch (e) {
//       console.log(e)
//     }

//   });

// UserController.uploadImage,

router.post('/single', upload.single('imageUrl'), async (req, res) => {
  const file = await req.file;
  console.log(file);
  try {
    const result = await file.location;
    console.log(result)
    res.status(200).json({ imageUrl: result })
  } catch (e) {

  }
});

// 게시글 작성 //

router.post("/post", authmiddlewares, upload.single('imageUrl'), async (req, res) => {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  let hour = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hour = hour < 10 ? "0" + hour : hour;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  const date =
    year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;

  const imageUrl = req.file.location
  const { category, title, content } = req.body;
  // let { user } = res.locals;

  await Post.create({
    // postId: postId,
    category: category,
    title: title,
    imageUrl,
    content: content,
    date: date,
  });
  res.json({});
});

// 게시글 삭제

router.delete("/post/delete/:_Id", authmiddlewares, async (req, res) => {
  await Post.deleteOne({ _id: req.params.postId })

  res.json({ success: "삭제 성공" });
});


// 게시글 수정

router.put("/post/put/:_Id", authmiddlewares, async (req, res) => {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  let hour = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hour = hour < 10 ? "0" + hour : hour;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  const date =
    year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;

  const { category, title, userId, imageUrl, content } = req.body;
  await Post.findByIdAndUpdate(req.params._Id, {
    $set: {
      // postId: postId,
      category: category,
      title: title,
      userId: userId,
      imageUrl: imageUrl,
      content: content,
      date: date,
    },
  }).exec();
  res.json({ message: "수정이 완료됐습니다." });
});

// 전체 게시글 조회 //

router.get("/post", async (req, res) => {
  const Posts = await Post.find();
  res.json({ list: Posts });
});

// 상세 페이지 접속

router.get("/post/:postId", async (req, res) => {
  console.log(req.params)
  const Posts = await Post.findById(req.params.postId);
  // const comment = await comments.find({ userId });
  res.json({ list: Posts /*, comment*/ });
});

module.exports = router;
