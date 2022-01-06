const express = require("express");
const { validatorUserSchema, validatorUserLoginSchema, validatorAdminSchema, validatorAdminLoginSchema } = require('./Controller/schemaValdn')
const { createUser } = require('./Controller/createUser')
const { userLogin, adminGenerateAccessToken } = require('./Controller/setToken')
const { findUserDetails } = require('./View/userQuery');
const { sendMailViaSmtp } = require('./Controller/mailer')
const { validatorUserToken } = require('./Controller/valdnUserToken')
const { findUserList } = require('./Controller/getUserList')
const req = require("express/lib/request");
const res = require("express/lib/response");
const { matchPassword } = require('./Controller/setToken')
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
})
// routes

router.post('/registerUser', validatorUserSchema, async (req, res) => {
    let data = req.body
    try {
        data = await createUser(data);
        sendMailViaSmtp()
        res.send(data)
    } catch (error) {
        res.send(error.errors.Email.message)
    }
});
router.get('/userList', async (req, res) => {
    let data = await findUserList();
    res.send(data)
});
router.post('/loginUser', validatorUserLoginSchema, async (req, res) => {
    let userDetails = await findUserDetails(req.body)
    if (!userDetails) {
        res.send("User Not Registered")
    }
    let isPasswordMatched = await matchPassword(req.body.Password, userDetails.hash, userDetails.salt);
    if (!isPasswordMatched) {
        res.send("Password is incorrect")
    }
    else {
        let userToken = await userLogin(userDetails, req.body);
        console.log(userToken);
        res.send(userToken)
    }
});
module.exports = { router }
