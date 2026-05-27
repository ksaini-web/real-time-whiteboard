import axios from "axios";


// Signup api

export async function signup(data) {

  const response = await axios.post(
    `"https://real-time-whiteboard-backend-1.onrender.com"/auth/signup`,
    data

  );

  return response.data;
  
}

//Login 


export async function login(data) 
{

  const response = await axios.post(
    `"https://real-time-whiteboard-backend-1.onrender.com"/auth/login`,
    data
  );

  return response.data;
  
}