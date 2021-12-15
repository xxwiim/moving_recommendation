const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  console.log("err");
  console.log(req.body);
});

router.get("/search", (req, res) => {
  console.log(req.body);
  let work_location = req.body.location;
  res.send(`http:map.kakao.com/link/search/${work_location}`); //위치검색 페이지 보내기
});

module.exports = router;
