import React from "react";
import { useDispatch } from "react-redux";
import { setAuthData } from "../../redux/authSlice"; // Assuming you are storing auth data in redux
import { GoogleLogin } from "@react-oauth/google"; // Google Login component
import { useNavigate } from "react-router-dom"; // For navigation
import "./login.css";

// Helper function to generate the Upstox OAuth URL
const constructOAuthUrl = (clientId, redirectUri) => {
  return `https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}`;
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <div className="login-page">
      <h2>Login Page</h2>

      {/* Google Login Button */}
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={handleGoogleLoginError}
        useRedirect={true}
      />

      {/* Upstox Login Button */}
      <div>
        <button onClick={handleUpstoxLogin}>Login with Upstox</button>
      </div>
    </div>
  );
};

export default Login;
