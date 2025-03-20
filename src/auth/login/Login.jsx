import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthData } from "../../redux/authSlice"; 
import { GoogleLogin } from "@react-oauth/google"; 
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { emailValidation, passwordValidation } from "../../utils/utils";
import { postApi } from "../../api/api";

// Helper function to generate the Upstox OAuth URL
const constructOAuthUrl = (clientId, redirectUri) => {
  return `https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}`;
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const [loginObj, setLoginObj] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});

  // Handle Google Login success
  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log("Google login success:", credentialResponse);
    dispatch(setAuthData(credentialResponse)); // Store the Google login data in redux
    navigate("/dashboard"); // Redirect to the dashboard after successful login
  };

  // Handle Google Login failure
  const handleGoogleLoginError = () => {
    console.log("Google login failed");
  };

  // Handle Upstox Login (trigger OAuth flow)
  const handleUpstoxLogin = () => {
    const oauthUrl = constructOAuthUrl(
      "a7b340dd-4bf4-49e1-869d-d7ce69bf97d9", // Replace with your actual client ID
      "http://localhost:3000/dash" // Redirect URL after Upstox login (should match what you registered)
    );

    // Redirect to Upstox OAuth page
    window.location.href = oauthUrl;
  };

  //handling login object with checking the validation
  const handleLoginObj = (inputState, inputValue) => {
    setLoginObj({ ...loginObj, [inputState]: inputValue });

    //checking the error on onChange event
    if (inputState === "email") {
      let emailStatus =inputValue === ""?true: emailValidation(inputValue);
      setErrors((prevState) => {
        return {
          ...prevState,
          emailStatus,
          emailMessage: emailStatus?"":"Enter Valid Mail Address.",
        };
      });
    }
    if(inputState === "password"){
      let passwordStatus=inputValue === ""?true:passwordValidation(inputValue)
      setErrors((prevState)=>{
        return {
          ...prevState,
          passwordStatus,
          passwordMessage:passwordStatus?"":"Enter Valid Password."

        }
      })
    }
  };

  const validateLoginForm = () => {
    if(errors?.emailStatus && errors?.passwordStatus) return false
    return true
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!validateLoginForm()){
      const {email,password}=loginObj
      const loginResponse=await postApi("/api/v1/auth/login",{email,password})
    }  
    
  };
  return (
    <div className="login-page">
      {/* Upstox Login Button */}
      <div>
        <button onClick={handleUpstoxLogin}>Login with Upstox</button>
      </div>

      <div className="font-sans mt-5 flex items-center justify-center px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full p-4 m-4 shadow-md rounded-md">
          <div className="md:max-w-md w-full px-4 py-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-12">
                <h3 className="text-gray-800 text-3xl font-extrabold">
                  Signed in
                </h3>
                <p className="text-sm mt-4 text-gray-800">
                  Don't have an account?{" "}
                  <a
                    href="#"
                    className="text-blue-600 font-semibold hover:underline ml-1"
                  >
                    Register here
                  </a>
                </p>
              </div>
              <div>
                <label htmlFor="email" className="text-gray-800 text-xs block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={loginObj?.email}
                  onChange={(e) => handleLoginObj("email", e.target.value)}
                  
                  className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 pl-2 pr-8 py-3 outline-none"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <p>{errors?.emailMessage}</p>
              </div>
              <div className="mt-8">
                <label htmlFor="password" className="text-gray-800 text-xs block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={loginObj?.password}
                  name="password"
                  id="password"
                  onChange={(e) => handleLoginObj("password", e.target.value)}
                  
                  className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 pl-2 pr-8 py-3 outline-none"
                  placeholder="Enter password"
                />
              </div>
              <div>
                <p>{errors?.passwordMessage}</p>
              </div>
              <div className="flex items-center justify-between gap-4 mt-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={loginObj?.rememberMe}
                    name="rememberMe"
                    onChange={(e) =>
                      handleLoginObj("rememberMe", !loginObj?.rememberMe)
                    }
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label className="ml-3 text-sm text-gray-800">
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-blue-600 font-semibold text-sm hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full shadow-xl py-2.5 px-4 mt-12 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                disabled={()=>validateLoginForm()}
              >
                Sign in
              </button>
              {/* Google Login Button */}
              <div className="mt-3">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginError}
                  useRedirect={true}
                />
              </div>
            </form>
          </div>
          <div className="w-full flex items-center bg-[#000842] rounded-xl p-8">
            <img
              src="https://readymadeui.com/signin-image.webp"
              className="w-full object-contain"
              alt="login-image"
              style={{ width: "400px", height: "420px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
