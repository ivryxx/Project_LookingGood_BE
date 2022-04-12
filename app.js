const express = require("express");
const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const connect = require("./schemas");
const cors = require("cors");
const app = express();
const port = 3000;

let s3 = new aws.S3({ accessKeyId: "AKIASZONATOAZMARYUSU", secretAccessKey: "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" });

s3.getObject({ Bucket: "lookinggood", Key: "1649765198988" }, (err,data)=>{
  if(err)console.error(err);
  console.log(data)
  require("fs").writeFileSync("./result.png", data.Body.toString("base64"), {encoding: "base64"})

});
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "lookinggood",
    // acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

 app.post("/single", upload.single("image"), (req, res) => {
   console.log(req.file);
   res.send("Single File upload success");
 });

connect();

const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");
const commentsRouter = require("./routes/comments");

app.use(cors());
app.use(express.static("static"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", [postsRouter, usersRouter, commentsRouter]);

app.listen(port, () => {
  console.log(port, "포트가 켜졌습니다.");
});
