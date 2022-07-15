var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
        content: String,
        description: String,
        title: String,
        urlToImage: String,
});



var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        email : String,
        password : String,
        token : String,
        wishList: [articleSchema],
    });

var UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;