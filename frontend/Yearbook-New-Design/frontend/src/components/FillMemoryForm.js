import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/global.css';
import '../styles/Forms.css';
import API from '../config';
/* ══════════════════════════════════════════════
   SPORT → PLAYER DATA
══════════════════════════════════════════════ */
const SPORTS_PLAYERS = {
  "Institute Sports Council": [
    "Kalpesh Khare", 
  ],
  Aavhan: [
    "Arhat Gedam", "Sarthak Kabra", 
  ],
  Aquatics: ["Shashank Joshi","Athrav Nemade", "Achirangshu", "Muskaan Jain", "Saatwik", 
    "Kaushal Khunteta", "Vedant Dave", "Karthikeyan J", "Ashutosh"],

  Athletics: [
    "Amit Kumar", "Raj Yadav", "Sunil Kumar", "Raghav", "Mohsin", "Palak Jain",
    "Vijyalaxmi","Riswana", "Kamlesh", "Sanah", "Raunak", "Sukesha", "Mahesh"
  ],
  Badminton: [
    "Preyash Kumar", "Sharwanee Sonawane", "Hemant Kabra", "Yashwanth Juluva"
  ],
  Basketball: [
    "Abhishek", "Aditya", "Akash", "Anshu", "Antara", "Harsh", "Jatin",
    "Muskaan", "Nidhi", "Piyush", "Praktik", "Radhika", "Sanah", "Sudeshna"
  ],
  "Board Games": [
    "Kushagra Gupta", "Advay Sant", "Aditya Murali", "Mahek Hinhoriya", "Shrikant Dighole"
  ],
  Cricket: [
    "Tanishq Khaire", "Deep Agrawal", "Gaurav Mahla", "Harsh Phrohit", "Ram Nimma", 
    "Aamir Mir", "Anvesh", "Vishal saini", "Rajvardhan Sharma", "Uday", "Himanshu Choudhary",
    "Swaraj Mali", "Dhruv Saraswat","Ayush Sharma" 
  ],
  Football: [
    "Akshat Thakur", "Arhat Gedam", "Aniruddha", "Aryan Katiyar", "Amit Malakar",
    "Guarav sahu", "Viraansh", "Hiya Agarwal", "Sahil Chaudhary", "Shibil", 
    "Pranab Baro", "Rochan Prasad", "Nikhil Thejesh"
  ],
  Hockey: [
    "Sumit Laddha", "Kartik UC", "Divyraj Malviya", "Ashutosh Tiwari", "Devendra Verma", 
    "Jayakrishnan", "Mohd Shahzeb", "Hemant Kabra", "Rohit Meena", 
    "Jayank Chaudhary", "Suranjana Banerjee", "Divakar Kumar"
  ],
  "Indian Games": [
    "Anandhita","Ankit Raj","Anushka","Khushbu","Naveen","Nenavath Anusha","Parshva",
    "Prasanna Nage","Prem","Prince","Priyank","Priyanshu","Rahul Naik","Riswana","Sai Srivan Teja","Saima",
    "Sanjana","Sarthak Kabra","Vaishnavi","Vijaylaxmi","Vikas","Vishal","Yashasree"
  ],
  "Lawn Tennis": [
    "Tanvi Sharma", "Yashwanth VVS", "Kosmika", "Ashwajit", "Sarvada"
  ],
  Squash: [
    "Tejas Shende", "Dattaraj Salunkhe", "Aditya Agrawal", "Jasmine Kaur", 
    "Vishwam Raval", "Pratyush Kumar", "Kushagra Gupta"
  ],
  "Table Tennis": [
    "Bhavin", "Dhriti", "Atharva", "Shubhi", "Rohan", "Shubham", "Leena", "Soham", "Dhruv"
  ],
  Volleyball: [
    "Abhay Meena","Anish","Ahmad","Akshara Naik","Arun Anna","Binay Kr",
    "Deeksha Diwakar","Himanshu","Kajal Gupta","Mohammad Kadri","Neeraj Bajiya",
    "Paridhi Pamecha","Raaga Tarunya","Sunil Kaswan","Vikas Chahar","Raidaw",
    "Hiya Aggarwal","Priya Tiwari","Sahil","Shraddha","Tamanna Saini"
  ],
  Weightlifting: ["Anish Kumar Sahu", "Montu Pegu", "Harish Chand"],
  "Ultimate Frisbee": [
    
  ],
};

/* ══════════════════════════════════════════════
   PERSON PHOTO — tries multiple filename patterns
══════════════════════════════════════════════ */
function PersonPhoto({ name, sport }) {
  const [url,   setUrl]   = useState(null);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [valid,   setValid]   = useState(false);
  const [urls,    setUrls]    = useState([]);

  const buildUrls = (n, s) => {
    if (!n || !s) return [];
    const folderMap = {
      'Board Games': 'Board Games', 'Indian Games': 'Indian Games',
      'Lawn Tennis': 'Lawn Tennis', 'Table Tennis': 'Table Tennis',
      'Institute Sports Council': 'Council', 'Ultimate Frisbee': 'Frisbee',
    };
    const folder = "/assets/" + (folderMap[s] || s.replace(/\s+/g, ''));
    const exts   = ['jpg','jpeg','png','JPG','PNG','heif'];
    const und    = n.replace(/\s+/g, '_');
    const cap    = n.split(' ').map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join('_');
    const first  = n.split(' ')[0];
    const variants = [...new Set([und, cap, first])];
    return variants.flatMap(v => exts.map(e => `${folder}/${v}.${e}`));
  };

  useEffect(() => {
    const list = buildUrls(name, sport);
    setUrls(list);
    setIndex(0);
    setLoading(true);
    setValid(false);
    setUrl(list[0] ?? null);
  }, [name, sport]);

  const tryNext = () => {
    const next = index + 1;
    if (next < urls.length) { setIndex(next); setUrl(urls[next]); }
    else { setUrl(null); setLoading(false); setValid(false); }
  };

  if (!name || !sport) {
    return (
      <div className="photo-area">
        <div className="photo-frame">
          <div className="photo-placeholder">
            <span className="photo-placeholder-icon">🏅</span>
            <span>Select a person</span>
          </div>
          <span className="pf-corner tl" /><span className="pf-corner tr" />
          <span className="pf-corner bl" /><span className="pf-corner br" />
        </div>
      </div>
    );
  }

  return (
    <div className="photo-area">
      <div className="photo-frame">
        {/* hidden loader */}
        {loading && url && (
          <img src={url} alt="" style={{ display: 'none' }}
            onLoad={() => { setLoading(false); setValid(true); }}
            onError={tryNext}
          />
        )}
        {loading && (
          <div className="photo-frame-loading">
            <span className="spinner" style={{ borderTopColor: 'var(--gold)' }} />
          </div>
        )}
        {!loading && valid && url && (
          <img src={url} alt={name} onError={tryNext} />
        )}
        {!loading && !valid && (
          <div className="photo-placeholder">
            <span className="photo-placeholder-icon">📷</span>
            <span>No photo</span>
          </div>
        )}
        <span className="pf-corner tl" /><span className="pf-corner tr" />
        <span className="pf-corner bl" /><span className="pf-corner br" />
      </div>
      {name  && <div className="photo-name">{name}</div>}
      {sport && <div className="photo-sport-label">{sport}</div>}
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN FORM COMPONENT
══════════════════════════════════════════════ */
const Field = ({ label, className, children }) => (
  <div className={`field-group ${className || ''}`}>
    <label className="field-label">{label}</label>
    {children}
  </div>
);

export default function FillMemoryForm() {
  const navigate = useNavigate();

  const [userData,    setUserData]    = useState({ name: '', email: '' });
  const [sport,       setSport]       = useState('');
  const [personName,  setPersonName]  = useState('');
  const [description, setDescription] = useState('');
  const [photo,       setPhoto]       = useState(null);
  const [preview,     setPreview]     = useState(null);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState('');
  const [submitted,   setSubmitted]   = useState(false);

  useEffect(() => {
    try {
      const ud = JSON.parse(localStorage.getItem('userData'));
      if (ud) setUserData({ name: ud.name || '', email: ud.email || '' });
      else setError('Please log in to continue.');
    } catch {
      setError('Error loading user data. Please log in again.');
    }
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Please select a valid image file.'); return; }
    if (file.size > 50 * 1024 * 1024)   { setError('Photo must be under 50 MB.'); return; }
    setPhoto(file);
    setError('');
    const reader = new FileReader();
    reader.onload = ev => setPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData.name || !userData.email) { setError('User data not found. Please log in again.'); return; }
    if (!sport || !personName || !description.trim()) { setError('Please fill all required fields.'); return; }
    setLoading(true);
    setError('');
    const fd = new FormData();
    fd.append('selectedSport', sport);
    fd.append('selectedName',  personName);
    fd.append('description',   description.trim());
    fd.append('userName',      userData.name);
    fd.append('userEmail',     userData.email);
    if (photo) fd.append('photo', photo);
    try {
      await axios.post(`${API}/submit`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 60000,
      });
      setSubmitted(true);
    } catch (err) {
      if (err.code === 'ECONNABORTED') setError('Request timed out. Try a smaller file.');
      else if (err.response?.status === 413) setError('File too large. Please reduce size and retry.');
      else setError(err.response?.data?.error || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) { navigate('/response-submitted'); return null; }

  return (
    <div className="fill-page page-enter">

      {/* ── SIDEBAR ── */}
      <aside className="fill-sidebar">
        <div className="fill-sb-logo-row">
          <img src="/iitb-sports-logo.png" alt="IITB Sports" className="login-intro-logo" />

          <div className="fill-sb-brand">
            ISC YEARBOOK
            <small>2026 Season</small>
          </div>
        </div>

        <div className="fill-sb-title">FILL A <span>MEMORY</span></div>
        <p className="fill-sb-desc">
          Share your experiences and moments with the athletes and coaches who made this season unforgettable.
        </p>

        <hr className="gold-rule" />

        <PersonPhoto name={personName} sport={sport} />
      </aside>

      {/* ── MAIN FORM ── */}
      <main className="fill-main">
        <div className="fill-form-header">
          <div className="eyebrow">Yearbook Submission</div>
          <h2>WRITE YOUR MEMORY</h2>
        </div>

        {error && <div className="msg-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">

            {/* Sport selector */}
            <Field label="Select Sport *">
              <select
                className="field-select"
                value={sport}
                onChange={e => { setSport(e.target.value); setPersonName(''); }}
                required
                disabled={loading}
              >
                <option value="">— Choose a sport —</option>
                {Object.keys(SPORTS_PLAYERS).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>

            {/* Person selector */}
            <Field label="Select Athlete / Council Member *">
              <select
                className="field-select"
                value={personName}
                onChange={e => setPersonName(e.target.value)}
                required
                disabled={loading || !sport}
              >
                <option value="">— Choose a person —</option>
                {sport && SPORTS_PLAYERS[sport].map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </Field>

            {/* Description */}
            <Field label="Write About Them *" className="full">
              <textarea
                className="field-textarea"
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={6}
                required
                disabled={loading}
                placeholder="Share your memories, experiences, or thoughts about this person… What made them special this season?"
              />
            </Field>

            {/* Photo upload */}
            <Field label="Add a Photo — Optional (Max 50 MB)" className="full">
              <div className="upload-zone">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  disabled={loading}
                />
                {!preview ? (
                  <>
                    <div className="upload-zone-icon">📸</div>
                    <p>Click to upload a photo</p>
                    <p className="limit">JPG · PNG · Max 50 MB</p>
                  </>
                ) : (
                  <div className="upload-preview">
                    <img src={preview} alt="preview" />
                    <div className="upload-preview-info">
                      {photo?.name}
                      <span>{photo ? (photo.size / 1024 / 1024).toFixed(2) + ' MB' : ''}</span>
                    </div>
                  </div>
                )}
              </div>
            </Field>
          </div>

          <div className="form-submit-row">
            {loading && <span className="form-submit-note">Uploading — this may take a moment…</span>}
            <button
              className="btn-gold"
              type="submit"
              disabled={loading || !userData.name}
            >
              {loading
                ? <><span className="spinner" /> Submitting…</>
                : 'Submit Memory →'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}