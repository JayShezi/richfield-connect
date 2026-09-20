import { Link } from "react-router-dom";
import ProfilePreview from "../components/ProfilePreview";
import "./Home.css";

/*
  Home Component:
  This component serves as the main landing page for Richfield Connect. 
  It includes several sections:
  - The Richfield logo displayed prominently at the top.
  - A hero section welcoming users and describing the platform's purpose.
  - A features section with interactive cards highlighting the core functionalities:
    Connect, Share, Preview Profiles, and Profile Snapshot, each linking to relevant pages.
  - A mini profile preview that displays a snapshot of the current user's profile.
  - A call-to-action section prompting users to register if they haven't already.
  
  Navigation between pages is handled with React Router's Link components for seamless client-side routing.
*/
function Home() {
  return (
    <div className="home">
      <img src="/richfield-logo.png" alt="Richfield Logo" className="richfield-logo" />

      {/* Hero Section */}
      <section className="hero-section">
        <h1>Welcome to Richfield Connect</h1>
        <p>Your platform to connect, share, and grow together.</p>
      </section>

      {/* Features Section */}
      <section className="features-grid">
        <div className="feature-card connect">
          <h2>🤝 Connect</h2>
          <p>Meet fellow students and build your academic network.</p>
          <Link to="/feed" className="feature-btn">Go to Feed</Link>
        </div>

        <div className="feature-card share">
          <h2>📝 Share</h2>
          <p>Post updates, ideas, and collaborate on projects.</p>
          <Link to="/feed" className="feature-btn">Start Sharing</Link>
        </div>

        <div className="feature-card preview">
          <h2>👤 Preview Profiles</h2>
          <p>Discover peers and explore their interests.</p>
          <Link to="/profile" className="feature-btn">View Profiles</Link>
        </div>

        <div className="feature-card snapshot">
          <h2>📋 Profile Snapshot</h2>
          <p>See your saved details at a glance.</p>
          <Link to="/profile" className="feature-btn">Go to My Profile</Link>
        </div>
      </section>

      {/* Mini Profile Card */}
      <section className="profile-preview-section">
        <ProfilePreview />
      </section>

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
