const {getUserList}=require('../View/userQuery')
async function findUserList(){
    let UserListData=await getUserList()
    console.log(UserListData);
    return UserListData;
}
module.exports={findUserList}

