
import React, { useState } from 'react';
import styles from './LoginCard.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useUser } from '../../Usercontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import show/hide icons

export default function LoginCard({ value, onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const { role } = useUser();
  const navigate = useNavigate();
console.log(value)
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.post(`${url}/log-in/${role}`, {
        username,
        password,
      });
      if (response.data.token) {
        alert(`You are Logged In `);
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userRole", role);

        switch (role) {
          case 'admin':
            navigate('/admin-dashboard');
            break;
          case 'attendee':
            navigate('/attendee-dashboard');
            break;
          case 'purchasemanager':
            navigate('/purchasemanager-dashboard');
            break;
          case 'storemanager':
            navigate('/storemanager-dashboard');
            break;
          case 'generalmanager':
            navigate('/generalmanager-dashboard');
            break;
          case 'accountmanager':
            navigate('/accountmanager-dashboard');
            break;
          case 'gsn':
            navigate('/gsn-dashboard')
            break;
          default:
            navigate('/');
        }
      }
    } catch (error) {
      alert(`${error.response.data.message}`);
      console.error('Error during login', error);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className={styles.outer}>
        <h2 style={{ margin: '30px 0' }}>Log in as {value}</h2>
        <Form
          onSubmit={handleLogin}
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            display: 'flex',
            width: '70%',
            maxWidth: '400px',
            flexDirection: 'column',
            borderRadius: '10px',
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              autoComplete="off"
              style={{
                maxWidth: '300px',
                width: '80%',
              }}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter UserName"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword" style={{ position: 'relative' }}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              style={{
                maxWidth: '300px',
                width: '80%',
              }}
              required
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
              placeholder="Enter Password"
            />
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: 'absolute',
                right: '15%',
                top: '60%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Show corresponding icon */}
            </span>
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </>
  );
}
