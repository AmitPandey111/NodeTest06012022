//Require Mongoose
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const { createHmac, randomBytes }=require("crypto");

//Define a schema
//var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    Name: {type: String, required: true},
    Email: {type: String, required: true,unique:true},
    Address: {type: String, required: true},
    hash: {type: String, required: true},
    Img: {type: String, required: true},
    salt: {type: String, required: true},
});

const genRandomString = function (length) {
	return randomBytes(Math.ceil(length / 2))
		.toString("hex") /** convert to hexadecimal format */
		.slice(0, length);   /** return required number of characters */
};

const encryptHashPassword = function (password,salt ) {
	const hash = createHmac("sha512", salt); /** Hashing algorithm sha512 */
	hash.update(password);
	return hash.digest("hex");
};
UserSchema.index({Email:1})
UserSchema.plugin(uniqueValidator);
//Load password virtually
UserSchema.virtual("Password")
	.get(function () {
		return this._Password;
	})
	.set(function (Password) {
		this._Password = Password;
		var salt = this.salt = genRandomString(10);
		console.log("salt===", salt);
		this.hash = encryptHashPassword(Password, salt);
        console.log(this.hash);
	});

//Export function to create "SomeModel" model class
const User = mongoose.model('User', UserSchema );
module.exports={User}
