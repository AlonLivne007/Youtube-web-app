
function verifyCredentials({ users }){
    //extract the credentials
    var checkUserName = document.getElementById("floatingInput").value;
    var checkPassword = document.getElementById("floatingPassword").value;

    //check username
    //initialize flag 
    var flag = 0;
    var checkUser;
    if(checkUserName === ""){
        alert("enter username!");
        return null;
    }

    for(let user of users){
        if(checkUserName === user.username){
            flag = 1;
            checkUser = user;
        }
    }

    if(flag === 0){
        alert("username is not a member!");
        return null;
    }

    //check password
    if(checkPassword === ""){
        alert("enter password!");
        return null;
    }

    if(checkPassword !== checkUser.password){
        alert("password is not a match!")
        return null;
    }


    //if passed all tests, return user object
    return checkUser;
}

export default verifyCredentials;