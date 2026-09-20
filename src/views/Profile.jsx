// src/views/Profile.jsx
import { useLocation, useNavigate } from "react-router-dom";

/*
  Profile Component:
  This component displays a detailed preview of a user's profile.
  It retrieves profile data either from React Router's location state (if passed)
  or from localStorage as a fallback.
  If no profile data is found, it prompts users to register first.

  The profile preview includes an optional avatar, full name, student number,
  campus, email, a short bio presented in a styled card, and interests shown as tags.
  An "Edit Profile" button allows navigation to the signup/edit page.
*/
function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  const stateData = location.state;
  const storedData = JSON.parse(localStorage.getItem("profileData")) || {};
  const data = stateData || storedData;

  if (!data.name) {
    return <p>No profile data found. Please register first.</p>;
  }

  return (
    <div className="card accent profile-card">
      <h1>👤 Profile Preview</h1>

      {data.avatar && (
        <img
          src={data.avatar}
          alt="Profile"
          width="120"
        />
      )}

      <div className="profile-info">
        <p><strong>Full Name:</strong> {data.name}</p>
        <p><strong>Student Number:</strong> {data.studentNumber}</p>
        <p><strong>Campus:</strong> {data.campus}</p>
        <p><strong>Email:</strong> {data.email}</p>

        {/* Short Bio inside a styled card */}
        <div className="card accent bio-card">
          <strong>Short Bio:</strong>
          <p>{data.bio}</p>
        </div>

        {/* Interests styled as tags */}
        <div>
          <strong>Interests:</strong>
          {data.interests && data.interests.length > 0 ? (
            <ul>
              {data.interests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          ) : (
            <p>No interests selected.</p>
          )}
        </div>
      </div>

      <button onClick={() => navigate("/signup")}>Edit Profile</button>
    </div>
  );
}

export default Profile;

