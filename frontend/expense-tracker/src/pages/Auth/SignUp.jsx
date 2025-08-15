import React, { useState }  from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";


const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [FullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //Handle signup submit form
  const handleSignUp = async (e) => {}


  return <AuthLayout>
            <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
              <h3 className="text-xl font-semibold text-black">Create an Account</h3>
              <p className="text-sm text-slate-700 mt-[5px] mb-6 ">Join us today by entering your details below</p>


              <form onSubmit={handleSignUp}>
                <ProfilePhotoSelector image={profilePic} setImage = {setProfilePic} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    value={FullName}
                    onChange={({target}) => setFullName(target.value)}
                    label= "FullName"
                    placeholder="Sashika"
                    type="text"
                    />
                   <Input
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    label="Email Address"
                    placeholder="sashika@example.com"
                    type="email"
                   />
                  
                  <div className="col-span-2">
                     <Input
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    label="Password"
                    placeholder="••••••••"
                    type="password"
                   />
                   
                   </div>

                  
          

                </div>
              </form>
            </div>

        </AuthLayout>;
};

export default SignUp;