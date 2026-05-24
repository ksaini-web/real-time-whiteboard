import { login } from '../api/authApi'
import { useState } from 'react'
import { Link , useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";


function Login() {

   const[email,setEmail] = useState("");
   
   const[password,setPasswod] = useState("");

   const navigate = useNavigate();

   async function handlyLogin() {

    try{

        const response = await login({

            email,
            password,
        });

        console.log(response);

        localStorage.setItem("user",JSON.stringify(response));
        localStorage.setItem("token",response.token);
         alert("Login Success");
         navigate("/dashboard")
    }
   catch(error){

    console.log(error);
    alert("Login failed");

   }
}


  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl shadow-blue-100/60 sm:p-8">
            <div className="mb-8 text-center">
                <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-blue-600 text-sm font-bold text-white">
                    EB
                </div>
                <h1 className="text-2xl font-bold text-gray-950">Welcome back</h1>
                <p className="mt-2 text-sm text-gray-500">
                    Login to open your collaborative boards.
                </p>
            </div>

            <div className="space-y-4">
                <label className="block">
                    <span className="mb-2 block text-sm font-medium text-gray-700">Email</span>
                    <Input
                    type="email"
                    placeholder='you@example.com'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                </label>

                <label className="block">
                    <span className="mb-2 block text-sm font-medium text-gray-700">Password</span>
                    <Input
                    type="password"
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e)=>setPasswod(e.target.value)}
                    />
                </label>

                <Button onClick={handlyLogin} className="w-full">
                    Login
                </Button>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
                New here?{" "}
                <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-700">
                    Create an account
                </Link>
            </p>
        </div>
    </div>
  )
}

export default Login
