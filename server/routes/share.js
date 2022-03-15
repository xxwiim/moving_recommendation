const express = require("express");
const router = express.Router();
const { User } = require("../models/User.js");

router.post("/:userID/:requestTime", (req, res) => {
  console.log();
  const userID = req.body.data.userID;
  const requestTime = req.body.data.requestTime;
  console.log("uu", userID);
  console.log(requestTime);
  const query = {
    userID: userID,
    requestTime: requestTime,
  };
  User.findOne(query, (err, user) => {
    console.log("있으면?", user);
    res.send(user);
    console.log("보냄");
    return user;
  });
});

module.exports = router;
