import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('ananya@example.com');
  const [password, setPassword] = useState('SecurePass123!');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      localStorage.setItem('access_token', response.data.access_token);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials. Please use the seeded doctor account.');
    }
  };

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ width: '100%', maxWidth: 440 }}>
        <h1 className="hero">VaidyaOS</h1>
        <p className="muted">AI-powered multilingual clinical intake</p>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, marginTop: 20 }}>
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          {error ? <div className="muted" style={{ color: '#dc2626' }}>{error}</div> : null}
          <button className="btn btn-primary" type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}
