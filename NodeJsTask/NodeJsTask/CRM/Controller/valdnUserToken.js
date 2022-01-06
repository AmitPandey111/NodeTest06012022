const { date } = require('joi');
var jwt = require('jsonwebtoken');
const { Redis } = require('../Connect/redis')
const validatorUserToken = async (req, res, next) => {
    let tokenData = req.query.Token
    console.log("token data", tokenData);
    var decoded = jwt.verify(tokenData, 'Test@123');//decrypt token and return original data
    console.log("decoded with _id" + JSON.stringify(decoded));
    // console.log(decoded.userId);
    console.log(decoded.UserId);
    // if(decoded.exp<new Date().getTime()){
    //     res.send("Token Expire")
    // }

    let isExist = await new Promise((res, rej) => {
        let x = Redis.client.get(decoded.UserId, (err, data) => {
            res(data)
        })
    })
    console.log("isExist=" + isExist);
    console.log('decrypted data', isExist);
    if (isExist) {
        req.idInfo = decoded;
        console.log("requUserInfo=" + req.idInfo);
        next()

    }
    else res.send('No Access!!')
}

module.exports = { validatorUserToken }