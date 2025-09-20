import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Inline email validation function
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  // Handle Sign Up Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError(""); 
    
    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/register", { // replace with your backend API
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email: email.trim(),
          password,
          profilePic
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful!");
        navigate("/login"); // go to login page
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p>Join us today by entering your details below.</p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Inuka"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="inuka@example.com"
              type="email"
            />

            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 Characters"
                type="password"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <button type="submit" className="btn-primary">
            SIGN UP
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;