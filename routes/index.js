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
  var userFind = await UserModel.findOne({ email: req.body.email });
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
  if (emptyValue == false && !userFind) {
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
  if (newUserSaved){
    res.json({result, newUserSaved, error, emptyValue, success, userToken : newUserSaved.token });
  } else {
  res.json({ result, error, emptyValue, success, userToken : userFind.token });}
});

// SIGN-IN
router.post("/sign-in", async function (req, res, next) {
  var userFind = await UserModel.findOne({ email: req.body.email });
  console.log(userFind);
  var error;
  var passOk = false;
  var logged = false;

  var password = req.body.password
if (bcrypt.compareSync(password, userFind.password)) {
  passOk = true 
}

  if( !req.body.email || !password) {
    error = "Please fill all fields";
  }
  else if (!userFind) { 
    error = errMail
  }
  else if (userFind && !passOk) {
      error = errPwd;
    }
  else if (userFind && passOk) {
    logged = true;
  }

  // RES.JSON
  res.json({ userFind, logged, error,  userToken: userFind.token });
});

router.post("/addArticle", async function (req, res, next) {
  var userFind = await UserModel.findOne({ token: req.body.userToken});
  console.log(userFind);
  userFind.wishList.push(
    {
    content :req.body.content, 
    description :req.body.description, 
    title :req.body.title, 
    urlToImage :req.body.urlToImage, 
    }
  );
  await userFind.save();
  res.json({ success: true, userFind});
});

module.exports = router;
