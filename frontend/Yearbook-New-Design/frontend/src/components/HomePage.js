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
  const navigate  = useNavigate();
  const [name,  setName]  = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    try {
      const ud = JSON.parse(localStorage.getItem('userData'));
      if (ud) { setName(ud.name || ''); setEmail(ud.email || ''); }
      else navigate('/');          // not logged in → back to login
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
          <div className="home-hero-eyebrow">IIT Bombay · ISC · 2026</div>

          <h1 className="home-title">
            <span className="t-white">SPORTS</span>
            <span className="t-gold">YEAR</span>
            <span className="t-outline">BOOK</span>
          </h1>

          <p className="home-tagline">
            Until Victory. Always. — A celebration of every match, every medal, every memory made at IIT Bombay.
          </p>

          <Link to="/fill-memory">
            <button className="btn-gold">Fill a Memory →</button>
          </Link>
        </div>

        <div className="home-hero-right">
          <div className="hero-right-glow" />
          <div className="hero-bg-num">2026</div>
          <div className="hero-cards-overlay">
            {[
              { n: '15+',  l: 'Sports'   },
              { n: '200+', l: 'Athletes' },
              { n: '2026', l: 'Season'   },
            ].map(({ n, l }) => (
              <div className="hero-card" key={l}>
                <div className="hero-card-n">{n}</div>
                <div className="hero-card-l">{l}</div>
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

      {/* ── CONTRIBUTE ── */}
      <section className="home-contribute">
        <div>
          <div className="contribute-label">Your Turn to Shine</div>
          <h2 className="contribute-h">CONTRIBUTE<br />TO THE YEARBOOK</h2>
          <p className="contribute-p">
            Share your memories, photos, and stories with the graduating seniors.
            Every submission becomes a permanent part of IIT Bombay's sports legacy.
          </p>
          <Link to="/fill-memory">
            <button className="btn-gold">Fill a Memory →</button>
          </Link>
        </div>

        <div className="contribute-card">
          <div className="corner-deco tl" />
          <div className="corner-deco br" />
          <div className="contribute-card-icon">✍</div>
          <h3>LEAVE YOUR MARK</h3>
          <p>
            Write about your teammates, coaches, victories, and the moments that made
            this season unforgettable. Attach a photo and make it yours.
          </p>
          <Link to="/fill-memory">
            <button className="btn-ghost">Open Form →</button>
          </Link>
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