const mongoose = require("mongoose");
require("dotenv").config();
DB=process.env.DB_NAME
console.log(DB)

const connect = () => {
  mongoose
    .connect(
      'mongodb+srv://lookingGood:1234qwer@cluster0.cpnlv.mongodb.net/',
      {}
    )
    .catch((err) => console.log(err));
};

mongoose.connection.on("error", (err) => {
  console.log("몽고디비 연결 에러", err);
});




module.exports = connect;
