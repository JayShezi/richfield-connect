function ProfilePreview() {
  const storedData = JSON.parse(localStorage.getItem("profileData")) || {};
  const { name, email } = storedData;

  if (!name || !email) {
    return null; // don’t show anything if no profile yet
  }

  return (
    <div className="profile-card" style={{ maxWidth: "250px", margin: "20px auto" }}>
      <h2>👤 Profile Snapshot</h2>
      <div className="profile-info">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
      </div>
    </div>
  );
}

export default ProfilePreview;


