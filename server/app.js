const express = require("express");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const config = require("./config/key");
const cors = require("cors");
const recommendRouter = require("./routes/recommendation");
const searchPlace = require("./routes/searchPlace");
const resultRouter = require("./routes/result");
const shareRouter = require("./routes/share");
const assessRouter = require("./routes/assess");

const app = express();

app.set("port", process.env.PORT || 5000);
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //true가 강력
app.use(
  cors({
    origin: "http://localhost:3000/" /*나중에 변경*/,
    credentials: true,
  })
);
app.use(cookieParser());

app.use(
  session({
    secret: "sm",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, //true로 나중에 바꾸기
  })
);

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));
app.get("/favicon.ico", (req, res) => res.status(204));
app.post("/main", (req, res) => {
  console.log(req.body);
  console.log("***req:'userID': ", req.body.userID);
  const userID = req.body.userID;
  res.cookie("userID", encodeURIComponent(userID));
  res.send();
  /* req.session.test = "test-string";
  req.session.save(() => {
    req.sessionID = req.
    /*res.send(req.sessionID);*/
  /* console.log("req.ression: ", req.session);
  });
  res.send(req.sessionID);*/
});

app.use("/recommendation", recommendRouter);
app.use("/budget", searchPlace);
app.use("/result", resultRouter);
app.use("/share", shareRouter);
app.use("/assess", assessRouter);
app.get("/main", (req, res) => {
  res.send("서버연결성공");
});

app.listen(app.get("port"), () => {
  console.log("익스프레스 서버 실행 중");
});
