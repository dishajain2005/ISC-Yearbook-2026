import React, { useState, useEffect } from 'react';
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
  const navigate = useNavigate();
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [success,  setSuccess]  = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src   = 'https://www.phone.email/verify_email_v1.js';
    script.async = true;
    document.body.appendChild(script);

    window.phoneEmailReceiver = async (userObj) => {
      try {
        const res = await axios.get(userObj.user_json_url);
        setEmail(res.data.user_email_id);
        setSuccess('Email verified ✓');
      } catch {
        setError('Error fetching verified email.');
      }
    };

    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
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
          Verify your IITB email address below to create your account.
        </p>

        <div className="verify-hint">
          Click the button to verify your email.{' '}
          <strong>If your LDAP doesn't work, Gmail also works!</strong>
        </div>

        <div
          className="pe_verify_email"
          data-client-id="15525971141294700440"
          style={{ marginBottom: 16 }}
        />

        <form onSubmit={handleRegister}>
          <Field label="Full Name">
            <input
              className="field-input" type="text" value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your full name" required
            />
          </Field>
          <Field label="Verified Email">
            <input
              className="field-input" type="email" value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Populated after verification" required disabled
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

          <button className="btn-gold" type="submit" style={{ width:'100%', marginTop:4 }}>
            Create Account →
          </button>
        </form>

        <div style={{ marginTop:16, textAlign:'center' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background:'none', border:'none',
              fontFamily:'var(--ff-mono)', fontSize:11,
              color:'white', cursor:'pointer',
              textDecoration:'underline', textUnderlineOffset:3,
            }}
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}