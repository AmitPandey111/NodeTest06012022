//Require Mongoose
const { boolean } = require('joi');
var mongoose = require('mongoose');
var loginSchema = new mongoose.Schema({
    UserId: { type: mongoose.Types.ObjectId, required: true },
    DeviceId: { type: String, required: true },
    DeviceToken: { type: String, required: true },
    IsLogin: { type: Boolean, required: true },
    Token: { type: String, required: true }
});

//Export function to create "SomeModel" model class
const login_history = mongoose.model('login_history', loginSchema);
module.exports = { login_history }
