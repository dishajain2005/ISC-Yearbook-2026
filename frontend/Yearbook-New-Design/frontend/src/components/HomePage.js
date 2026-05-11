import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/global.css';
import '../styles/HomePage.css';




export default function HomePage() {
  const navigate  = useNavigate();
  const [name,  setName]  = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    try {
      const ud = JSON.parse(localStorage.getItem('userData'));
      if (ud) { setName(ud.name || ''); setEmail(ud.email || ''); }
      else navigate('/');
    } catch { navigate('/'); }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <div className="home-page page-enter">

      {/* ── NAV ── */}
      <nav className="home-nav">
        <span className="home-nav-brand">ISC YEARBOOK 2026</span>
        <div className="home-nav-right">
          {name  && <span className="home-nav-pill">{name}</span>}
          {email && <span className="home-nav-email">{email}</span>}
          <button className="home-nav-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="home-hero">
        <div className="home-hero-left">

          <div className="hero-topline">
            <div className="hero-logo-wrap">
              <img
                src="/iitb-sports-logo.png"
                alt="IIT Bombay Sports"
                className="hero-logo-img"
              />
            </div>

            <div className="home-hero-eyebrow">
              IIT Bombay · ISC · 2026
            </div>
          </div>

          <h1 className="home-title">
            <span className="t-white">SPORTS</span>
            <span className="t-gold">YEAR</span>
            <span className="t-outline">BOOK</span>
          </h1>

          <div className="hero-motto">
            <span>UNTIL</span>
            <span className="hero-motto-dot" />
            <span>VICTORY</span>
            <span className="hero-motto-dot" />
            <span>ALWAYS</span>
          </div>

          <p className="home-tagline">
            A celebration of every match, every medal, every memory made at IIT Bombay.
          </p>

          <div className="hero-actions">
            <Link to="/fill-memory">
              <button className="btn-gold">
                Fill a Memory →
              </button>
            </Link>
          </div>

        </div>

        {/* Desktop-only right panel */}
        {/* Desktop-only right panel */}
        <div className="home-hero-right">

          <div className="hero-right-glow" />

          {/* Faded sports photos */}
          <div className="hero-photo-stack">
            <img
              src="/images/sport1.jpeg"
              alt="sports"
              className="hero-photo photo-1"
            />

            <img
              src="/images/sport2.jpeg"
              alt="sports"
              className="hero-photo photo-2"
            />

            <img
              src="/images/sport3.jpeg"
              alt="sports"
              className="hero-photo photo-3"
            />
          </div>

        </div>
        
      </section>
      
      {/* ── FOOTER ── */}
      <footer className="home-footer">
        <p>© 2026 IIT Bombay · Institute Sports Council</p>
        <p>UNTIL · VICTORY · ALWAYS</p>
      </footer>
    </div>
  );
}