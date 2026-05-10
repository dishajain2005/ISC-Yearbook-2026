import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/global.css';
import '../styles/Login.css';
import API from '../config';

const SPORTS = [
  'Football','Cricket','Badminton','Basketball','Aquatics',
  'Athletics','Hockey','Squash','Table Tennis','Lawn Tennis',
  'Volleyball','Weightlifting','Ultimate Frisbee','Indian Games','Board Games',
];

const Field = ({ label, children }) => (
  <div className="field-group">
    <label className="field-label">{label}</label>
    {children}
  </div>
);

export default function Login() {
  const navigate = useNavigate();

  const [introVisible, setIntroVisible] = useState(true);
  const [introLeaving, setIntroLeaving] = useState(false);

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const [showReset,     setShowReset]     = useState(false);
  const [resetStep,     setResetStep]     = useState(1);
  const [resetEmail,    setResetEmail]    = useState('');
  const [resetToken,    setResetToken]    = useState('');
  const [newPass,       setNewPass]       = useState('');
  const [confirmPass,   setConfirmPass]   = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [resetError,    setResetError]    = useState('');
  const [resetSuccess,  setResetSuccess]  = useState('');

  /* Mobile intro: show for 2.8s then slide up */
  useEffect(() => {
    const isMobile = window.innerWidth <= 860;
    if (!isMobile) { setIntroVisible(false); return; }
    const t1 = setTimeout(() => setIntroLeaving(true), 2800);
    const t2 = setTimeout(() => setIntroVisible(false), 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleForgotPassword = useCallback(async (mail) => {
    try {
      const res = await axios.post(`${API}/forgot-password`, { email: mail || resetEmail });
      setResetToken(res.data.resetToken);
      setResetSuccess('Reset token generated.');
      setResetError('');
      setResetStep(2);
    } catch (err) {
      setResetError(err.response?.data?.error || 'Error generating reset token.');
      setResetSuccess('');
    }
  }, [resetEmail]);

  useEffect(() => {
    if (!showReset || emailVerified) return;
    const script = document.createElement('script');
    script.src   = 'https://www.phone.email/verify_email_v1.js';
    script.async = true;
    document.body.appendChild(script);
    window.phoneEmailReceiver = async (userObj) => {
      try {
        const res           = await axios.get(userObj.user_json_url);
        const verifiedEmail = res.data.user_email_id;
        if (!verifiedEmail.endsWith('@iitb.ac.in')) {
          setResetError('Only @iitb.ac.in emails are allowed');
          return;
        }
        setResetEmail(verifiedEmail);
        setEmailVerified(true);
        handleForgotPassword(verifiedEmail);
      } catch {
        setResetError('Error fetching verified email');
      }
    };
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, [showReset, emailVerified, handleForgotPassword]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${API}/login`, { email, password });
      localStorage.setItem('userData', JSON.stringify(res.data));
      navigate('/home');
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const openReset = () => {
    setShowReset(true); setResetStep(1); setResetEmail(''); setResetToken('');
    setNewPass(''); setConfirmPass(''); setEmailVerified(false);
    setResetError(''); setResetSuccess(''); setError('');
  };

  const closeReset = () => {
    setShowReset(false); setResetStep(1); setResetEmail(''); setResetToken('');
    setNewPass(''); setConfirmPass(''); setEmailVerified(false);
    setResetError(''); setResetSuccess('');
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPass !== confirmPass) { setResetError('Passwords do not match.'); return; }
    if (newPass.length < 4)      { setResetError('Password must be at least 4 characters.'); return; }
    try {
      await axios.post(`${API}/reset-password`, {
        email: resetEmail, resetToken, newPassword: newPass,
      });
      setResetSuccess('Password reset! You can now log in.');
      setResetError('');
      setTimeout(() => setShowReset(false), 3000);
    } catch (err) {
      setResetError(err.response?.data?.error || 'Error resetting password.');
      setResetSuccess('');
    }
  };

  const stepDone   = (n) => resetStep > n;
  const stepActive = (n) => resetStep === n;

  return (
    <div className="login-page page-enter">

      {loading && (
        <div className="loading-overlay">
          <div className="loading-ring" />
          <p>AUTHENTICATING</p>
        </div>
      )}

      {/* ── MOBILE INTRO SPLASH ── */}
      {introVisible && (
        <div className={`login-intro ${introLeaving ? 'login-intro--leaving' : ''}`}>
          <div className="login-intro-glow" />
          <div className="login-intro-logo-wrap">
            <img src="/iitb-sports-logo.png" alt="IITB Sports" className="login-intro-logo" />
          </div>
          <div className="login-intro-year">2026</div>
          <div className="login-intro-title">Sports Yearbook</div>
          <div className="login-intro-sub">IIT Bombay · Institute Sports Council</div>
          <div className="login-intro-divider" />
          <div className="login-intro-chips">
            {SPORTS.slice(0, 6).map(s => (
              <span key={s} className="login-intro-chip">{s}</span>
            ))}
            <span className="login-intro-chip login-intro-chip--more">+9 more</span>
          </div>
        </div>
      )}

      {/* ── LEFT PANEL ── */}
      <div className="login-left">
        <div className="login-left-glow" />
        <div className="login-left-glow2" />

        <div className="login-brand-row">
          <div className="login-logo-wrap">
            <img src="/iitb-sports-logo.png" alt="IITB Sports" className="login-logo-img" />
          </div>
          <div className="login-brand-text">
            ISC YEARBOOK
            <small>2026 Season</small>
          </div>
        </div>

        <div className="login-hero-block">
          <div className="login-hero-eyebrow">IIT Bombay · ISC · 2026</div>
          <div className="login-hero-year">2026</div>
          <div className="login-hero-title">SPORTS YEARBOOK</div>
          <div className="login-hero-divider" />
          <p className="login-hero-tagline">
            Until Victory. Always. — A celebration of every match, every medal, every memory made at IIT Bombay.
          </p>

          <div className="login-sports-section">
            <div className="login-sports-label">Sports this season</div>
            <div className="login-sport-chips">
              {SPORTS.map((s, i) => (
                <span key={s} className={`login-sport-chip ${i < 3 ? 'login-sport-chip--active' : ''}`}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="login-stats">
          {[['15+','Sports'],['200+','Athletes'],['2026','Season']].map(([n,l]) => (
            <div className="login-stat" key={l}>
              <span className="login-stat-n">{n}</span>
              <span className="login-stat-l">{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="login-right">
        <div className="corner-deco tl" />
        <div className="corner-deco br" />

        {!showReset ? (
          <>
            <div className="eyebrow">Welcome Back</div>
            <h1 className="login-form-heading">SIGN IN</h1>
            <p className="login-form-sub">Access your yearbook portal</p>

            <form onSubmit={handleLogin}>
              <Field label="Email Address">
                <input
                  className="field-input" type="email" value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@iitb.ac.in" required disabled={loading}
                />
              </Field>
              <Field label="Password">
                <input
                  className="field-input" type="password" value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" required disabled={loading}
                />
              </Field>

              {error && <div className="msg-error">{error}</div>}

              <div className="login-btn-row">
                <button className="btn-primary" type="submit" disabled={loading}>
                  {loading ? <><span className="spinner-blue" /> Logging in…</> : 'LOGIN →'}
                </button>
                <button className="btn-outline" type="button"
                  onClick={() => navigate('/register')} disabled={loading}>
                  Register
                </button>
              </div>
            </form>

            <div className="login-link-row">
              <button className="login-link" onClick={openReset} disabled={loading}>
                Forgot password?
              </button>
              <button className="login-link"
                onClick={() => navigate('/alumni-register')} disabled={loading}>
                Alumni? Register here
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="eyebrow">Account Recovery</div>
            <h1 className="login-form-heading">RESET<br />PASSWORD</h1>

            <div className="reset-steps">
              {[1,2,3].map(n => (
                <React.Fragment key={n}>
                  <div className={`reset-step-dot ${stepDone(n)?'done':''} ${stepActive(n)?'active':''}`}>
                    {stepDone(n) ? '✓' : n}
                  </div>
                  {n < 3 && <div className="reset-step-line" />}
                </React.Fragment>
              ))}
            </div>

            {resetStep === 1 && !emailVerified && (
              <div className="reset-box">
                <p style={{ fontSize:13, color:'var(--text-muted)', marginBottom:14, lineHeight:1.7 }}>
                  Verify your <strong style={{ color:'var(--blue-mid)' }}>@iitb.ac.in</strong> email to receive a reset token.
                </p>
                <div className="pe_verify_email" data-client-id="15525971141294700440" />
              </div>
            )}

            {resetStep === 2 && emailVerified && (
              <div className="reset-box">
                <Field label="Verified Email">
                  <input className="field-input" type="email" value={resetEmail} disabled />
                  <span className="verified-badge">✓ Verified</span>
                </Field>
                <div className="field-group" style={{ marginTop:8 }}>
                  <label className="field-label">Reset Token</label>
                  <div className="reset-token-display">{resetToken}</div>
                </div>
                <button className="btn-primary" style={{ width:'100%', marginTop:14 }}
                  onClick={() => setResetStep(3)}>Continue →</button>
              </div>
            )}

            {resetStep === 3 && (
              <form className="reset-box" onSubmit={handleResetPassword}>
                <Field label="New Password">
                  <input className="field-input" type="password" value={newPass}
                    onChange={e => setNewPass(e.target.value)}
                    placeholder="Minimum 4 characters" required minLength={4} />
                </Field>
                <Field label="Confirm New Password">
                  <input className="field-input" type="password" value={confirmPass}
                    onChange={e => setConfirmPass(e.target.value)}
                    placeholder="Repeat password" required minLength={4} />
                </Field>
                {newPass && confirmPass && newPass !== confirmPass && (
                  <div className="msg-error">Passwords do not match.</div>
                )}
                <button className="btn-primary" type="submit" style={{ width:'100%', marginTop:8 }}>
                  Set New Password →
                </button>
              </form>
            )}

            {resetError   && <div className="msg-error"   style={{ marginTop:12 }}>{resetError}</div>}
            {resetSuccess && <div className="msg-success" style={{ marginTop:12 }}>{resetSuccess}</div>}

            <div className="login-link-row" style={{ marginTop:16 }}>
              <button className="login-link" onClick={closeReset}>← Back to Login</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}