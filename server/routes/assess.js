const express = require("express");
const router = express.Router();
const { User } = require("../models/User.js");

router.post("/:userID/:requestTime", (req, res) => {
  console.log("assess받음!!!!!!!!");

  const resultForSession = req.body["resultForSession"];
  const result1 = resultForSession[2];
  const result2 = resultForSession[3];
  const result3 = resultForSession[4];
  const userID = req.body["resultForSession"][0]["userID"];
  const requestTime = req.body["resultForSession"][1];
  const feedbackNo = req.body["feedbackNo"];
  const assess = req.body["assess"];
  // console.log(resultForSession);
  // console.log(userID);
  // console.log(requestTime);
  console.log(feedbackNo);
  console.log(assess);
  const query1 = {
    userID: userID,
    requestTime: requestTime,
  };
  User.findOne(query1, (err, user) => {
    if (user === null) {
      //기록없는 유저
      const query2 = {
        userID: `${userID}`,
        requestTime: `${requestTime}`,
        result1: `${result1}`,
        result2: `${result2}`,
        result3: `${result3}`,
        [feedbackNo]: `${assess}`,
      };
      User.insertMany(query2);
      console.log("기록이 없는 유저입니다, 저장완료");
    } else {
      //기록이 있는
      const query3 = {
        //유저 기록이 있지만 해당 장소 추천기록이 없는 or 해당장소 추천 기록있는데 수정
        userID: `${userID}`,
        requestTime: `${requestTime}`,
      };
      User.updateOne(query3, { $set: { [feedbackNo]: `${assess}` } }); //덮어쓰던말던 상관 x
    }
    console.log("기록이 있어요, 업데이트완료!");
  });
});
// const query = {
//   userID: userID,
//   requestTime: requestTime,
//   feedbackNo: { $exists: false }, //평가한 과거이력이 있는지
// };

// User.FindOne(query, (err, user) => {
//   console.log("있으면?", user);
//   if (user !== null) {
//     user.upate(`{$set: ${feedbackNo}: ${assess}}`);
//   }
//   if (user === null) {
//     const query1 = {
//       userID: `${userID}`,
//       requestTime: `${requestTime}`,
//       result1: `${result1}`,
//       result2: `${result2}`,
//       result3: `${result3}`,
//       feedbackNo: `${assess}`,
//     };

//     userCreate(query1);
//   }
// });

module.exports = router;
