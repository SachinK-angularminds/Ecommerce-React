import { Outlet } from "react-router-dom";

export const Layout = ({ children }) => {
    return <div style={{ padding: '1rem 0' }}><Outlet /></div>;
  };