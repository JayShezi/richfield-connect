import { Link } from "react-router-dom";
import ProfilePreview from "../components/ProfilePreview";
import "./Home.css"; // 👈 make sure you create this file for styling

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Welcome to Richfield Connect</h1>
        <p>Your platform to connect, share, and grow together.</p>
      </section>

      {/* Features Section (Enhanced with clickable cards) */}
      <section className="features-grid">
        <div className="feature-card">
          <h2>🤝 Connect</h2>
          <p>Meet fellow students and build your academic network.</p>
          <Link to="/feed" className="feature-btn">Go to Feed</Link>
        </div>

        <div className="feature-card">
          <h2>📝 Share</h2>
          <p>Post updates, ideas, and collaborate on projects.</p>
          <Link to="/feed" className="feature-btn">Start Sharing</Link>
        </div>

        <div className="feature-card">
          <h2>👤 Preview Profiles</h2>
          <p>Discover peers and explore their interests.</p>
          <Link to="/profile" className="feature-btn">View Profiles</Link>
        </div>

        <div className="feature-card">
          <h2>📋 Profile Snapshot</h2>
          <p>See your saved details at a glance.</p>
          <Link to="/profile" className="feature-btn">Go to My Profile</Link>
        </div>
      </section>

      {/* Mini Profile Card */}
      <ProfilePreview />

      {/* Call to Action */}
      <section className="cta">
        <Link to="/signup">
          <button className="register-btn">Register Now</button>
        </Link>
      </section>
    </div>
  );
}

export default Home;
