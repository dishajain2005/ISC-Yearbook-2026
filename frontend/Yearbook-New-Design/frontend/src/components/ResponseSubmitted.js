import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import '../styles/Forms.css';

export default function ResponseSubmitted() {
  return (
    <div className="response-page page-enter">
      <div className="response-bg-text">SUBMITTED</div>

      <div className="response-card">
        <div className="corner-deco tl" />
        <div className="corner-deco tr" />
        <div className="corner-deco bl" />
        <div className="corner-deco br" />

        <div className="response-check">✓</div>

        <h2>MEMORY<br />SAVED</h2>
        <h3>Thank you for your contribution!</h3>
        <p>
          Your memory has been submitted successfully and will be included in
          the Sports Yearbook 2026. Every story matters.
        </p>

        <div className="response-btn-row">
          <Link to="/fill-memory">
            <button className="btn-gold">Submit Another →</button>
          </Link>
          <Link to="/home">
            <button className="btn-ghost">Back to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}