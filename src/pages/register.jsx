
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

function Register() {
  const navigate = useNavigate();
  const { users, setUsers } = useAppContext();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleRegister(e) {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const phone = formData.phone.trim();

    if (!name || !email || !phone || !formData.password || !formData.confirmPassword) {
      setError('Please fill all fields.');
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

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const emailExists = users.some(
      user => user.email.trim().toLowerCase() === email
    );

    if (emailExists) {
      setError('This email is already registered.');
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      phone,
      password: formData.password,
      status: 'Active'
    };

    setUsers(previousUsers => [...previousUsers, newUser]);

    setSuccess('Registration successful! Please login.');

    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });

    setTimeout(() => {
      navigate('/login');
    }, 1200);
  }

  return (
    <div className="login-page">
      <form className="login-card register-card" onSubmit={handleRegister}>
        <h1>Create Account</h1>
        <p>Register to access your user panel.</p>

        <label>Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="Enter 10-digit phone number"
          value={formData.phone}
          onChange={handleChange}
          maxLength="10"
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Create password"
          value={formData.password}
          onChange={handleChange}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        {error && <p className="login-error">{error}</p>}
        {success && <p className="register-success">{success}</p>}

        <button type="submit">Create Account</button>

        <p className="register-login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
