import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import logo from "../../assets/logo.jpg";

export default function LoginPage() {
  const [email, setEmail] = useState("Your Email");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");

  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/users/google`, {
          token: res.access_token,
        })
        .then((res) => {
          if (res.data.message === "User created") {
            toast.success("Your Account is created. Now you can login via Google.");
          } else if (res.data.user) {
            localStorage.setItem("token", res.data.token);
            if (res.data.user.type === "admin") {
              window.location.href = "/admin";
            } else {
              window.location.href = "/";
            }
          } else {
            toast.error("Unexpected response from server");
            console.log(res.data);
          }
        });
    },
  });

  function login() {
    axios
      .post("http://localhost:5000/api/users/login", {
        email : email,
        password : password,
      })
      .then((res) => {
        if (!res.data.user) {
          toast.error(res.data.message);
          return;
        }
        toast.success("Login successful");
        localStorage.setItem("token", res.data.token);
        if (res.data.user.type === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      });
  }
  
  function register() {
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Split full name into first and last names
  const nameParts = name.trim().split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ") || "-";

    axios
      .post("http://localhost:5000/api/users/register", {
        firstName,
        lastName,
        email,
        password,
      })
      .then((res) => {
        if (res.data.user) {
          toast.success("Account created! You can now login.");
          setIsRegistering(false);
        } else {
          toast.error(res.data.message || "Registration failed");
        }
      })
      .catch(() => {
        toast.error("Registration failed. Try again.");
      });
  }

  return (
    <div className="w-full h-screen bg-background flex justify-center items-center">
      <div className="w-[450px] min-h-[520px] bg-surface rounded-2xl shadow-lg flex flex-col items-center justify-center p-6">
        <img src={logo} alt="Logo" className="rounded-full w-[100px] mb-4" />
        <h2 className="text-heading text-xl font-semibold mb-4">
          {isRegistering ? "Create an Account" : "Welcome Back"}
        </h2>

        {isRegistering && (
          <>
            <label className="text-text w-full mb-1">Name</label>
            <input
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md bg-white text-text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
            />
          </>
        )}

        <label className="text-text w-full mb-1">Email</label>
        <input
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md bg-white text-text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
        />

        <label className="text-text w-full mb-1">Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md bg-white text-text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your Password"
        />

        <button
          className="w-full py-2 bg-primary text-white rounded-md hover:bg-accent transition-all duration-300 mb-3"
          onClick={isRegistering ? register : login}
        >
          {isRegistering ? "Sign Up" : "Login"}
        </button>

        {!isRegistering && (
          <button
            onClick={googleLogin}
            className="w-full py-2 bg-white text-text border border-primary rounded-md hover:bg-accent hover:text-white transition-all duration-300 mb-3"
          >
            Login with Google
          </button>
        )}

        <p
          onClick={() => setIsRegistering(!isRegistering)}
          className="text-sm text-text hover:underline cursor-pointer"
        >
          {isRegistering
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
}
