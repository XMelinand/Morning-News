var express = require("express");
var router = express.Router();
var UserModel = require("../models/users");
var bcrypt = require('bcrypt');
var uid2 = require('uid2');

var errPwd = "Invalid password";
var errMail = "Invalid email";

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json("index");
});
// SIGN UP
router.post("/sign-up", async function (req, res, next) {
  let userFind = await UserModel.findOne({ email: req.body.email });
  var result = false;
  var error;
  var emptyValue = true;
  var success = false;


  if (
    req.body.email &&
    req.body.firstName &&
    req.body.lastName &&
    req.body.password
  ) {
    emptyValue = false;
  }
  if (emptyValue == false) {
    // Password encryption
const cost = 10;
const hash = bcrypt.hashSync(req.body.password, cost);

    var newUser = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      token: uid2(32)
    });
    var newUserSaved = await newUser.save();
    success = true;
  } else if (userFind) {
    error = "You are already signed up";
  } else if (
    !req.body.email ||
    !req.body.password ||
    !req.body.lastName ||
    !req.body.firstName
  ) {
    error = "Please fill all fields";
  }

  if (newUserSaved) {
    result = true;
  }
  //RES.JSON
  res.json({ result, newUserSaved, error, emptyValue, success });
});

// SIGN-IN
router.post("/sign-in", async function (req, res, next) {
  var userFind = await UserModel.findOne({ email: req.body.email });
  console.log(userFind);
  var error;
  var logged = false;

  if( !req.body.email || !req.body.password) {
    error = "Please fill all fields";
  }
  else if (!userFind) { 
    error = errMail
  }
  else if (userFind && userFind.password != req.body.password) {
      error = errPwd;
    }
  else if (userFind && userFind.password == req.body.password) {
    logged = true;
  }

  // RES.JSON
  res.json({ userFind, logged, error});
});

module.exports = router;
