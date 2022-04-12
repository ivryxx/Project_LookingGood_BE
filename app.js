const express = require("express");
const multer = require("multer");
const connect = require("./schemas");
const cors = require("cors");
const app = express();
const port = 3000;

connect();

const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");
const commentsRouter = require("./routes/comments");

app.use(cors());
app.use(express.static("static"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", [postsRouter, usersRouter, commentsRouter]);

app.get("/upload", function (req, res) {
  res.render("upload");
});

app.post("/upload", function (req, res) {
  res.send("업로드 성공!");
});



// const upload = multer({
//   storage: multer.diskStorage({
//     destination(req, file, cb) {
//       console.log("file!!!", file);
//       cb(null, "uploads");
//     },
//     filename(req, file, cb) {
//       const ext = path.extname(file.originalname);
//       cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
//     },
//   }),
//   limits: { fileSize: 5 * 1024 * 1024 },
// });




let fileStorageEngine = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./images");
  },
  filename: (req, file, cd) =>
  cd(null, Date.now() + '--' + file.originalname)
  });

  const upload = multer({ storage: fileStorageEngine })

  app.post("/single", upload.single('image'),(req, res) => {
    console.log(req.file);
    res.send("Single File upload success");
  });

  // app.post("/multiple", upload.array('images', 3),(req, res) => {
  //   console.log(req.files);
  //   res.send("Multiple Files Upload Success")
  // })

app.listen(port, () => {
  console.log(port, "포트가 켜졌습니다.");
});
