import React, { useState } from 'react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (email === 'admin@example.com' && password === 'admin123') {
      alert('Login successful');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div>
      <h1 data-testid="login-header">Login</h1>

      <input
        type="text"
        id="input-email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        id="input-password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button id="login-button" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
