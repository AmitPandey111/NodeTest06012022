const { addUser } = require('../View/userQuery')
async function createUser(data) {
    try {
        let UserData = await addUser(data)
        return UserData;
    } catch (error) {
  return error;
    }
}
module.exports = { createUser }

