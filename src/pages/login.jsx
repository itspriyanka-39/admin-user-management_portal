
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

function Login() {
  const navigate = useNavigate();
  const { users } = useAppContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin(e) {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setError('Please enter email and password.');
      return;
    }

    // Admin Login
    if (
      cleanEmail === 'admin@gmail.com' &&
      password === 'Admin@123'
    ) {
      sessionStorage.clear();
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userRole', 'admin');

      setError('');
      navigate('/');
      return;
    }

    // Find the actual registered user
    const currentUser = users.find(
      user =>
        user.email?.trim().toLowerCase() === cleanEmail &&
        user.password === password
    );

    if (!currentUser) {
      setError('Invalid email or password.');
      return;
    }

    // Check account status
    if (currentUser.status !== 'Active') {
      setError('Your account is inactive. Please contact Admin.');
      return;
    }

    // Save actual logged-in user's ID
    sessionStorage.clear();
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('userRole', 'user');
    sessionStorage.setItem('userId', String(currentUser.id));

    setError('');
    navigate('/user-panel');
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleLogin}>
        <h1>Welcome Back!</h1>
        <p>Please login to continue.</p>

        <label>Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {error && <p className="login-error">{error}</p>}

        <button type="submit">Login</button>

        <p className="register-login-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
