const express = require('express')
const Mongoose = require('mongoose')
const Comments = require('../routes/comments')
// const authMiddleware = require('../middlewares/auth-middleware')

const router = express.Router()

//댓글 작성
router.post('/:comments/:postId', authMiddleware, async (req, res) => {
  const { postId } = req.body
  const { comment } = req.body
  const { user } = res.locals
  const userId = user.userId
//   let date = new Date().toISOString()

  try {
    const _id = new Mongoose.Types.ObjectId()
    await Comments.create({ _id, postId, comment, user,userId })

    await Posts.findOneAndUpdate(
      { _id: postId },
      { $push: { commentId: _id } }
    )
    res.send({ result: 'success' })
  } catch (err) {
    console.error(err)
    res.send({ result: 'fail' })
  }
})


//댓글 삭제
router.delete(
    '/comments/:commentId',
    authMiddleware,
    async (req, res) => {
      const { postId, commentId } = req.params
      const { user } = res.locals
      const userId = user.userId
      const c_userId = await Comments.findOne({ _id: commentId })
  
      try {
        if (c_userId.userId === userId) {
          await Posts.findOneAndUpdate(
            { _id: postId },
            { $pull: { commentId: commentId } }
          )
    
          await Comments.deleteOne({ commentId })
          res.send({ result: 'success' })
        } else {
          res.send({ msg: '내 댓글이 아닙니다.' })
        }
      } catch (err) {
        console.log(err)
        res.status(400).send({ result: '관리자에게 문의하세요!' })
      }
      
    }
  )
  
  module.exports = router