
var mongoose = require('mongoose');
async function mongoConnection() {
    mongoose.connect('mongodb://localhost:27017/Db');
    console.log("********Database created*************");
}

module.exports={mongoConnection}