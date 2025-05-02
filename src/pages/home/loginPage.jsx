import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

export default function LoginPage(){

    const [email, setEmail] = useState("Your Email")
    const [password, setPassword] = useState("")

    function login(){
        axios.post("import.meta.env.VITE_BACKEND_URL/api/users/login",{
            email : email,
            password : password
        }).then(
            (res)=>{
                console.log(res)
                if(res.data.user==null){
                    toast.error(res.data.message)
                    return
                }
                toast.success("Login success")
                localStorage.setItem("token" ,res.data.token)
                if(res.data.user.type =="admin"){
                    window.location.href = "/admin"
                }else{
                    window.location.href = "/"
                }
            }
        )
    }

    return(
        <div className="w-full h-screen bg-red-500 flex justify-center items-center">
            <div className="w-[450px] h-[450px] bg-blue-400 flex flex-col items-center justify-center">
                <img src="/logo.png" className="rounded-full w-[100px]" />
                <span>Email</span>
                <input className="bg-white" defaultValue={email} onChange={(e)=>{setEmail(e.target.value)}} />
                <span>Password</span>
                <input type="password" className="bg-white mb-2" defaultValue={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <button className="bg-white cursor-pointer" onClick={login}>login</button>
            </div>
        </div>
    )
}


//import.meta.env.VITE_BACKEND_URL/api/products