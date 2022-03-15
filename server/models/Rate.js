const mongoose = require("mongoose");

const rateSchema = mongoose.Schema(
  {
    address: {
      type: String,
      maxlength: 100,
    },
    초등학교: {
      type: String,
      maxlength: 10,
    },
    중학교: {
      type: String,
      maxlength: 10,
    },
    고등학교: {
      type: String,
      maxlength: 10,
    },
    "유치원 및 어린이집": {
      type: String,
      maxlength: 10,
    },
    학원: {
      type: String,
      maxlength: 10,
    },
    "병의원 및 약국": {
      type: String,
      maxlength: 10,
    },
    보건소: {
      type: String,
      maxlength: 10,
    },
    응급의료기관시설: {
      type: String,
      maxlength: 10,
    },
    백화점: {
      type: String,
      maxlength: 10,
    },
    대형마트: {
      type: String,
      maxlength: 10,
    },
    복합쇼핑센터: {
      type: String,
      maxlength: 10,
    },
    시장: {
      type: String,
      maxlength: 10,
    },
    헬스장: {
      type: String,
      maxlength: 10,
    },
    수영장: {
      type: String,
      maxlength: 10,
    },
    체육관: {
      type: String,
      maxlength: 10,
    },
    공원: {
      type: String,
      maxlength: 10,
    },
    영화관: {
      type: String,
      maxlength: 10,
    },
    카페: {
      type: String,
      maxlength: 10,
    },
    도서관: {
      type: String,
      maxlength: 10,
    },
    놀이터: {
      type: String,
      maxlength: 10,
    },
    경로당: {
      type: String,
      maxlength: 10,
    },
    사회복지관: {
      type: String,
      maxlength: 10,
    },
    등산로: {
      type: String,
      maxlength: 10,
    },
    산책로: {
      type: String,
      maxlength: 10,
    },
    미세먼지: {
      type: String,
      maxlength: 10,
    },
    범죄안전등급: {
      type: String,
      maxlength: 10,
    },
    경찰관서: {
      type: String,
      maxlength: 10,
    },
    여성안심지킴이집: {
      type: String,
      maxlength: 10,
    },
  },
  { collection: "rate" }
);

const Rate = mongoose.model("rate", rateSchema, "rate");
module.exports = { Rate };
