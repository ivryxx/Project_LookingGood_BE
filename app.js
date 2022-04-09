const express = require("express");
const connect = require("./schemas");
const cors = require("cors");
const app = express();
const port = 3000;

connect();

app.use(cors());
app.use(express.json());
