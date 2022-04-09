const mongoose = require("mongoose");

const postSchema = mongoose.Schema({   //Schema 생성
    postId : {
        type: String,
        unique : true, //유니크 값
        required : true //필수 값
    },
    title : {        //게시글 제목
        type: String
    },
    userId : {     //사용자 이름
        type : String
    },
    contents : {     //게시글 내용
        type : String
    },
    category : {    //카테고리
        type : String
    }

});

module.exports = mongoose.model('Post', postSchema); //모델 이름 'Post' 
