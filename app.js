const express = require('express')
const mongoose = require('mongoose')

app.use(express.json());

app.listen(5000, () => {
    console.log("서버가 요청을 받을 준비가 되었어요!")
})