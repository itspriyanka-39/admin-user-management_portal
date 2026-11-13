
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

    // Assignment's default User Login
    if (
      cleanEmail === 'user@gmail.com' &&
      password === 'User@123'
    ) {
      sessionStorage.clear();
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userRole', 'user');
      sessionStorage.setItem('userId', '1');

      setError('');
      navigate('/user-panel');
      return;
    }

    // Dynamic User Login
    const currentUser = users.find(
      user =>
        user.email.toLowerCase() === cleanEmail &&
        user.password === password
    );

    if (currentUser) {
      if (currentUser.status !== 'Active') {
        setError('Your account is inactive. Please contact Admin.');
        return;
      }

      sessionStorage.clear();
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userRole', 'user');
      sessionStorage.setItem('userId', String(currentUser.id));

      setError('');
      navigate('/user-panel');
      return;
    }

    setError('Invalid email or password.');
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
      </form>
    </div>
  );
}

export default Login;
