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

const app = express();

app.set("port", process.env.PORT || 5000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000/",
    credentials: true,
  })
);
app.use(cookieParser());

app.use(
  session({
    secret: "sm",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.get("/main", (req, res) => {
  req.session.test = "test-string";
  req.session.save(() => {
    res.send("세션 생성 완료");
    console.log(req.sessionID);
  });
});

app.use("/recommendation", recommendRouter);
app.use("/budget", searchPlace);
app.use("/result", resultRouter);

app.get("/main", (req, res) => {
  res.send("서버연결성공");
});

app.listen(app.get("port"), () => {
  console.log("익스프레스 서버 실행 중");
});
