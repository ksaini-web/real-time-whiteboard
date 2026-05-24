import { useState } from "react";
import { signup } from "../api/authApi";

import { Link , useNavigate} from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

function Signup() {

    const[name , setName] = useState("");
    const[email , setEmail] = useState("");
    const[password,setPassword] = useState("");
    const navigate= useNavigate()


    async function handleSignUp() {

        try{
            const response =

            await signup({
                name,email,password,
            });

            console.log(response);

            alert("Signup success");
            localStorage.setItem("user",JSON.stringify(response));
            localStorage.setItem("token",response.token);
            navigate("/dashboard")
        }
        catch(error){
            console.log(error);

            alert("Signup failed");

        }
        
    }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 px-4 py-10">
    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl shadow-indigo-100/60 sm:p-8">
    <div className="mb-8 text-center">
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-blue-600 text-sm font-bold text-white">
            EB
        </div>
        <h1 className="text-2xl font-bold text-gray-950">
            Create your account
        </h1>
        <p className="mt-2 text-sm text-gray-500">
            Start a workspace for boards, chat, and visual planning.
        </p>
    </div>

    <div className="space-y-4">
    <label className="block">
        <span className="mb-2 block text-sm font-medium text-gray-700">Name</span>
        <Input
        required
        placeholder="Your name"
        value={name}
        onChange={(e)=>
            setName(e.target.value)
        }
        className="invalid:border-red-300 invalid:focus:ring-red-500"
        />
    </label>

    <label className="block">
        <span className="mb-2 block text-sm font-medium text-gray-700">Email</span>
        <Input
        required
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        className="invalid:border-red-300 invalid:focus:ring-red-500"
        />
   </label>

   <label className="block">
       <span className="mb-2 block text-sm font-medium text-gray-700">Password</span>
       <Input
       required
       type="password"
       placeholder="Create a password"
       value={password}
        onChange={(e)=>setPassword(e.target.value)}
       className="invalid:border-red-300 invalid:focus:ring-red-500"
       />
   </label>

   <Button onClick={handleSignUp} className="w-full">Signup</Button>
   </div>

   <p className="mt-6 text-center text-sm text-gray-600">
    Already have an account?{" "}
    <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
        Login
    </Link>
   </p>
   </div>
    </div>
  )
}

export default Signup
