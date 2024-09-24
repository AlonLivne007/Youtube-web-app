import { useState, useEffect } from 'react';
import axios from 'axios';
import { json } from 'react-router-dom';

export const CurrentUserState = () => {
    //defualt user to browse the app without logging in
    const defualtUser = { "username": "username", "password": "", "nickname": "nickname", "avatar": "/localPhotos/defualtAvatar.png" };
    
    //state of current user 
    const [currentUser, setCurrentUser] = useState(() => {
        //retrieve user from localStorage if available
        const savedUser = localStorage.getItem('currentUser');
        if(savedUser !== null){
            return JSON.parse(savedUser); 
        };
        return defualtUser;
      });

    //fetch user from server
    const handleLogin = async (loggedInUser) => {
        try {
            //send get request to server
            const response = await axios.get(`http://localhost:80/api/users/${loggedInUser._id}`);
            console.log(response.data.message); //log the status message
            console.log(response.data.loggedInUser); //log the user

            //set the user
            setCurrentUser(response.data.loggedInUser);

            //store the user in storage
            localStorage.setItem('currentUser', JSON.stringify(response.data.loggedInUser)); 

            //send a post request to create a token
            const tokenResponse = await axios.post('http://localhost:80/api/tokens', { userId: loggedInUser._id });
            localStorage.setItem('token', tokenResponse.data.token); 
        }
        catch (error) {
            console.error('Error logging in:', error);
        }
    };

    //useEffect hook to bring the currentUser from storage
    useEffect(() => {
        //retrieve user from localStorage on component mount
        const savedUser = localStorage.getItem('currentUser');

        //if user is in storage, set it
        if (savedUser) {
          setCurrentUser(JSON.parse(savedUser));
        }
      },
      //dependencies
       []);

    //function to handleSignOut
    const handleSignOut = (user) => {
        //set the defualt user
        setCurrentUser(user);

        //store the defualt user in storage
        localStorage.setItem('currentUser', JSON.stringify(user));

        //delete the token
        localStorage.setItem('token', null);
    };

    //function of delete user
    const handleDeleteUser = async (loggedInUser) => {
        try {
            //fetch token from storage
            const token = localStorage.getItem('token');

            //send a delete request to server
            const response = await axios.delete(`http://localhost:80/api/users/${loggedInUser._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data.message); //log the status message
        }
        catch(error) {
            console.error('Error deleting user:', error);
        }
    };

    return { defualtUser, currentUser, setCurrentUser, handleLogin, handleSignOut, handleDeleteUser };
};
