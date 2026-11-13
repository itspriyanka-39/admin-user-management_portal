
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

import Sidebar from './components/sidebar';
import Navbar from './components/navbar';

import Dashboard from './pages/dashboard';
import Users from './pages/users';
import SupportRequests from './pages/supportRequests';
import Login from './pages/login';
import UserPanel from './pages/userPanel';

function Layout() {
  const location = useLocation();
  const role = sessionStorage.getItem('userRole');

  if (!role) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  if (role === 'user') {
    return (
      <Routes>
        <Route path="/user-panel" element={<UserPanel />} />
        <Route path="*" element={<Navigate to="/user-panel" replace />} />
      </Routes>
    );
  }

  if (role === 'admin') {
    return (
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/support-requests" element={<SupportRequests />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    );
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
