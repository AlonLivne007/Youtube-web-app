export function VerifyVideo({currentUser, newVideo, jwt}) {
    //first check if user is logged in using token
    if(jwt === 'null' || !jwt){
        alert("You need to log in in order to add a new video!");
        return false;
    }

    //check if title field is empty
    var title = document.getElementById("title-input").value;
    if(title === ""){
        alert("Enter title!");
        return false;
    }
    //check if description field is empty
    var description = document.getElementById("description-input").value;
    if(description === ""){
        alert("Enter description!");
        return false;
    }

    //check if video was uploaded
    if(newVideo === null){
        alert("Upload a video!");
        return false;
    }

    //return true if everything was valid
    return true;
}