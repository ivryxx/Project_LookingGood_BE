const express = require("express");
const router = express.Router();
const Comment = require("../schemas/comment");
const authMiddleware = require("../middlewares/auth-middleware");










// 댓글 저장

router.post("/comments/save/:postId", authMiddleware, async (req, res) => {
  // const postId =req.params.id;
  try {
    const { user } = res.locals;

    const userId = user[0].userId;
    const userImageUrl = user[0].userImageUrl;
    const { comment, createAt } = req.body;
    const { postId } = req.params
    console.log(userId, comment, createAt, postId);
    await Comment.create({
      // userId:user.userId,
      userId,
      userImageUrl,
      comment,
      createAt,
      // commentId,
      postId
    });
    res.json({
      success: "댓글이 저장 되었습니다.",
    });
  } catch (err) {
    console.log(err)
    res.json({
      errorMassage: "댓글 저장 실패"
    })
  }
});











// 댓글 조회
router.get('/comments/get/postId',  async (req, res) => {
  try {
    const { postId } = req.params;
    let comments = await Comment.find({ postId }).lean();
    res.json({ comments });
  } catch (err) {
    console.error(err);
  }
});















// // //댓글 조회
// router.get("/comment/get/:id",  authMiddleware,async (req, res) => {
//   const { id } = req.params;
//   console.log(id)
//   const comment_list = await Comment.find({ postId: id })
//     .exec();
//   console.log(comment_list);

//   if (!comment_list.length) {
//     res.send({
//       alert: "댓글이 없습니다.",
//     });
//     return;
//   }
//   res.json({
//     comment_list: comment_list,
//   });
// });


//댓글 삭제

router.delete("/comments/delete/:_Id", authMiddleware, async (req, res) => {
  const { commentId } = req.params;
  await Comment.deleteOne({ commentId });
  res.send({ result: '삭제완료' });
});

module.exports = router;

