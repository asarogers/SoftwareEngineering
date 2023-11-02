import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <div id="body" className="navbar">
        <Link to="/" className="visit">
          home
        </Link>
        <Link to="/About" className="visit">
          About
        </Link>
        <Link to="/CartPage" className="visit">
          CartPage
        </Link>
        <Link to="/Registration" className="visit">
          Registration
        </Link>
      </div>
      <div className="navbar"></div>
    </div>
  );
}
