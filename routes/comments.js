const express = require("express");
const router = express.Router();
const Comment = require("../schemas/comment");
const authMiddleware = require("../middlewares/auth-middleware");

// 댓글 저장
router.post("/comments/save/:_Id", authMiddleware, async (req, res) => {
  const { user } = res.locals;
  console.log(user);
  const { comment, createDate } = req.body;
  console.log(comment, createDate)
  await Comment.create({
    userId: user.userId,
    comment,
    createDate,
    postId: req.params.id,
  });
  console.log(comment, createDate)


  res.json({
    success: "댓글이 저장 되었습니다.",
  });
});
// router.post("/comment/save/:_Id", async (req, res) => {
//   const { id } = res.params;
//   const { user } = res.locals;
//   // console.log(user);
//   const userId = user.userId;
//   const commentId = user.commentId;
//   const { comment, createDate } = req.body;
//   await Comment.create({
//     postId: Number(id),
//     userId,
//     createDate,
//     commentId,
//     comment,
//     userImageUrl,
//   });
//   res.json({
//     success: "댓글이 저장 되었습니다.",
//   });
// });

//댓글 조회
router.get("/comment/get/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  const comment_list = await Comment.find({ articleId: id })
    .populate("articleId", "_id")
    .exec();
  // console.log(comment_list);

  if (!comment_list.length) {
    res.send({
      alert: "댓글이 없습니다.",
    });
    return;
  }
  res.json({
    comment_list: comment_list,
  });
});

module.exports = router;
