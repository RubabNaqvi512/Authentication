import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import './auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      // Save user profile data
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: formData.name,
        email: formData.email,
        createdAt: new Date()
      });
      
      // Success handling
      navigate('/login', {
        state: { 
          signupSuccess: true,
          email: formData.email 
        },
        replace: true
      });
      
    } catch (err) {
      let errorMessage = 'Signup failed. Please try again.';
      switch(err.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email already in use. Please login instead.';
          navigate('/login', { state: { email: formData.email } });
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Your Account</h2>
      <p className="auth-subtitle">Join us today to get started</p>
      
      {error && <p className="error">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password (min 6 chars)"
            minLength="6"
            required
          />
          <div className="password-strength">
            <div 
              className="strength-bar" 
              style={{ 
                width: `${Math.min(formData.password.length * 10, 100)}%`,
                backgroundColor: formData.password.length >= 6 ? 'var(--success)' : 'var(--error)'
              }}
            ></div>
          </div>
        </div>
        
        <button 
          type="submit" 
          className="auth-button"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Creating Account...
            </>
          ) : 'Sign Up'}
        </button>
      </form>
      
      <p className="auth-link">
        Already have an account? <span onClick={() => navigate('/login')}>Login here</span>
      </p>
    </div>
  );
};

export default Signup;