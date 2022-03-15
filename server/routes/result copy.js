const express = require("express");
const { Mongoose } = require("mongoose");
const { Dong } = require("../models/Dong");
const router = express.Router();

router.get("/popup/", (req, res) => {
  console.log(req.query.dong_name);
  let dong_name = req.query.dong_name;
  console.log(dong_name);
  Dong.findOne({ address: dong_name }, (err, dong) => {
    if (err) {
      console.log(err);
    } else popupResult = dong;
    res.send(popupResult);
    console.log(popupResult);
  });
});

// router.get("/content/:id", (req, res) => {
//   console.log(req.session.recommendResult);
//   result = req.session.recommendResult;
//   console.log("요청", result);
//   res.send(req.result);
//   // idx = Object.keys(result[0]).indexOf("공시가격");
//   // let index = [];
//   // for (let x in result[req.params.id]) {
//   //   index.push(x);
//   // }
//   // let content1 = [];
//   // content1.push(result[req.params.id]["index"]);
//   // content1.push(result[req.params.id]["공시가격"]);

//   // propcon = [];
//   // for (let i = 2; i < idx; i++) {
//   //   prop = [`${index[i]} : ${result[req.params.id][index[i]]}개 `];
//   //   propcon.push(prop);
//   // }
//   // content1.push(propcon);
//   // content1.push(result[req.params.id]["교통편"] / 60);
//   // content1.push(req.session.transit_mode);

//   // res.send(content1);
// });

module.exports = router;
