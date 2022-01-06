const { User } = require('../Model/user')
const { login_history } = require('../Model/loginHistory')
const { SOCKET } = require('../Controller/socket')
const mongoose = require('mongoose')

async function addUser(data) {
    try {
        data = await User.create(data)
        sendSocketEvent(data)
        return data;

    } catch (err) {
        console.log("-----------", err);
        return err;
    }
}

async function findUserDetails(data) {
    try {

        return await new Promise((res, rej) => {
            User.findOne(data, (err, data) => {
                if (err) {
                    rej(err)
                }
                res(data)
            })
        })



    } catch (err) {
        console.log(err);
    }


}

async function insertLoginHistory(data) {
    try {
        return await new Promise((res, rej) => {
            login_history.create(data, (err, data) => {
                if (err) {
                    rej(err)
                }
                res(data)
            })
        })
    } catch (err) {
        console.log(err);
    }
}


async function logoutUser(userId) {
    console.log("userId12", userId);
    try {
        let match = {

            // userId: mongoose.Types.ObjectId(userId)
            UserId: mongoose.Types.ObjectId(userId)

        }
        // let update = { $set: { islogin: false } }
        let update = { $set: { IsLogin: false } }
        return await new Promise((res, rej) => {
            login_history.updateOne(match, update, (err, data) => {
                if (err) {
                    rej(err)
                }
                res(data)
            })

        })
    } catch (err) {
        console.log(err);
    }
}

async function getUserList() {
    try {
        let data = await User.find({})
        //console.log(data);
        return data;

    } catch (err) {
        console.log(err);
    }
}
async function sendSocketEvent(data) {

    try {
        //let socketId=getSocketIdFromRedis(userId)
        SOCKET.client.to("UserRoom").emit("UserList", { userList: data });
        //send event one to one user
        SOCKET.client.to("SocketId").emit("UserList", { userList: data })//put the socket id here
    } catch (err) {
        console.log("-----------", err);
        return err;
    }
}
module.exports = { addUser, findUserDetails, insertLoginHistory, logoutUser, getUserList }
