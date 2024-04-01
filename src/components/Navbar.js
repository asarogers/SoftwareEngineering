import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div id="body" className="navbar">
      {/*menu controls the menu container*/}
      <div className="menu">
        <span>
          {/* this is the menu bar*/}
          <i className="fa fa-bars onscreen" aria-hidden="true"></i>
        </span>
      </div>
      <div className="exclusive-text">
        <div className="exclusive">
          <Link to="/" className="visit">
            Home
          </Link>
        </div>{" "}
      </div>
      <div className="Order-text">
        <div>
          <Link to="/About" className="visit">
            About
          </Link>
        </div>
      </div>
      <div className="payment-text offscreen">
        <div>
          <Link to="/CartPage" className="visit">
            Cart Page
          </Link>
        </div>
      </div>
      <div className="call-text">
        <div>
          <Link to="/AdminPage" className="visit">
            Admin Page
          </Link>
        </div>
      </div>
      <div className="call-text">
        <div>
          <Link to="/Registration" className="visit">
            Registration
          </Link>
        </div>
      </div>{" "}
      <div className="call-text">
        <div>
          <Link to="/Login" className="visit">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
