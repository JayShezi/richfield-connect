import { Link } from "react-router-dom";

/*
  Navbar Component:
  This component renders the main navigation bar for the application.
  It includes the Richfield logo which links to the home page, 
  and a list of navigation links to key pages such as Home, About, Sign Up, Profile, and Feed.
  The links use React Router's Link component to enable client-side routing without page reloads.
*/
function Navbar() {
  return (
    <nav>
      <Link to="/">
        <img src="/richfield-logo.png" alt="Richfield Logo" className="navbar-logo" />
      </Link>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/feed">Feed</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;

