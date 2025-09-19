import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import {validateEmail} from "../../utils/helper";
import axiosInstance from "../../utils/axioslnstance";
import { API_PATHS } from "../../utils/apiPath";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Email validation function
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle Login form Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    //  Login API call 


    try{
      const response = await axiosInstance.post(API_PATHS .AUTH.LOGIN, {
        email,
        password,
      });
      const { token } = response.data;
       if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard");
       }
      } catch (error) {
        if (error.response && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("Something went wrong. Please try again.");
        }
      }
     
  };

  return (
    <AuthLayout>
      <div className="lg:w-[80%] md:w-[90%] w-full flex flex-col justify-center min-h-full px-6">
        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
          Welcome Back
        </h3>
        <p className="text-md text-gray-600 mt-2 mb-8">
          Sign in to continue tracking your business performance.
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="sashika@example.com"
            type="email"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Character"
            type="password"
          />

          {error && 
            <p className="text-red-500 text-sm font-medium">{error}</p>}
          
          <button
            type="submit"
            className="btn-primary"
          >
            LOGIN
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Don’t have an account?{" "}
            <Link
              className="font-medium text-primary underline"
              to="/signup"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
