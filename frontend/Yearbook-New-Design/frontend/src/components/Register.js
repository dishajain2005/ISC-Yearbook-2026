import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/global.css';
import '../styles/Forms.css';
import API from '../config';

const Field = ({ label, children }) => (
  <div className="field-group">
    <label className="field-label">{label}</label>
    {children}
  </div>
);

export default function Register() {
  const navigate  = useNavigate();
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [success,  setSuccess]  = useState('');

  const ALLOWED_DOMAINS = ['@iitb.ac.in', '@gmail.com'];

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const isAllowed = ALLOWED_DOMAINS.some(d => email.endsWith(d));
    if (!isAllowed) {
      return setError('Please use your @iitb.ac.in or @gmail.com email.');
    }

    try {
      const res = await axios.post(`${API}/register`, { name, email, password });
      setSuccess(res.data.message || 'Registered successfully! Redirecting…');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error registering. Please try again.');
    }
  };

  return (
    <div className="register-page page-enter">

      <div className="register-visual">
        <div className="register-visual-bg-num">26</div>
        <div className="register-visual-content">
          <img src="/iitb-sports-logo.png" alt="IITB Sports" className="login-intro-logo" />
          <h1>JOIN THE<br />YEARBOOK</h1>
          <p>IIT Bombay · Sports 2026</p>
        </div>
      </div>

      <div className="register-form-side">
        <div className="corner-deco tl" />
        <div className="corner-deco br" />

        <div className="eyebrow">New Account</div>
        <h2 className="register-heading">REGISTER</h2>
        <p className="register-sub">
          Use your <strong>@iitb.ac.in</strong> or <strong>@gmail.com</strong> address to register.
        </p>

        <form onSubmit={handleRegister}>
          <Field label="Full Name">
            <input
              className="field-input" type="text" value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your full name" required
            />
          </Field>
          <Field label="Email Address">
            <input
              className="field-input" type="email" value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="yourname@iitb.ac.in" required
            />
          </Field>
          <Field label="Password">
            <input
              className="field-input" type="password" value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Set a password" required
            />
          </Field>

          {error   && <div className="msg-error">{error}</div>}
          {success && <div className="msg-success">{success}</div>}

          <button className="btn-gold" type="submit" style={{ width: '100%', marginTop: 4 }}>
            Create Account →
          </button>
        </form>

        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'none', border: 'none',
              fontFamily: 'var(--ff-mono)', fontSize: 11,
              color: 'white', cursor: 'pointer',
              textDecoration: 'underline', textUnderlineOffset: 3,
            }}
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}