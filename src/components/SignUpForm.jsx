import { useState } from "react";
import { useNavigate } from "react-router-dom";

/*
  SignUpForm Component:
  This component renders a registration form that allows users to create or edit their profile.
  It manages state for all profile fields: name, student number, campus, email, password, interests,
  bio, profile picture (avatar), and agreement to terms.
  The form pre-fills fields from localStorage if profile data exists, enabling editing.
  Various validations are performed on submit, such as required fields, email format, password match,
  minimum lengths, and terms acceptance.
  Upon successful validation, profile data is saved to localStorage, and the user is redirected to the profile page.
  It also supports previewing an uploaded profile picture and selecting multiple interests via checkboxes.
*/
function SignUpForm() {
  const navigate = useNavigate();
  const savedData = JSON.parse(localStorage.getItem("profileData")) || {};

  // State for all fields
  const [name, setName] = useState(savedData.name || "");
  const [studentNumber, setStudentNumber] = useState(savedData.studentNumber || "");
  const [campus, setCampus] = useState(savedData.campus || "");
  const [email, setEmail] = useState(savedData.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [interests, setInterests] = useState(savedData.interests || []);
  const [bio, setBio] = useState(savedData.bio || "");
  const [terms, setTerms] = useState(false);
  const [avatar, setAvatar] = useState(savedData.avatar || "");
  const [error, setError] = useState("");

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  // Handle interests checkboxes
  const handleInterestChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setInterests([...interests, value]);
    } else {
      setInterests(interests.filter((i) => i !== value));
    }
  };

  // Validation + Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validations
    if (!name.trim()) return setError("Full Name is required.");
    if (!/^\d{6,}$/.test(studentNumber)) return setError("Student Number must be at least 6 digits.");
    if (!campus) return setError("Please select a campus.");
    if (!email.includes("@")) return setError("Valid email is required.");
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (password !== confirmPassword) return setError("Passwords do not match.");
    if (interests.length < 1) return setError("Select at least one interest.");
    if (bio.trim().length < 20) return setError("Bio must be at least 20 characters.");
    if (!terms) return setError("You must accept the Terms and Conditions.");

    // Save profile data
    localStorage.setItem(
      "profileData",
      JSON.stringify({ name, studentNumber, campus, email, interests, bio, avatar })
    );
    navigate("/profile");
  };

  return (
    <div className="signup-form">
      <h1>{savedData.name ? "Edit Your Profile" : "Create Your Account"}</h1>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div>
          <label>Full Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div>
          <label>Student Number:</label>
          <input type="text" value={studentNumber} onChange={(e) => setStudentNumber(e.target.value)} required />
        </div>

        <div>
          <label>Campus:</label>
          <select value={campus} onChange={(e) => setCampus(e.target.value)} required>
            <option value="">-- Select Campus --</option>
            <option value="Johannesburg">Johannesburg</option>
            <option value="Pretoria">Pretoria</option>
            <option value="Durban">Durban</option>
            <option value="Cape Town">Cape Town</option>
          </select>
        </div>

        <div>
          <label>Email Address:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div>
          <label>Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>

        <div>
          <label>Interests:</label><br />
          <label><input type="checkbox" value="Programming" onChange={handleInterestChange} /> Programming</label><br />
          <label><input type="checkbox" value="Design" onChange={handleInterestChange} /> Design</label><br />
          <label><input type="checkbox" value="Data Science" onChange={handleInterestChange} /> Data Science</label><br />
          <label><input type="checkbox" value="Networking" onChange={handleInterestChange} /> Networking</label><br />
          <label><input type="checkbox" value="Cybersecurity" onChange={handleInterestChange} /> Cybersecurity</label>
        </div>

        <div>
          <label>Short Bio:</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} required />
        </div>

        <div>
          <label>Profile Picture:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {avatar && <img src={avatar} alt="Preview" width="80" style={{ marginTop: "10px", borderRadius: "50%" }} />}
        </div>

        <div>
          <label>
            <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} /> I agree to the Terms and Conditions
          </label>
        </div>

        <button type="submit">{savedData.name ? "Save Changes" : "Register"}</button>
      </form>
    </div>
  );
}

export default SignUpForm;
