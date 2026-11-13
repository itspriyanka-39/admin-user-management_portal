
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import {   Search,
  Eye,
  MessageSquare,
  Clock3,
  CheckCircle} from 'lucide-react';
function SupportRequests() {
  const { requests, setRequests, search: globalSearch } = useAppContext();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedRequest, setSelectedRequest] = useState(null);
const filteredRequests = requests.filter(request => {
  const localSearch = search.trim().toLowerCase();
  const navbarSearch = globalSearch.trim().toLowerCase();

  const matchesLocalSearch =
    request.userName.toLowerCase().includes(localSearch) ||
    request.subject.toLowerCase().includes(localSearch);

  const matchesGlobalSearch =
    request.userName.toLowerCase().includes(navbarSearch) ||
    request.subject.toLowerCase().includes(navbarSearch);

  const matchesSearch =
    (localSearch === '' && navbarSearch === '') ||
    (localSearch !== '' && matchesLocalSearch) ||
    (navbarSearch !== '' && matchesGlobalSearch);

  const matchesFilter =
    filter === 'All' || request.status === filter;

  return matchesSearch && matchesFilter;
});

  function updateStatus(id, newStatus) {
    const confirmed = window.confirm(
      'Are you sure you want to update this request status?'
    );

    if (!confirmed) return;

    setRequests(previousRequests =>
      previousRequests.map(request =>
        request.id === id
          ? { ...request, status: newStatus }
          : request
      )
    );
  }

  return (
    <div className="page-content">
      <div className="users-header">
        <div>
          <h1>Support Requests</h1>
          <p>Manage and track all user support requests.</p>
        </div>
      </div>
<div className="user-summary">

  <div>
    <div>
      <span>Total Requests</span>
      <h2>{requests.length}</h2>
    </div>
    <div className="stat-icon">
      <MessageSquare size={22} />
    </div>
  </div>

  <div>
    <div>
      <span>Pending</span>
      <h2>{requests.filter(r => r.status === 'Pending').length}</h2>
    </div>
    <div className="stat-icon">
      <Clock3 size={22} />
    </div>
  </div>
  <div>
  <div>
    <span>In Progress</span>
    <h2>
      {requests.filter(r => r.status === 'In Progress').length}
    </h2>
  </div>

  <div className="stat-icon in-progress-requests-icon">
    <Clock3 size={22} />
  </div>
</div>

  <div>
    <div>
      <span>Resolved</span>
      <h2>{requests.filter(r => r.status === 'Resolved').length}</h2>
    </div>
    <div className="stat-icon">
      <CheckCircle size={22} />
    </div>
  </div>

</div>

      <div className="users-table-card">
        <div className="users-toolbar">
          <div className="users-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search by user or subject..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <div className="table-scroll">
          <table className="users-table">
            <thead>
              <tr>
                <th>USER NAME</th>
                <th>SUBJECT</th>
                <th>CATEGORY</th>
                <th>DATE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map(request => (
                  <tr key={request.id}>
                    <td className="user-name">{request.userName}</td>
                    <td>{request.subject}</td>
                    <td>{request.category}</td>
                    <td>{request.date}</td>
                    <td>
                      <select
                        className="request-status-select"
                        value={request.status}
                        onChange={e =>
                          updateStatus(request.id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="edit-btn"
                        title="View Details"
                        onClick={() => setSelectedRequest(request)}
                      >
                        <Eye size={17} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-users">
                    No support requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedRequest && (
        <div className="modal-overlay">
          <div className="user-modal">
            <div className="modal-header">
              <div>
                <h2>Request Details</h2>
                <p>Complete support request information.</p>
              </div>
              <button
                className="close-modal"
                onClick={() => setSelectedRequest(null)}
              >
                ×
              </button>
            </div>

            <div className="request-details">
              <p><strong>User:</strong> {selectedRequest.userName}</p>
              <p><strong>Subject:</strong> {selectedRequest.subject}</p>
              <p><strong>Category:</strong> {selectedRequest.category}</p>
              <p><strong>Date:</strong> {selectedRequest.date}</p>
              <p><strong>Status:</strong> {selectedRequest.status}</p>
              <p><strong>Description:</strong> {selectedRequest.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SupportRequests;
