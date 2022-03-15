const express = require("express");
const { Mongoose } = require("mongoose");
const { Region } = require("../models/Region");
const router = express.Router();
const { User } = require("../models/User");

// router.get("/share/:userID/:requestTime/", (req, res) => {
//   console.log(req.params);
//   const userID = req.params.userID;
//   const requestTime = req.params.requestTime;
//   const query = {
//     userID: `${userID}`,
//     requestTime: `${requestTime}`,
//   };
//   User.findOne(query, (err, user) => {
//     console.log("있으면?", user);
//     res.send(user);
//   });
// });

// const userCreate = (query1) => {
//   User.create(query1);
// };

router.post("/:userID/:requestTime/", (req, res) => {
  const resultForSession = req.body.resultForSession;
  console.log("받음", resultForSession[0]);
  const userID = resultForSession[0]["userID"];
  const requestTime = resultForSession[1];
  const result1 = resultForSession[2];
  const result2 = resultForSession[3];
  const result3 = resultForSession[4];
  const query = {
    userID: `${userID}`,
    requestTime: `${requestTime}`,
  };
  //원래있는지 찾아볼것

  User.findOne(query, (err, user) => {
    console.log("있으면?", user);
    if (user === null) {
      const query1 = {
        userID: `${userID}`,
        requestTime: `${requestTime}`,
        result1: `${result1}`,
        result2: `${result2}`,
        result3: `${result3}`,
      };

      userCreate(query1);
    }
  });
});

router.get("/popup/", (req, res) => {
  console.log(req.query.dong_name);
  let dong_name = req.query.dong_name;
  console.log(dong_name);
  Region.findOne({ address: dong_name }, (err, dong) => {
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
