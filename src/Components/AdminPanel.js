import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import './AdminPanel.css';

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h1 className="admin-title">Admin Dashboard</h1>
        <p className="admin-subtitle">Restricted access - Only admins can see this</p>
        <button 
          onClick={handleLogout}
          className="admin-button"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;