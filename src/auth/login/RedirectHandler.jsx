import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthData } from "../../redux/authSlice";

const RedirectHandler = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Get the code from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");
    console.log("Authorization Code: ", authCode);
    if (authCode) {
        fetchAccessToken(authCode);
    } else {
      // If no code is found, redirect to login page
      navigate("/login");
    }
  }, [navigate]);

  const fetchAccessToken = async (authCode) => {
    try {
      const response = await fetch(
        "https://api.upstox.com/v2/login/authorization/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "accept":"application/json"
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            code: authCode,
            redirect_uri: "http://localhost:3000/dash", 
            client_id: "a7b340dd-4bf4-49e1-869d-d7ce69bf97d9",
            client_secret: "muaoe5k60o",
          }),
        }
      );
      const data = await response.json();
      if (data.access_token) {
        // Store the access token, for example, in Redux or localStorage
        dispatch(setAuthData(data));
        // Navigate to the dashboard after successful login
        navigate("/dashboard");
      } else {
        // If no access token is received, redirect to login page
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching access token", error);
      navigate("/login"); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div> 
      ) : (
        <div>Redirecting...</div>
      )}
    </div>
  );
};

export default RedirectHandler;
