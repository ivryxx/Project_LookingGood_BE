const jwt = require("jsonwebtoken");
const User = require("../schemas/user");
require("dotenv").config();

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const [tokenType, tokenValue] = authorization.split(" ");
  console.log(tokenType, tokenValue);

  if (tokenType !== "Bearer") {
    return res.status(401).send({
      errorMessage: "로그인 후 사용하세요.",
    });
  }

  try {
    const { userId } = jwt.verify(tokenValue, process.env.SECRET_KEY);
    User.find({ userId }).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (error) {
    return res.status(401).send({
      errorMessage: "로그인 후 사용하세요.",
    });
  }
};
