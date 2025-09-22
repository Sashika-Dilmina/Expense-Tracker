import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "../../components/layouts/Navbar";
import SideMenu from './SideMenu';

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Navbar always visible */}
      <Navbar activeMenu={activeMenu} />

      <div className="flex">
        {/* Remove user check for debugging */}
        <div className="w-64 bg-white min-h-screen shadow-md">
          <SideMenu activeMenu={activeMenu} />
        </div>
        <div className="grow mx-5">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;