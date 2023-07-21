import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8085/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      localStorage.setItem('userId', data.userId)
  
      navigate("/home");
    } catch (error) {
      console.error('An error occurred:', error);
      setError('Failed to login, please check your credentials and try again.');
    }
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <label>
        Username:
        <input className="form-input" type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <input className="form-submit" type="submit" value="Submit" />
      <Link to="/signup">
        <button type="button" className="alt-btn">Sign Up</button>
      </Link>
      {error && <div className="error-msg">{error}</div>}
    </form>
  );
}

export default Login;
