import "./App.css";
import Dashboard from "./dashboard/Dashboard";
import Login from "./auth/login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import Users from "./users/Users";
import { ProtectedRoute } from "./ProtectedRoutes";
import { useTokenData } from "./customHooks/useTokenData";

function App() {
  const users = [
    { id: "1", fullName: "Robin Wieruch" },
    { id: "2", fullName: "Sarah Finnley" },
  ];

  // credential
  let tokenStatus=useTokenData();
  return (
    <>
      <Routes>
        {/* Root path ("/") - Redirect to either /login or /dashboard depending on user status */}
        <Route
          path="/"
          element={
            tokenStatus ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />

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
