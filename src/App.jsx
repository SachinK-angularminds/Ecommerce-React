import "./App.css";
import Dashboard from "./dashboard/Dashboard.jsx";
import Login from "./auth/login/Login.jsx";
import Users from "./users/Users.jsx";
import { ProtectedRoute } from "./ProtectedRoutes.jsx";
import { useTokenData } from "./customHooks/useTokenData.js";
import RedirectHandler from "./auth/login/RedirectHandler.jsx";
import Navbar from "./common/Navbar.jsx";
import Pagination from "./common/Pagination.jsx";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  const users = [
    { id: "1", fullName: "Robin Wieruch" },
    { id: "2", fullName: "Sarah Finnley" },
  ];

  // credential
  let tokenStatus = useTokenData();
  return (
    <>
      <Routes>
        {/* Root path ("/") - Redirect to either /login or /dashboard depending on user status */}
        <Route
          path="/"
          element={
            tokenStatus ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/dash" element={<RedirectHandler />} />
        {/* public routes pages */}

        <Route
          path="login"
          element={tokenStatus ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="signup"
          element={tokenStatus ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="forgot-password"
          element={tokenStatus ? <Navigate to="/dashboard" /> : <Login />}
        />

        {/* private routes pages */}
        <Route element={<ProtectedRoute />}>
          <Route path="users" element={<Users />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* routes for no matches */}
        <Route path="*" element={NoMatch} />
      </Routes>
    </>
  );
}
const NoMatch = () => {
  return <p>There's nothing here: 404!</p>;
};
export default App;
