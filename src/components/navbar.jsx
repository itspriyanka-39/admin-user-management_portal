
import { Bell, Search, UserCircle, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { search, setSearch } = useAppContext();
  const navigate = useNavigate();

  function handleClear() {
    setSearch('');
  }

  return (
    <header className="navbar">
      <div className="navbar-search">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search users or support requests..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <button onClick={handleClear} title="Clear search">
            <X size={16} />
          </button>
        )}
      </div>

      <div className="navbar-right">
        <button className="notification-button">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <div className="admin-profile">
          <div className="admin-avatar">
            <UserCircle size={25} />
          </div>

          <div>
            <h4>Admin</h4>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
