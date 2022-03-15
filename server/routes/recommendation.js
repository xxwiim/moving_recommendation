const { query } = require("express");
const express = require("express");
const spawn = require("child_process").spawn;
const iconv = require("iconv-lite");
const router = express.Router();
const { Rate } = require("../models/Rate");

let address,
  price,
  transit,
  options = [];
let resultPy;
let name;
let test;

function numberFormat(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function numberToKorean(number) {
  Math.round(number);
  var inputNumber = number < 0 ? false : number;
  var unitWords = ["", "만 ", "억 ", "조 ", "경 "];
  var splitUnit = 10000;
  var splitCount = unitWords.length;
  var resultArray = [];
  var resultString = "";

  for (var i = 0; i < splitCount; i++) {
    var unitResult =
      (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }

  for (var i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
    resultString =
      String(numberFormat(resultArray[i])) + unitWords[i] + resultString;
  }

  return resultString;
}

router.post("/input", (req, res, err) => {
  try {
    console.log("cookie: ", req.cookies);
    console.log(req.body);
    requestTime = req.body.requestTime;

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
      "../server/python/recommend.py",
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
      if (req.session.recommendResult == "error\r\n") {
        console.log("error400");
        res.status(400).send("bad request");
        return;
      }

      let result = JSON.parse(req.session.recommendResult);
      console.log(result[0]);
      console.log(result[1]);
      console.log(result[2]);

      const idx = Object.keys(result[0]).indexOf("교통편"); //1
      let index = [];
      for (let x in result[0]) {
        index.push(x);
      }
      let content1 = [];
      content1.push(result[0]["address"]);
      content1.push(numberToKorean(result[0]["공시가격"]));

      propcon1 = [];
      for (let i = 3; i < idx; i++) {
        prop = [[`${index[i]}`], [`${result[0][index[i]]}`]];

        propcon1.push(prop);
      }
      content1.push(propcon1);
      content1.push(result[0]["교통편"] / 60);
      content1.push(req.session.transit_mode);

      //content2
      let index2 = [];
      for (let x in result[1]) {
        index2.push(x);
      }
      let content2 = [];
      content2.push(result[1]["address"]);
      content2.push(numberToKorean(result[1]["공시가격"]));

      propcon2 = [];
      for (let i = 3; i < idx; i++) {
        prop = [[`${index2[i]}`], [`${result[1][index[i]]}`]];
        propcon2.push(prop);
      }
      content2.push(propcon2);
      content2.push(result[1]["교통편"] / 60);
      content2.push(req.session.transit_mode);
      //content3
      let index3 = [];
      for (let x in result[2]) {
        index3.push(x);
      }
      let content3 = [];
      content3.push(result[2]["address"]);
      content3.push(numberToKorean(result[2]["공시가격"]));

      propcon3 = [];
      for (let i = 3; i < idx; i++) {
        prop = [[`${index3[i]}`], [`${result[2][index[i]]}`]];
        propcon3.push(prop);
      }
      content3.push(propcon3);
      content3.push(result[2]["교통편"] / 60);
      content3.push(req.session.transit_mode);

      total_result = [req.cookies, requestTime, content1, content2, content3];
      console.log(`프론트에 ${total_result} 을 보냈어요`);
      res.send(total_result); //result 삭제하기
    });

    resultPy.stderr.on("data", function (data) {
      console.log(data.toString());
    });
  } catch (err) {
    print("오류입니다");
    if (err) res.status(400).send("bad request");
  }
});

router.get("/addressformap", (req, res, err) => {
  console.log("요청이 들어옴");
  let result = JSON.parse(req.session.recommendResult);
  addrName1 = result[0].address;
  addr1 = result[0].좌표.split(",");
  addrName2 = result[1].address;
  addr2 = result[1].좌표.split(",");
  addrName3 = result[2].address;
  addr3 = result[2].좌표.split(",");

  res1 = [addrName1, addr1].flat();
  res2 = [addrName2, addr2].flat();
  res3 = [addrName3, addr3].flat();
  console.log([res1, res2, res3]);
  res.send([res1, res2, res3]);
});

router.post("/getRate", (req, res, err) => {
  console.log("등급요청이 들어왔어요");
  const region1 = req.body.region1;
  const region2 = req.body.region2;
  const region3 = req.body.region3;
  const IndexList = req.body.IndexList;
  const length = IndexList.length;
  console.log("인덱스리스트: ", IndexList.length);
  console.log("IndexList[0][0]", IndexList[0][0][0]);
  console.log("IndexList[0][0]", IndexList[1][0][0]);

  const value = [];
  for (let i = 0; i < length; i++) {
    value.push(IndexList[i][0][0]);
  }
  console.log(value);
  const query = { _id: 0 };
  value.forEach(function (item, index, arr2) {
    query[item] = 1;
  });
  console.log(query);
  const jsonQuery = JSON.stringify(query);
  console.log("여기?");
  const result = [];

  Rate.find({ address: [region1] }, query)
    .exec()
    .then((res1) => {
      console.log("1", res1);
      result.push(res1[0]);
    })
    .then(() => {
      Rate.find({ address: [region2] }, query)
        .exec()
        .then((res2) => {
          console.log("2", res2);
          result.push(res2[0]);
        })
        .then(() => {
          Rate.find({ address: [region3] }, query)
            .exec()
            .then((res3) => {
              console.log("3", res3);
              result.push(res3[0]);
              console.log(result);
              res.send(result);
            });
        });
    });

  // (err, res1) => {
  //   console.log("1", res1);
  //   result.push(res1);
  //   console.log(result);
  // });
  // Rate.find({ address: [region2] }, query, (err, res1) => {
  //   console.log("2", res1);
  //   result.push(res1);
  //   console.log(result);
  // });
  // Rate.find({ address: [region3] }, query, (err, res1) => {
  //   console.log("3", res1);
  //   result.push(res1);
  //   console.log(result);
  // });

  // Rate.findOne({ name: 'zerocho' }).exec()
  // .then((result) => {
  //   return Users.update({ name: result.name }, { updated: true }).exec();
  // })
  // .then((updatedResult) => {
  //   console.log(updatedResult);
  // })
  // .catch((err) => {
  //   console.error(err);
  // });
  // Rate.find({ address: [region1] }, query, (err, res1) => {
  //   result.push(res1);
  //   Rate.find({ address: [region2] }, query, (err, res2) => {
  //     result.push(res2);
  //     Rate.find({ address: [region3] }, query, (err, res3) => {
  //       result.push(res3);
  //       res.send(result);
  //     });
  //   });
  // });

  /* Rate.find(
    {
      $or: [
        { address: [region1] },

        { address: [region2] },
        { address: [region3] },
      ],
    },

    query,
    (err, result) => {
      res.send(result);
      console.log(result);
      console.log("보냄");
    }
  );*/

  //db.user.find({ $or:[ {part:'server', part:'client'} ] },{})
});

module.exports = router;
