const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const authmiddlewares = require("../middlewares/auth-middleware");
// const UserController = require("../controllers/userController");
const posting = require("../schemas/post");
// const upload = require('../modules/multer');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// 이미지 파일 AWS S3 저장

// router.post(
//   '/imgs',
//   upload.single('image'),
//   UserController.uploadImage,
//   (req, res) => {
//     res.send({});
//   }
// );

// 게시글 작성 //

router.post("/post", async (req, res) => {
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
  await posting.create({
    // item_url: item_url,
    // postId: postId,
    category: category,
    title: title,
    userId: userId,
    imageUrl: imageUrl,
    content: content,
    date: date,
  });
  res.json({});
  console.log(postId);
});

// 게시글 삭제

router.delete("/post/delete/:_id", async (req, res) => {
  const { _id } = req.params;
  await posting.deleteOne({ _id: _id });
  res.json({ success: "삭제 성공" });
});

// router.delete("/:_id", async (req, res) => {
//   try {
//     const _id = req.params._id;
//     // const password = req.body["password"];
//     const isExist = await Post.findOne({ _id });
//     if (!isExist || !_id) {
//       console.log(
//         `${req.method} ${req.originalUrl} : 일치하지 않는 비밀번호 입니다.`
//       );
//       res.status(406).send();
//       return;
//     }
//     await Post.deleteOne({ _id });
//     res.send({ result: "게시글을 삭제하였습니다." });
//   } catch (error) {
//     console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
//     res.status(400).send();
//   }
// });

// router.delete("/post/delete/:postId", async (req, res) => {
//   await posting.deleteOne({ _id: req.params.userId });
//   res.json({ message: "삭제가 완료됐습니다." });
// });

// 게시글 수정

router.put("/post/modify/:postId", async (req, res) => {
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
  await posting
    .findByIdAndUpdate(req.params.itemId, {
      $set: {
        // item_url: item_url,
        // postId: postId,
        category: category,
        title: title,
        userId: userId,
        imageUrl: imageUrl,
        content: content,
        date: date,
      },
    })
    .exec();
  res.json({ message: "수정이 완료됐습니다." });
});

// 전체 게시글 조회 //

router.get("/post", async (req, res) => {
  const postings = await posting.find();
  res.json({ list: postings });
});

// 상세 페이지 접속

router.get("/post/:postId", async (req, res) => {
  const postings = await posting.findById(req.params.itemId);
  // const comment = await comments.find({ itemId });
  res.json({ list: postings /*, comment*/ });
});

module.exports = router;