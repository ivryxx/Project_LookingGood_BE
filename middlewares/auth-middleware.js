// const jwt = require("jsonwebtoken")
// const User = require("../schemas/user")
// module.exports = (req, res, next) => {
//     const { authorization } = req.headers;
//     const [tokenType, tokenValue] = authorization.split(' ');
//     if (tokenType !== 'Bearer') {
//         res.status(401).send({
//             errorMessage: '로그인 후 사용하세요',
//         })
//         return;
//     }
//     try {
//         const { userId } = jwt.verify(tokenValue, "lookinggood6-secret-key")
//         // console.log(userId)
//         let a = User.findById(userId)
//         User.findById(userId).exec().then((user) => {
//             res.locals.user = user;
//             // console.log(a)
//             next()
//         })
//     }   catch (error) {
//         res.status(401).send({
//             errorMessage: '로그인 후 사용하세요',
//         })
//         return;
//     }
// }