import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import "./login.css";
import { useDispatch } from "react-redux";
import { setAuthData } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useTokenData } from "../../customHooks/useTokenData";

const Login = () => {
  let dispatch=useDispatch();
  let navigate=useNavigate();  
  return (
    <>
      <div className="login-page">
        <div>Login Page</div>
       
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log("success message")
              dispatch(setAuthData(credentialResponse))
              navigate("/dashboard")
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            useRedirect={true}  
          />
   
      </div>
    </>
  );
};

export default Login;
