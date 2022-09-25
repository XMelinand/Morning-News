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

// ADD LIKED ARTICLE TO DB
router.post("/addArticle", async function (req, res, next) {
  var success = false;
  var userFind = await UserModel.findOne({ token: req.body.userToken});
    
  if(userFind){
  var findArticle = false;
  for (let i = 0; i < userFind.wishList.length; i++) {
  if (userFind.wishList[i].title == req.body.title) {
      findArticle = true;
  }
}
if (!findArticle) {
  userFind.wishList.push(
    {
    content :req.body.content, 
    description :req.body.description, 
    title :req.body.title, 
    urlToImage :req.body.urlToImage, 
    }
  );
  var articleSaved = await userFind.save();
  if(articleSaved){
    success = true;
  }}
  }

  res.json({ success: success, userFind});
});

//LOAD LIKED ARTICLES FROM DB
router.post("/loadArticles", async function (req, res, next) {
  var success = false;
  var logged;

  let userFind = await UserModel.findOne({token: req.body.userToken});
  if(userFind){
  let wishList = userFind.wishList;
  success = true;
  logged=true;
  console.log('DB wishlist', wishList);

  res.json({success, logged, wishList})
}
else { 
  logged = false
  res.json({ success,logged, error: 'you must be logged in'})
}
})
// .then(function (
// REMOVE LIKED ARTICLE FROM DB
router.delete("/deleteArticles", async function (req, res, next) {
  var success = false;
  console.log(req.body.position, req.body.userToken);
  let userFind = await UserModel.findOne({token: req.body.userToken});
  if(userFind){
    userFind.wishList.splice(req.body.position,1)
    await userFind.save()
  res.json({success})
  }
})
module.exports = router;
