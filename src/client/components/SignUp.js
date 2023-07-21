import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:8085/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        localStorage.setItem('userId', data.userId)
        return data
      }).then(() => {
        navigate("/home");
      })
      .catch((error) => {
        console.error(error);
        setError('User Already Exists.');
      });
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
      {error && <div className="error-msg">{error}</div>}
    </form>
  );
}

export default SignUp;
