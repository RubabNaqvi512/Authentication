import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const adminEmail = "admin@example.com";
  const adminPassword = "admin123"; // <-- Hardcoded admin password

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // If admin, check email & password manually
      if (email === adminEmail && password === adminPassword) {
        const result = await signInWithEmailAndPassword(auth, email, password);
        navigate('/admin');
        return;
      }

      // Normal user login
      const result = await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');

    } catch (err) {
      setError("Invalid email or password.");
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <h1 className="form-title">Welcome Back</h1>
        <p className="form-subtitle">Please enter your credentials to login</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              className="input-field"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="toggle-form">
          Don't have an account? <span onClick={() => navigate('/signup')}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
