import { useState, useEffect } from 'react';
import axios from 'axios';

export const UsersState = () => {
//state of list of users to access from across the program
const [users, setUsers] = useState([]);

//add a new user function
const addUser = async (newUser) => {
  try {
    const response = await axios.post('http://localhost:80/api/users', newUser);
    setUsers([...users, response.data.newUser]);
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

//fetch users
useEffect(() => {
  const fetchUsers = async () => {
    try {
      //send a get request to fetch users
      const response = await axios.get('http://localhost:80/users/fetchUsers');
      console.log(response); 
      if (Array.isArray(response.data.users)) {
        setUsers(response.data.users);
      } else {
        console.error('Fetched users data is not an array:', response.data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  fetchUsers();
}, []);

return {users, addUser};
};
