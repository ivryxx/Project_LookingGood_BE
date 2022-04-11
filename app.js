const express = require("express");
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

// app.js;
const multer = require("multer");
let storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
let upload = multer({ dest: "uploads/" });
let toImage = multer({ storage: storage });

app.use("/users", express.static("uploads"));

app.listen(port, () => {
  console.log(port, "포트가 켜졌습니다.");
});
