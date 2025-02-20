import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthData } from "../../redux/authSlice";

const RedirectHandler = () => {
  const [loading, setLoading] = useState(true); // To handle loading state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Get the code from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");
    console.log("Authorization Code: ", authCode);
debugger
    if (authCode) {
      // If there's an authorization code, proceed with token exchange
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
            redirect_uri: "http://localhost:3000/dash", // Make sure this matches your registered redirect URI
            client_id: "a7b340dd-4bf4-49e1-869d-d7ce69bf97d9", // Your client ID
            client_secret: "muaoe5k60o", // Your client secret
          }),
        }
      );
      const data = await response.json();
      console.log("Token Exchange Data:", data);

      if (data.access_token) {
        // Store the access token, for example, in Redux or localStorage
        dispatch({ type: "SET_ACCESS_TOKEN", payload: data.access_token });

        // Navigate to the dashboard after successful login
        navigate("/dashboard");
      } else {
        // If no access token is received, redirect to login page
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching access token", error);
      navigate("/login"); // In case of an error, redirect to login
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div> // You can customize this as a loader
      ) : (
        <div>Redirecting...</div>
      )}
    </div>
  );
};

export default RedirectHandler;
