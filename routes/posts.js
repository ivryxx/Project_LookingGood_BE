const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const authmiddlewares = require("../middlewares/auth-middleware");
const Post = require("../schemas/post");
const Comment = require("../schemas/comment")
const upload = require('../modules/multer');
const req = require("express/lib/request");
const res = require("express/lib/response");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


// 이미지 파일 AWS S3 저장
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

  const createAt =
    year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;

  const { user } = res.locals;
  const userId = user[0].userId;
  const userImageUrl = user[0].userImageUrl;
  const imageUrl = req.file.location
  const { category, title, content } = req.body;
  console.log(userId)

  await Post.create({
    // postId: postId,
    userId,
    userImageUrl,
    category: category,
    title: title,
    imageUrl,
    content: content,
    createAt: createAt,
  });
  res.json({ userId, userImageUrl, category, title, imageUrl, content });
});



// 게시글 삭제
router.delete('/post/delete/:postId', authmiddlewares, async (req, res) => { //게시글 삭제
  const { postId } = req.params;
  console.log(req.params)
  await Post.deleteOne({ _id: postId });
  res.json({ success: "삭제가 완료 되었습니다" });
});



// 게시글 수정
router.put("/post/put/:postId", upload.single('imageUrl'), authmiddlewares, async (req, res) => {
  const { postId } = req.params
  const { category, title, content } = req.body;
  const imageUrl = req.file.location;
  const post = Post.findOne({ _id: postId });
  if (!post) {
    return res.status(400).send({ errorMessage: "본인의 글이 아닙니다." })
  }
  await Post.updateOne({ _id: postId }, {
    $set: {
      // postId: postId,
      // userId: userId,
      category,
      title,
      imageUrl,
      content,
      // date: date
    },
  })
  res.json({ success: true, message: "수정이 완료됐습니다." });
});





// 전체 게시글 조회 //
router.get("/post", async (req, res) => {
  const Posts = await Post.find();
  res.json({ list: Posts });
});



// 상세 페이지 접속
router.get('/post/detail/:postId', async function (req, res) {
  const { postId } = req.params;
  Post.findById(postId, async function (err, post) {
    if (!err) {
      let comments = await Comment.find({ _id: postId });
      console.log(comments)
      comments.sort(function (a, b) {
        return b.updatedAt - a.updatedAt;
      });
      res.json({ ok: true, post, comments });
    } else {
      res.json({ ok: false, post: {}, comments: {} });
    }
  });
});

module.exports = router;
