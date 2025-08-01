import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import DashboardProfile from "../components/dashboardProfile/DashboardProfile";

const Layout = () => {
  return (
    <div>
      <div className="fixed top-0 z-50">
        <Header />
        <DashboardProfile />
      </div>
      <div className="mt-66">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
