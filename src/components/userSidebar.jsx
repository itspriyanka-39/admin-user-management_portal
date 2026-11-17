
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCircle,
  Headset,
  LogOut,
  ShieldCheck
} from 'lucide-react';

function UserSidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    const confirmed = window.confirm('Are you sure you want to logout?');

  if (confirmed) {
    sessionStorage.clear();
    window.location.href = '/login';
  }
}

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <ShieldCheck size={24} />
        </div>
        <div>
          <h2>TaskManager</h2>
          <span>User Panel</span>
        </div>
      </div>

      <div className="sidebar-menu">
        <p className="menu-heading">MENU</p>

        <NavLink to="/user-panel" end className="menu-link">
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/my-profile" className="menu-link">
          <UserCircle size={19} />
          <span>My Profile</span>
        </NavLink>

        <NavLink to="/support-center" className="menu-link">
          <Headset size={19} />
          <span>Support Center</span>
        </NavLink>
      </div>

      <div className="sidebar-bottom">
        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={19} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default UserSidebar;

