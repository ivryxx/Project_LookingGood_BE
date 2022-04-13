const express = require("express");
const router = express.Router();
const Comment = require("../schemas/comment");
const Post = require('../schemas/post')
const authMiddleware = require("../middlewares/auth-middleware");
const cors = require('cors')










// 댓글 저장



router.post("/comments/save/:postId", authMiddleware, async (req, res) => {
  // const postId =req.params.id;
  try {
    const { user } = res.locals;

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

    const userId = user[0].userId;
    const userImageUrl = user[0].userImageUrl;
    const { comment } = req.body;
    const { postId } = req.params
    console.log(userId, comment, createAt, postId);
    const list = await Comment.create({
      // userId:user.userId,
      userId,
      userImageUrl,
      comment,
      createAt: createAt,
      postId
      // commentId,
    });
    console.log(list)
    res.json({
      success: "댓글이 저장 되었습니다.",
      list
    });
  } catch (err) {
    console.log(err)
    res.json({
      errorMassage: "댓글 저장 실패"
    })
  }
});



//댓글 조회

router.get('/comments/get/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    let comments = await Comment.find({ postId });
    console.log(postId)
    res.json(comments);
  } catch (err) {
    console.error(err);
  }
});

// router.get("/comments/get/:postId", async (req, res) => {

//   const { postId } = req.params;
//   const { commentId } = req.params;
//   console.log(commentId)
//   let comments = await Comment.find({ postId });


//   res.send({ comments });
//   console.log(comments)
//   console.log(postId)

// });


//댓글 삭제

router.delete("/comments/delete/:commentId", authMiddleware, async (req, res) => {
  const { commentId } = req.params;
  await Comment.deleteOne({ commentId });
  res.send({ result: '삭제완료' });
})

module.exports = router;






// router.post("/comments/save/:postId", authMiddleware, async (req, res) => {
//   const { user } = res.locals;
//   console.log(user);
//   const { comment, createAt, userImageUrl } = req.body;
//   await Comment.create({
//     userId: user.userId,
//     comment,
//     createAt,
//     conmmentId,
//     userImageUrl: user.userImageUrl,
//     postId: req.params.id,
//   });
//   console.log(comment, createAt, userImageUrl)


//   res.json({
//     success: "댓글이 저장 되었습니다.",
//   });
// });