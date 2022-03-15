const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userID: {
      type: String,
      maxlength: 100,
    },
    requestTime: {
      type: String,
    },
    result1: {
      type: String,
    },
    result2: {
      type: String,
    },
    result3: {
      type: String,
    },
    feedback1: {
      type: String,
    },
    feedback2: {
      type: String,
    },
    feedback3: {
      type: String,
    },
  },
  { collection: "user" }
);

const User = mongoose.model("user", userSchema, "user");
module.exports = { User };
