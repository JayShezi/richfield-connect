import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./views/Home";
import About from "./views/About";          // 👈 import About
import SignUpForm from "./components/SignUpForm";
import Profile from "./views/Profile";
import Feed from "./views/Feed";            // 👈 import Feed

import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <Router>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>     {/* 👈 add About link */}
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/feed">Feed</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />   {/* 👈 add About route */}
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>

        <footer>Footer</footer>
      </Router>
    </AppProvider>
  );
}

export default App;




