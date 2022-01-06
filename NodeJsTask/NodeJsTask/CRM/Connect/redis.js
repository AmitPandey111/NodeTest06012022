const redis = require("redis");
const jwt = require('jsonwebtoken');
let { createClient } = require('redis');
let Redis = {}
class RedisConnect {
  constructor() {

  }

  async startRedisConnection() {
    try {
      const client = createClient();
      Redis.client = client
      client.on('error', (err) => console.log('Redis Client Error', err));
      await client.set('key', 'value1');
    
    } catch (error) {

    }
  }
}
const redisInstance=new RedisConnect()
//redisInstance.startRedisConnection()
module.exports = { redisInstance ,Redis}


