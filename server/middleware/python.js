const { PythonShell } = require("python-shell");
//const python_exec = PythonShell();
const pythonPath = "C:/Python39/python.exe";
const itnPath = "C:/proj/server/python/";
const itnFile = "recommendation.py";
const text = "매개변수";

let options = {
  mode: "text",
  pythonPath: pythonPath,
  pythonOptions: [-u],
  scriptPath: itnPath,
  args: [text],
  encoding: "utf8",
};

PythonShell.run(itnFile, options, function (err, results) {
  if (err) {
    console.log(err);
  }

  let data = result[0] / replace(`b\'`, "").replace(`\'`, "");
  let buff = Buffer.from(data, "base64");
  let test = buff.toString("utf-8");
});
