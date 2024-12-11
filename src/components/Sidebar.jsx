import React from "react";
import { useNavigate } from "react-router";
import { Home, User, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../store/userSlice";
import { persistor } from "../store/store";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Add logout logic here
    dispatch(logout()); // Replace with actual logout action
    persistor.purge();
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>HandyGuys</h1>
      </div>

      <div className="sidebar-menu">
        <div className="sidebar-item" onClick={() => navigate("/home")}>
          <Home size={20} />
          <span>Home</span>
        </div>

        <div className="sidebar-item" onClick={() => navigate("/profile")}>
          <User size={20} />
          <span>Profile</span>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-item logout" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
