
const {router}=require('./router')
const {}=require('./Controller/socket')
//Mongo connection 
const {mongoConnection}=require('./Connect/mongo')
const {redisInstance,Redis}=require('./Connect/redis')
async function start() {
    await mongoConnection()
    await redisInstance.startRedisConnection();
}
start()
//Server connection
const express = require("express");
const app = express();
app.listen(4000, () => console.log("*******Server is running*******"));
app.use(express.json())
app.use(router)

//console.log(new Date().getTime());

