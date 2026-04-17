import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Al-ALIA school
        </Link>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/checkout">dashboard</Link>
        </div>
        <div className="navbar-auth">
          <div className="navbar-auth-links">
            <Link to="/auth" className="login-btn">
              Login
            </Link>
            <Link to="/auth" className="register-btn">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
