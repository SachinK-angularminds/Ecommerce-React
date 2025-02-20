import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  let tokenData=useSelector(state=>state?.authReducer?.authData?.credential)
  
    if (!tokenData) {
      return <Navigate to={"/login"} replace />;
    }  
    return <Outlet />;
  };
  