
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import {
  LogOut,
  UserCircle,
  Ticket,
  Clock,
  CheckCircle
} from 'lucide-react';

function UserPanel() {
  const navigate = useNavigate();
  const { users, requests } = useAppContext();

  const userId = Number(sessionStorage.getItem('userId'));
  const currentUser = users.find(user => user.id === userId);

  const userRequests = requests.filter(
    request => request.userId === userId
  );

  const pending = userRequests.filter(
    request => request.status === 'Pending'
  ).length;

  const resolved = userRequests.filter(
    request => request.status === 'Resolved'
  ).length;

  function handleLogout() {
    const confirmed = window.confirm('Are you sure you want to logout?');

    if (confirmed) {
      sessionStorage.clear();
      navigate('/login');
    }
  }

  if (!currentUser) {
    return <p>User details not found.</p>;
  }

  return (
    <div className="user-panel-page">

      <div className="user-panel-header">
        <div>
          <h1>Welcome, {currentUser.name}!</h1>
          <p>Here's an overview of your account and support requests.</p>
        </div>

        <button className="user-logout-btn" onClick={handleLogout}>
          <LogOut size={17} />
          Logout
        </button>
      </div>

      <div className="user-profile-card">
        <div className="user-avatar">
          <UserCircle size={45} />
        </div>

        <div>
          <h2>{currentUser.name}</h2>
          <p>{currentUser.email}</p>
          <span className="user-role-badge">Registered User</span>
        </div>
      </div>

      <div className="user-stats-grid">

        <div className="user-stat-card">
          <div className="user-stat-icon purple">
            <Ticket size={23} />
          </div>
          <div>
            <h3>{userRequests.length}</h3>
            <p>Total Requests</p>
          </div>
        </div>

        <div className="user-stat-card">
          <div className="user-stat-icon orange">
            <Clock size={23} />
          </div>
          <div>
            <h3>{pending}</h3>
            <p>Pending Requests</p>
          </div>
        </div>

        <div className="user-stat-card">
          <div className="user-stat-icon green">
            <CheckCircle size={23} />
          </div>
          <div>
            <h3>{resolved}</h3>
            <p>Resolved Requests</p>
          </div>
        </div>

      </div>

      <div className="user-details-card">
        <h2>My Profile</h2>
        <div className="user-info-grid">
          <div>
            <span>Full Name</span>
            <strong>{currentUser.name}</strong>
          </div>
          <div>
            <span>Email Address</span>
            <strong>{currentUser.email}</strong>
          </div>
          <div>
            <span>Phone Number</span>
            <strong>{currentUser.phone}</strong>
          </div>
        </div>
      </div>

      <div className="user-requests-card">
        <div className="user-requests-heading">
          <div>
            <h2>My Support Requests</h2>
            <p>Track the progress of your submitted requests.</p>
          </div>
        </div>

        {userRequests.length === 0 ? (
          <p className="no-user-requests">No support requests found.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {userRequests.map(request => (
                  <tr key={request.id}>
                    <td>{request.subject}</td>
                    <td>{request.category}</td>
                    <td>{request.date}</td>
                    <td>
                      <span className={`user-status ${request.status.toLowerCase().replace(' ', '-')}`}>
                        {request.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}

export default UserPanel;
