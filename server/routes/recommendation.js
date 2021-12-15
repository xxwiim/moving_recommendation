const express = require("express");
const spawn = require("child_process").spawn;
const iconv = require("iconv-lite");
const router = express.Router();

let address,
  price,
  transit,
  options = [];
let resultPy;
let name;
let test;

router.post("/input", (req, res, err) => {
  console.log(req.body);

  address = req.body.address;
  price = req.body.price;
  console.log("price: ", price);
  transit = req.body.transit;
  req.session.transit_mode = transit;
  limit = req.body.limit;
  option = req.body.option;
  option = option.filter((element, i) => element != null);
  console.log(option);
  console.log("받았습니당!");
  console.log(req.session);
  resultPy = spawn("python", [
    "../server/python/recommendation.py",
    address,
    price[0],
    price[1],
    transit,
    limit,
    option,
  ]);
  resultPy.stdout.on("data", function (data) {
    req.session.recommendResult = data.toString();

    console.log("세션: ", req.session);
    console.log("결과: ", req.session.recommendResult);
    let result = JSON.parse(req.session.recommendResult);

    const idx = Object.keys(result[0]).indexOf("공시가격");
    let index = [];
    for (let x in result[1]) {
      index.push(x);
    }
    let content1 = [];
    content1.push(result[1]["index"]);
    content1.push(result[1]["공시가격"]);

    propcon1 = [];
    for (let i = 2; i < idx; i++) {
      prop = [`${index[i]} : ${result[1][index[i]]}개 `];
      propcon1.push(prop);
    }
    content1.push(propcon1);
    content1.push(result[1]["교통편"] / 60);
    content1.push(req.session.transit_mode);

    //content2
    let index2 = [];
    for (let x in result[2]) {
      index2.push(x);
    }
    let content2 = [];
    content2.push(result[2]["index"]);
    content2.push(result[2]["공시가격"]);

    propcon2 = [];
    for (let i = 2; i < idx; i++) {
      prop = [`${index2[i]} : ${result[2][index2[i]]}개 `];
      propcon2.push(prop);
    }
    content2.push(propcon2);
    content2.push(result[2]["교통편"] / 60);
    content2.push(req.session.transit_mode);
    //content3
    let index3 = [];
    for (let x in result[3]) {
      index3.push(x);
    }
    let content3 = [];
    content3.push(result[3]["index"]);
    content3.push(result[3]["공시가격"]);

    propcon3 = [];
    for (let i = 2; i < idx; i++) {
      prop = [`${index3[i]} : ${result[3][index3[i]]}개 `];
      propcon3.push(prop);
    }
    content3.push(propcon3);
    content3.push(result[3]["교통편"] / 60);
    content3.push(req.session.transit_mode);

    total_result = [content1, content2, content3];
    console.log(`프론트에 ${total_result} 을 보냈어요`);
    res.send(total_result);
  });

  resultPy.stderr.on("data", function (data) {
    console.log(data.toString());
  });
});

router.get("/addressformap", (req, res, err) => {
  console.log("요청이 들어옴");
  let result = JSON.parse(req.session.recommendResult);
  addrName1 = result[1].index;
  addr1 = result[1].좌표.split(",");
  addrName2 = result[2].index;
  addr2 = result[2].좌표.split(",");
  addrName3 = result[3].index;
  addr3 = result[3].좌표.split(",");

  res1 = [addrName1, addr1].flat();
  res2 = [addrName2, addr2].flat();
  res3 = [addrName3, addr3].flat();
  console.log([res1, res2, res3]);
  res.send([res1, res2, res3]);
});

module.exports = router;
