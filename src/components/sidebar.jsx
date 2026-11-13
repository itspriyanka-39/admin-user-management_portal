
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  LogOut,
  ShieldCheck
} from 'lucide-react';

function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    const confirmed = window.confirm('Are you sure you want to logout?');

    if (confirmed) {
      sessionStorage.clear();
      navigate('/login');
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
          <span>Admin Panel</span>
        </div>
      </div>

      <div className="sidebar-menu">
        <p className="menu-heading">MENU</p>

        <NavLink to="/" end className="menu-link">
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/users" className="menu-link">
          <Users size={19} />
          <span>Users</span>
        </NavLink>

        <NavLink to="/support-requests" className="menu-link">
          <MessageSquare size={19} />
          <span>Support Requests</span>
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

export default Sidebar;
