//express 모듈 불러오기
const express = require("express");
const connect = require("./schemas");
const cors = require("cors");
const app = express();
// const port = 3000;

connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(7000, () => {
  console.log("서버가 정상적으로 켜졌습니다.");
});