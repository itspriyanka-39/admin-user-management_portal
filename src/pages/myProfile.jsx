
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import {
  UserCircle,
  Pencil,
  X,
  Lock,
  KeyRound,
  ChevronRight
} from 'lucide-react';

function MyProfile() {
  const { users, setUsers } = useAppContext();

  const userId = Number(sessionStorage.getItem('userId'));
  const currentUser = users.find(user => user.id === userId);

  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');

  if (!currentUser) {
    return <p>User details not found.</p>;
  }

  function handleEdit() {
    setName(currentUser.name);
    setEmail(currentUser.email);
    setPhone(currentUser.phone || '');
    setMessage('');
    setError('');
    setIsEditing(true);
  }

  function handleSave(e) {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('All fields are required.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!/^\d{10}$/.test(phone.trim())) {
      setError('Phone number must contain 10 digits.');
      return;
    }

    const emailExists = users.some(
      user =>
        user.id !== userId &&
        user.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (emailExists) {
      setError('This email is already registered.');
      return;
    }

    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId
          ? {
              ...user,
              name: name.trim(),
              email: email.trim(),
              phone: phone.trim()
            }
          : user
      )
    );

    setIsEditing(false);
    setMessage('Profile updated successfully!');
  }

  function handlePasswordChange(e) {
    e.preventDefault();

    setPasswordMessage('');
    setPasswordError('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Please fill all password fields.');
      return;
    }

    if (!currentUser.password) {
      setPasswordError('Password is not configured for this account.');
      return;
    }

    if (currentUser.password !== currentPassword) {
      setPasswordError('Current password is incorrect.');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    if (newPassword === currentPassword) {
      setPasswordError('New password must be different.');
      return;
    }

    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId
          ? { ...user, password: newPassword }
          : user
      )
    );

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordMessage('Password changed successfully!');
    setShowPasswordForm(false);
  }

  function closePasswordForm() {
    setShowPasswordForm(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
    setPasswordMessage('');
  }

  return (
    <div className="user-panel-page">

      <div className="user-panel-header">
        <div>
          <h1>My Profile</h1>
          <p>View and manage your personal information.</p>
        </div>

        {!isEditing && (
          <button className="profile-edit-btn" onClick={handleEdit}>
            <Pencil size={17} />
            Edit Profile
          </button>
        )}
      </div>

      {message && <p className="profile-success">{message}</p>}
      {error && <p className="profile-error">{error}</p>}

      <div className="user-details-card profile-main-card">

        <div className="profile-avatar">
          <UserCircle size={48} />
        </div>

        {isEditing ? (
          <form onSubmit={handleSave} className="profile-form">

            <div className="profile-form-grid">
              <div className="profile-field">
                <label>Full Name</label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div className="profile-field">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>

              <div className="profile-field">
                <label>Phone Number</label>
                <input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  maxLength={10}
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="profile-actions">
              <button type="submit" className="profile-save-btn">
                Save Changes
              </button>

              <button
                type="button"
                className="profile-cancel-btn"
                onClick={() => {
                  setIsEditing(false);
                  setError('');
                }}
              >
                Cancel
              </button>
            </div>

          </form>
        ) : (
          <div className="profile-info-grid">
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
              <strong>{currentUser.phone || 'Not provided'}</strong>
            </div>

            <div>
              <span>Account Status</span>
              <strong>{currentUser.status || 'Active'}</strong>
            </div>
          </div>
        )}

      </div>

      {/* Security Section */}
      <div className="user-details-card security-card">

        <div className="security-icon">
          <Lock size={23} />
        </div>

        <div className="security-content">
          <h2>Account Security</h2>
          <p>Keep your account secure by updating your password.</p>

          {!showPasswordForm && (
            <button
              className="change-password-link"
              onClick={() => {
                setPasswordMessage('');
                setPasswordError('');
                setShowPasswordForm(true);
              }}
            >
              <KeyRound size={17} />
              Change Password
              <ChevronRight size={17} />
            </button>
          )}
        </div>

        {passwordMessage && (
          <p className="profile-success">{passwordMessage}</p>
        )}

        {showPasswordForm && (
          <form
            onSubmit={handlePasswordChange}
            className="password-form"
          >
            <h3>Update Your Password</h3>
            <p>Enter your current password and choose a new one.</p>

            {passwordError && (
              <p className="profile-error">{passwordError}</p>
            )}

            <div className="profile-field">
              <label>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
              />
            </div>

            <div className="profile-field">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Minimum 6 characters"
              />
            </div>

            <div className="profile-field">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>

            <div className="profile-actions">
              <button type="submit" className="profile-save-btn">
                Update Password
              </button>

              <button
                type="button"
                className="profile-cancel-btn"
                onClick={closePasswordForm}
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          </form>
        )}

      </div>

    </div>
  );
}

export default MyProfile;
