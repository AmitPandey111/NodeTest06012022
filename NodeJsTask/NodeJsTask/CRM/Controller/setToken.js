const { rediscl } = require('../Connect/redis')
const { redisInstance, Redis } = require('../Connect/redis')
const { insertLoginHistory } = require('../View/userQuery')
const { createHmac, randomBytes } = require("crypto");
const jwt = require('jsonwebtoken')
async function userLogin(data, params) {
    let userData = {
        Name: data.Name,
        Email: data.Email,
        Address: data.Address,
        UserId: data._id

    }
    let userToken = jwt.sign(userData, "Test@123");
    console.log(data._id);
    let _id = JSON.parse(JSON.stringify(data._id))
    console.log(_id);
    Redis.client.set(_id, userToken)  // set data into redis
    //Update Login History
    let loginData = {
        UserId: data._id,
        DeviceId: params.DeviceId,
        DeviceToken: params.DeviceToken,
        IsLogin: true,
        Token: userToken
    }
    await insertLoginHistory(loginData)

    return userToken;
}
async function adminGenerateAccessToken(data) {
    let adminData = {
        username: data.username,
        password: data.password,
        RoleAdmin: data.RoleAdmin,
        userId: data._id,
        firstName: data.firstName

    }
    let adminToken = jwt.sign(adminData, "Test@1234", { expiresIn: '1h' });///encrypted data
    console.log(data._id);
    let _id = JSON.parse(JSON.stringify(data._id))
    console.log(_id);
    Redis.client.set(_id, adminToken)  // set data into redis
    return adminToken;
}
const matchPassword = async function (password, dbHash, salt) {
    if (!salt) return false;
    const hash = encryptHashPassword(password, salt);
    console.log('hash', hash, dbHash, salt);

    if (dbHash !== hash) {
        return false;
    } else {
        return true;
    }
};
const encryptHashPassword = function (password, salt) {
    const hash = createHmac("sha512", salt); /** Hashing algorithm sha512 */
    hash.update(password);
    return hash.digest("hex");
};
module.exports = { userLogin, adminGenerateAccessToken, matchPassword }