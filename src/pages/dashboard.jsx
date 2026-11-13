

import {
  Users, UserCheck, UserX, MessageSquare, Clock, Loader, CheckCircle
} from 'lucide-react';

import StatCard from '../components/statCard';
import { useAppContext } from '../context/AppContext';
function Dashboard() {
  const { users, requests } = useAppContext();

  // User counts
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'Active').length;
  const inactiveUsers = users.filter(user => user.status === 'Inactive').length;

  // Support request counts
  const totalRequests = requests.length;
  const pendingRequests = requests.filter(request => request.status === 'Pending').length;
  const inProgressRequests = requests.filter(request => request.status === 'In Progress').length;
  const resolvedRequests = requests.filter(request => request.status === 'Resolved').length;

  // Recent data
  const recentUsers = [...users].reverse().slice(0, 4);
  const recentRequests = [...requests].reverse().slice(0, 3);

  return (
    <div className="page-content">

      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, Admin! Here's your overview.</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard title="Total Users" value={totalUsers} icon={<Users/>} color="#eee9ff" description="All registered users"/>
        <StatCard title="Active Users" value={activeUsers} icon={<UserCheck/>} color="#e3f8ed" description="Currently active users"/>
        <StatCard title="Inactive Users" value={inactiveUsers} icon={<UserX/>} color="#fff0e5" description="Currently inactive users"/>
        <StatCard title="Total Requests" value={totalRequests} icon={<MessageSquare/>} color="#e7f1ff" description="All support requests"/>
      </div>

      <h2 className="section-title">Support Request Overview</h2>
      <div className="request-grid">
  <StatCard title="Pending" value={pendingRequests} icon={<Clock/>} color="#fff4dc" description="Waiting for response"/>
  <StatCard title="In Progress" value={inProgressRequests} icon={<Loader/>} color="#e7f1ff" description="Currently being handled"/>
  <StatCard title="Resolved" value={resolvedRequests} icon={<CheckCircle/>} color="#e3f8ed" description="Successfully completed"/>
</div>

      <div className="dashboard-tables">

        <div className="dashboard-table-card">
          <div className="table-heading">
            <h3>Recent Users</h3>
            <span>Latest registered users</span>
          </div>

          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`status-badge ${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dashboard-table-card">
          <div className="table-heading">
            <h3>Recent Support Requests</h3>
            <span>Latest support activities</span>
          </div>

          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((request, index) => (
                <tr key={index}>
                  <td>{request.subject}</td>
                  <td>{request.category}</td>
                  <td>
                    <span className={`status-badge ${request.status.toLowerCase().replace(' ', '-')}`}>
                      {request.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
