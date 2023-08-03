import { Card, Form, Input, Button } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = ({ setAccessToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await fetch(
        'https://assignments.aigate.me/backend_technical_test/public/api/login',
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
        localStorage.setItem('accessToken', data.access_token); // Store accessToken in localStorage
        navigate('/view-services');
      } else {
        console.log('Error:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  const handleFormSubmit = () => {
    if (email && password) {
      handleLogin();
    }
  };
  return (
    <div className="image-flight">
      <Card>
        <Form onFinish={handleFormSubmit}>
          <label>Email:</label>
          <Form.Item
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Input />
          </Form.Item>
          <label>Password:</label>
          <Form.Item
            name="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
};
export default Login;
