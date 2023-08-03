import './style.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
const Logout = ({ accessToken }) => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch(
        'https://assignments.aigate.me/backend_technical_test/public/api/logout',
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        navigate('/'); // Navigate back to the main page after logging out
      } else {
        setMessage('Error logging out');
      }
    } catch (error) {
      setMessage('Error logging out');
    }
  };
  const confirmLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      handleLogout();
    }
  };
  return (
    <div className="image-flight">
      <h1 className="logout-title">Logout</h1>
      <div className="button">
        <Button
          type="primary"
          className="logout-button"
          onClick={confirmLogout}
        >
          Logout
        </Button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};
export default Logout;
