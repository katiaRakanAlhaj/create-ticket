import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Register = ({ setAccessToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      const response = await fetch(
        'https://assignments.aigate.me/backend_technical_test/public/api/register?email=m@gmail.com&password=123456789&role_id=1',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.access_token);
        navigate('/view-services');
      } else {
        console.log('Error:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  const handleNavigate = () => {
    navigate('/login');
  };
  return (
    <div>
      <h1>Register</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <p onClick={handleNavigate}>Already have an account? Login</p>
    </div>
  );
};
export default Register;
