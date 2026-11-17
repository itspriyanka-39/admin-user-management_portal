
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import {
  Send,
  Eye,
  X,
  MessageSquare,
  Clock3,
  CheckCircle,
  Ticket,
  Pencil,
  Save
} from 'lucide-react';

function SupportCenter() {
  const { users, requests, setRequests } = useAppContext();

  const userId = Number(sessionStorage.getItem('userId'));
  const currentUser = users.find(user => user.id === userId);

  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Technical');
  const [description, setDescription] = useState('');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [editingRequest, setEditingRequest] = useState(null);

  const [editSubject, setEditSubject] = useState('');
  const [editCategory, setEditCategory] = useState('Technical');
  const [editDescription, setEditDescription] = useState('');

  // Only logged-in user's requests
  const myRequests = requests.filter(
    request => request.userId === userId
  );

  const pending = myRequests.filter(
    request => request.status === 'Pending'
  ).length;

  const inProgress = myRequests.filter(
    request => request.status === 'In Progress'
  ).length;

  const resolved = myRequests.filter(
    request => request.status === 'Resolved'
  ).length;

  // Submit new request
  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!subject.trim() || !description.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    const today = new Date();
    const date = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, '0'),
      String(today.getDate()).padStart(2, '0')
    ].join('-');

    const newRequest = {
      id: Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      subject: subject.trim(),
      category,
      date,
      status: 'Pending',
      description: description.trim()
    };

    setRequests(previousRequests => [
      newRequest,
      ...previousRequests
    ]);

    setSubject('');
    setCategory('Technical');
    setDescription('');
    setMessage('Your support request has been submitted successfully.');
  }

  // Open edit form
  function openEditForm(request) {
    setError('');
    setMessage('');

    setEditingRequest(request);
    setEditSubject(request.subject);
    setEditCategory(request.category);
    setEditDescription(request.description);
  }

  // Save edited request
  function handleEditSubmit(e) {
    e.preventDefault();
    setError('');

    if (!editSubject.trim() || !editDescription.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    const latestRequest = requests.find(
      request =>
        request.id === editingRequest.id &&
        request.userId === userId
    );

    if (!latestRequest || latestRequest.status !== 'Pending') {
      setError('This request can no longer be edited.');
      return;
    }

    setRequests(previousRequests =>
      previousRequests.map(request =>
        request.id === editingRequest.id &&
        request.userId === userId &&
        request.status === 'Pending'
          ? {
              ...request,
              subject: editSubject.trim(),
              category: editCategory,
              description: editDescription.trim()
            }
          : request
      )
    );

    setEditingRequest(null);
    setMessage('Your support request has been updated successfully.');
  }

  if (!currentUser) {
    return (
      <div className="support-center-page">
        <p className="support-error">
          User details not found. Please login again.
        </p>
      </div>
    );
  }

  return (
    <div className="support-center-page">

      <div className="support-center-heading">
        <div>
          <h1>Support Center</h1>
          <p>Submit a support request and track its progress.</p>
        </div>
      </div>

      {/* Request Summary */}
      <div className="support-user-stats">

        <div className="support-user-stat">
          <div className="support-stat-icon purple">
            <Ticket size={22} />
          </div>
          <div>
            <h3>{myRequests.length}</h3>
            <p>Total Requests</p>
          </div>
        </div>

        <div className="support-user-stat">
          <div className="support-stat-icon orange">
            <Clock3 size={22} />
          </div>
          <div>
            <h3>{pending}</h3>
            <p>Pending</p>
          </div>
        </div>

        <div className="support-user-stat">
          <div className="support-stat-icon blue">
            <MessageSquare size={22} />
          </div>
          <div>
            <h3>{inProgress}</h3>
            <p>In Progress</p>
          </div>
        </div>

        <div className="support-user-stat">
          <div className="support-stat-icon green">
            <CheckCircle size={22} />
          </div>
          <div>
            <h3>{resolved}</h3>
            <p>Resolved</p>
          </div>
        </div>

      </div>

      {/* New Request Form */}
      <div className="support-form-card">

        <div className="support-section-heading">
          <h2>Submit a New Request</h2>
          <p>Tell us about the issue you're facing.</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="support-form-grid">

            <div className="support-field">
              <label>Subject *</label>
              <input
                type="text"
                placeholder="Enter request subject"
                value={subject}
                onChange={e => setSubject(e.target.value)}
              />
            </div>

            <div className="support-field">
              <label>Category *</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option value="Technical">Technical</option>
                <option value="Account">Account</option>
                <option value="Billing">Billing</option>
                <option value="Other">Other</option>
              </select>
            </div>

          </div>

          <div className="support-field">
            <label>Description *</label>
            <textarea
              rows="5"
              placeholder="Describe your issue in detail..."
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          {error && !editingRequest && (
            <p className="support-error">{error}</p>
          )}

          {message && (
            <p className="support-success">{message}</p>
          )}

          <button type="submit" className="support-submit-btn">
            <Send size={17} />
            Submit Request
          </button>

        </form>
      </div>

      {/* My Requests */}
      <div className="my-support-requests-card">

        <div className="support-section-heading">
          <h2>My Support Requests</h2>
          <p>View, edit and track your submitted requests.</p>
        </div>

        {myRequests.length === 0 ? (

          <div className="support-empty-state">
            <MessageSquare size={35} />
            <h3>No Support Requests Yet</h3>
            <p>Your submitted requests will appear here.</p>
          </div>

        ) : (

          <div className="support-requests-table-wrapper">

            <table className="support-requests-table">

              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {myRequests.map(request => (

                  <tr key={request.id}>

                    <td>{request.subject}</td>
                    <td>{request.category}</td>
                    <td>{request.date}</td>

                    <td>
                      <span
                        className={`user-status ${request.status
                          .toLowerCase()
                          .replace(' ', '-')}`}
                      >
                        {request.status}
                      </span>
                    </td>

                    <td>
                      <div className="support-action-buttons">

                        <button
                          type="button"
                          className="support-view-btn"
                          onClick={() => setSelectedRequest(request)}
                        >
                          <Eye size={16} />
                          View
                        </button>

                        {request.status === 'Pending' && (
                          <button
                            type="button"
                            className="support-edit-btn"
                            onClick={() => openEditForm(request)}
                          >
                            <Pencil size={16} />
                            Edit
                          </button>
                        )}

                      </div>
                    </td>

                  </tr>

                ))}
              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* View Details Modal */}
      {selectedRequest && (

        <div className="modal-overlay">

          <div className="user-modal support-detail-modal">

            <div className="modal-header">
              <div>
                <h2>Request Details</h2>
                <p>Information about your support request.</p>
              </div>

              <button
                type="button"
                className="close-modal"
                onClick={() => setSelectedRequest(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="request-details">
              <p><strong>Subject:</strong> {selectedRequest.subject}</p>
              <p><strong>Category:</strong> {selectedRequest.category}</p>
              <p><strong>Date:</strong> {selectedRequest.date}</p>
              <p><strong>Status:</strong> {selectedRequest.status}</p>
              <p><strong>Description:</strong> {selectedRequest.description}</p>
            </div>

          </div>

        </div>

      )}

      {/* Edit Request Modal */}
      {editingRequest && (

        <div className="modal-overlay">

          <div className="user-modal support-edit-modal">

            <div className="modal-header">
              <div>
                <h2>Edit Support Request</h2>
                <p>Update your request details.</p>
              </div>

              <button
                type="button"
                className="close-modal"
                onClick={() => {
                  setEditingRequest(null);
                  setError('');
                }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit}>

              <div className="support-field">
                <label>Subject *</label>
                <input
                  type="text"
                  value={editSubject}
                  onChange={e => setEditSubject(e.target.value)}
                />
              </div>

              <div className="support-field">
                <label>Category *</label>
                <select
                  value={editCategory}
                  onChange={e => setEditCategory(e.target.value)}
                >
                  <option value="Technical">Technical</option>
                  <option value="Account">Account</option>
                  <option value="Billing">Billing</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="support-field">
                <label>Description *</label>
                <textarea
                  rows="5"
                  value={editDescription}
                  onChange={e => setEditDescription(e.target.value)}
                />
              </div>

              {error && (
                <p className="support-error">{error}</p>
              )}

              <div className="support-edit-actions">

                <button
                  type="button"
                  className="support-cancel-btn"
                  onClick={() => {
                    setEditingRequest(null);
                    setError('');
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="support-submit-btn"
                >
                  <Save size={17} />
                  Save Changes
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default SupportCenter;

