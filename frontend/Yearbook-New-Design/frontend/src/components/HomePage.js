import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/global.css';
import '../styles/HomePage.css';

const SPORTS = [
  'Football','Cricket','Badminton','Basketball','Volleyball','Squash',
  'Athletics','Aquatics','Table Tennis','Lawn Tennis','Weightlifting',
  'Hockey','Ultimate Frisbee','Indian Games','Board Games','Aavhan',
];
const SPORTS_LOOP = [...SPORTS, ...SPORTS];

export default function HomePage() {
  const navigate = useNavigate();
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
        <div className="home-nav-left">
          <img src="/iitb-sports-logo.png" alt="IITB Sports" className="home-nav-logo" />
          <span className="home-nav-brand">ISC YEARBOOK <span>2026</span></span>
        </div>
        <div className="home-nav-right">
          {name && <span className="home-nav-pill">{name}</span>}
          <button className="home-nav-logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="home-hero">
        <div className="home-hero-glow" />
        <div className="home-hero-glow2" />

        <div className="home-hero-content">
          <div className="home-hero-eyebrow">IIT Bombay · Institute Sports Council · 2026</div>

          <h1 className="home-title">
            <span className="t-white">SPORTS</span>
            <span className="t-blue">YEAR</span>
            <span className="t-outline">BOOK</span>
          </h1>

          <p className="home-tagline">
            Until Victory. Always. — A celebration of every match, every medal, every memory made at IIT Bombay.
          </p>

          {/* Highlighted CTA */}
          <div className="home-cta-wrap">
            <Link to="/fill-memory">
              <button className="btn-cta">
                <span className="btn-cta-icon">✍</span>
                Fill a Memory
                <span className="btn-cta-arrow">→</span>
              </button>
            </Link>
            <p className="home-cta-hint">Share your story with the athletes who made this season special</p>
          </div>

          {/* Stats row */}
          <div className="home-hero-stats">
            {[['15+','Sports'],['200+','Athletes'],['2026','Season']].map(([n,l]) => (
              <div className="home-hero-stat" key={l}>
                <span className="home-stat-n">{n}</span>
                <span className="home-stat-l">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPORT MARQUEE ── */}
      <div className="sport-strip">
        <div className="strip-track">
          {SPORTS_LOOP.map((s, i) => <span key={i}>{s}</span>)}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="home-footer">
        <p>© 2026 IIT Bombay · Institute Sports Council</p>
        <p>UNTIL · VICTORY · ALWAYS</p>
      </footer>
    </div>
  );
}