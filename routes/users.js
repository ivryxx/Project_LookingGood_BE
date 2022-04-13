const express = require("express");
const User = require("../schemas/user");
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.SECRET_KEY;
const authMiddleware = require("../middlewares/auth-middleware");

//회원가입 양식
const postUsersSchema = Joi.object({
  userId: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{2,10}$")).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{4,20}$")).required(),
  confirmPassword: Joi.string().required(),
  userImageUrl: Joi.string().required(),
});

//회원가입
router.post("/signup", async (req, res) => {
  try {
    const { userId, password, confirmPassword, userImageUrl } =
      await postUsersSchema.validateAsync(req.body);

    if (password !== confirmPassword) {
      return res.status(400).send({
        errorMessage: "패스워드가 패스워드 확인란과 동일하지 않습니다.",
      });
    }

    const exitstUsers = await User.find({ userId });
    if (exitstUsers.length) {
      return res.status(400).send({
        errorMessage: "중복된 아이디가 존재합니다.",
      });
    }

    const user = new User({ userId, password, userImageUrl });
    await user.save();
    res.status(201).send({});
  } catch (error) {
    return res.status(400).send({
      errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
    });
  }
});

//로그인
router.post("/login", async (req, res) => {
  const { userId, password } = req.body;
  const user = await User.findOne({ userId, password });

  if (!user) {
    return res.status(400).send({
      errorMessage: "아이디 또는 비밀번호를 확인해주세요.",
    });
  }
  const token = jwt.sign({ userId: user.userId }, `${jwtSecret}`);
  res.send({ token });
});

// 정보 조회
router.get("/checkLogin", authMiddleware, async (req, res) => {
  const { user } = res.locals;
  res.send({
    userId: user[0].userId,
    userImageUrl: user[0].userImageUrl
  });
});


module.exports = router;
