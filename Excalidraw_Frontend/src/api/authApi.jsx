import axios from "axios";


// Signup api

export async function signup(data) {

  const response = await axios.post(
    `http://localhost:8080/auth/signup`,
    data

  );

  return response.data;
  
}

//Login 


export async function login(data) 
{

  const response = await axios.post(
    `http://localhost:8080/auth/login`,
    data
  );

  return response.data;
  
}