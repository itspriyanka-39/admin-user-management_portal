
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

import Sidebar from './components/sidebar';
import UserSidebar from './components/userSidebar';
import Navbar from './components/navbar';

import Dashboard from './pages/dashboard';
import Users from './pages/users';
import SupportRequests from './pages/supportRequests';
import Login from './pages/login';
import Register from './pages/register';
import UserPanel from './pages/userPanel';
import MyProfile from './pages/myProfile';
import SupportCenter from './pages/supportCenter';

// Admin Layout
function AdminLayout() {
  return (
    <div className="app">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route
            path="/support-requests"
            element={<SupportRequests />}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

// User Layout
function UserLayout() {
  return (
    <div className="app">
      <UserSidebar />

      <main className="main-content">
        <Navbar />

        <Routes>
          <Route path="/user-panel" element={<UserPanel />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route
            path="/support-center"
            element={<SupportCenter />}
          />

          <Route
            path="*"
            element={<Navigate to="/user-panel" replace />}
          />
        </Routes>
      </main>
    </div>
  );
}

// Main Layout
function Layout() {
  useLocation();

  const role = sessionStorage.getItem('userRole');

  // Login and Register pages
  if (!role) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    );
  }

  // User routes
  if (role === 'user') {
    return <UserLayout />;
  }

  // Admin routes
  if (role === 'admin') {
    return <AdminLayout />;
  }

  return <Navigate to="/login" replace />;
}


function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
