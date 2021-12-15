const mongoose = require("mongoose");

const dongSchema = mongoose.Schema(
  {
    address: {
      type: String,
      maxlength: 100,
    },
    공시가격: {
      type: String,
      trim: true,
      unique: 1,
    },
    좌표: {
      type: String,
      minlength: 5,
    },
    초등학교: {
      type: Number,
      maxlength: 10,
    },
    중학교: {
      type: Number,
      maxlength: 10,
    },
    고등학교: {
      type: Number,
      maxlength: 10,
    },
    유치원: {
      type: Number,
      maxlength: 10,
    },
    학원: {
      type: Number,
      maxlength: 10,
    },
    병원: {
      type: Number,
      maxlength: 10,
    },
    약국: {
      type: Number,
      maxlength: 10,
    },
    보건소: {
      type: Number,
      maxlength: 10,
    },
    헬스장: {
      type: Number,
      maxlength: 10,
    },
    체육관: {
      type: Number,
      maxlength: 10,
    },
    수영장: {
      type: Number,
      maxlength: 10,
    },
    영화관: {
      type: Number,
      maxlength: 10,
    },
    카페: {
      type: Number,
      maxlength: 10,
    },
    공원: {
      type: Number,
      maxlength: 10,
    },
    놀이터: {
      type: Number,
      maxlength: 10,
    },
    도서관: {
      type: Number,
      maxlength: 10,
    },
    백화점: {
      type: Number,
      maxlength: 10,
    },
    대형마트: {
      type: Number,
      maxlength: 10,
    },
    복합쇼핑센터: {
      type: Number,
      maxlength: 10,
    },
    시장: {
      type: Number,
      maxlength: 10,
    },
    사회복지관: {
      type: Number,
      maxlength: 10,
    },
  },
  { collection: "dong" }
);

const Dong = mongoose.model("dong", dongSchema, "dong");
module.exports = { Dong };
