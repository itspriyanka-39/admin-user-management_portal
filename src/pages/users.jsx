
import { useState } from 'react';
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  Users as UsersIcon,
  UserCheck,
  UserX
} from 'lucide-react';

import { useAppContext } from '../context/AppContext';

function Users() {
  const { users, setUsers, search: globalSearch } = useAppContext();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    status: 'Active'
  });

  const [error, setError] = useState('');

  const filteredUsers = users.filter(user => {
    const localSearch = search.trim().toLowerCase();
    const navbarSearch = globalSearch.trim().toLowerCase();

    const matchesSearch =
      user.name.toLowerCase().includes(localSearch) ||
      user.email.toLowerCase().includes(localSearch) ||
      user.name.toLowerCase().includes(navbarSearch) ||
      user.email.toLowerCase().includes(navbarSearch);

    return matchesSearch &&
      (filter === 'All' || user.status === filter);
  });

  function openAddForm() {
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      status: 'Active'
    });
    setError('');
    setShowForm(true);
  }

  function openEditForm(user) {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: '',
      status: user.status
    });
    setError('');
    setShowForm(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const phone = formData.phone.trim();
    const password = formData.password;

    if (!name || !email || !phone) {
      setError('All fields are required.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError('Phone number must contain 10 digits.');
      return;
    }

    if (!editingUser && password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    if (editingUser && password && password.length < 6) {
      setError('New password must contain at least 6 characters.');
      return;
    }

    const duplicate = users.some(user =>
      user.email.toLowerCase() === email &&
      user.id !== editingUser?.id
    );

    if (duplicate) {
      setError('This email is already registered.');
      return;
    }

    const cleanData = {
      name,
      email,
      phone,
      status: formData.status
    };

    if (editingUser) {
      setUsers(previousUsers =>
        previousUsers.map(user =>
          user.id === editingUser.id
            ? {
                ...user,
                ...cleanData,
                ...(password ? { password } : {})
              }
            : user
        )
      );

      alert('User updated successfully!');
    } else {
      setUsers(previousUsers => [
        ...previousUsers,
        {
          id: Date.now(),
          ...cleanData,
          password
        }
      ]);

      alert('User added successfully!');
    }

    setShowForm(false);
    setError('');
  }

  function deleteUser(id) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this user?'
    );

    if (confirmed) {
      setUsers(previousUsers =>
        previousUsers.filter(user => user.id !== id)
      );

      alert('User deleted successfully!');
    }
  }

  return (
    <div className="page-content">

      <div className="users-header">
        <div>
          <h1>Users Management</h1>
          <p>Manage and organize all registered users.</p>
        </div>

        <button className="add-user-btn" onClick={openAddForm}>
          <Plus size={18} />
          Add New User
        </button>
      </div>

      <div className="user-summary">

        <div>
          <div>
            <span>Total Users</span>
            <h2>{users.length}</h2>
          </div>
          <div className="stat-icon total-users-icon">
            <UsersIcon size={22} />
          </div>
        </div>

        <div>
          <div>
            <span>Active Users</span>
            <h2>{users.filter(user => user.status === 'Active').length}</h2>
          </div>
          <div className="stat-icon active-users-icon">
            <UserCheck size={22} />
          </div>
        </div>

        <div>
          <div>
            <span>Inactive Users</span>
            <h2>{users.filter(user => user.status === 'Inactive').length}</h2>
          </div>
          <div className="stat-icon inactive-users-icon">
            <UserX size={22} />
          </div>
        </div>

      </div>

      <div className="users-table-card">

        <div className="users-toolbar">

          <div className="users-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search users by name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="All">All Users</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

        </div>

        <div className="table-scroll">
          <table className="users-table">
            <thead>
              <tr>
                <th>USER</th>
                <th>EMAIL</th>
                <th>PHONE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td className="user-name">{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <span className={`status-badge ${user.status.toLowerCase()}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <div className="user-actions">
                        <button
                          className="edit-btn"
                          onClick={() => openEditForm(user)}
                          title="Edit User"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => deleteUser(user.id)}
                          title="Delete User"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-users">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="user-modal">

            <div className="modal-header">
              <div>
                <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
                <p>Enter the user details below.</p>
              </div>

              <button
                className="close-modal"
                onClick={() => setShowForm(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>

              <label>Full Name</label>
              <input
                required
                type="text"
                placeholder="Enter full name"
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <label>Email Address</label>
              <input
                required
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <label>Phone Number</label>
              <input
                required
                type="tel"
                placeholder="10-digit phone number"
                value={formData.phone}
                onChange={e =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />

              <label>
                Password {editingUser ? '(leave blank to keep current)' : ''}
              </label>
              <input
                type="password"
                placeholder={editingUser ? 'Enter new password (optional)' : 'Create password'}
                value={formData.password}
                onChange={e =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required={!editingUser}
                minLength={6}
              />

              <label>Status</label>
              <select
                value={formData.status}
                onChange={e =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              {error && <p className="form-error">{error}</p>}

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="save-btn">
                  {editingUser ? 'Update User' : 'Save User'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Users;
