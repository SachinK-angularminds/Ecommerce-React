import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./common/Navbar.jsx";

export const ProtectedRoute = () => {
  let tokenData = useSelector((state) =>
    state?.authReducer?.authData?.credential
      ? state?.authReducer?.authData?.credential
      : state.authReducer?.authData?.access_token
  );

  if (!tokenData) {
    return <Navigate to={"/login"} replace />;
  }
  return (
    <>
      <Navbar />
      <div className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className=" mx-auto max-w-screen-xl">
          <Outlet />
        </div>
      </div>
    </>
  );
};
