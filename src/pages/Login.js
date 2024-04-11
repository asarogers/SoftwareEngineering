import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import AmmuLogo from "../components/imgs/aamu_logo.jpg";
import About from "./About";

function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showAbout, setShowAbout] = useState(true);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/login", { user, pwd });
      const { code, message, user: loggedInUser, roles } = response.data;

      if (code === "success") {
        setAuth({ roles, user: loggedInUser });
        navigate("/", { replace: true });
      } else {
        setErrMsg(message);
      }
    } catch (error) {
      if (!error.response) {
        setErrMsg("No server response");
      } else if (error.response.status === 401) {
        setErrMsg(error.response.data);
      } else {
        setErrMsg("Login failed");
      }
      errRef.current.focus();
    }
  };

  const handleCloseAbout = () => {
    setShowAbout(false);
  };

  return (
    <>
      <div className="start-body">
        <div className="start-container">
          <div className="aamu-logo-left ">
            <img
              src={AmmuLogo}
              style={{ width: "inherit", height: "inherit" }}
              alt="Ammu Logo"
            />
          </div>
          <div className="aamu-logo algin-right">
            <img
              src={AmmuLogo}
              style={{ width: "inherit", height: "inherit" }}
              alt="Ammu Logo"
            />
          </div>
          <section className="start-section">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <form className="start-form" onSubmit={handleSubmit}>
              <div className="signin-title"> Sign In</div>
              <label className="start-label" htmlFor="username">
                Email:
              </label>
              <input
                className="input-username"
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />
              <label className="start-label" htmlFor="password">
                Password:
              </label>
              <input
                className="input-password"
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
              <a className="forgot-password" href="/forgot">
                Forgot Password?
              </a>
              <button className="start-button" type="submit">
                Login
              </button>
            </form>
            <span className="start-text">New to our website?</span>
            <button className="start-create">
              <Link to={"/Registration"}>CREATE AN ACCOUNT</Link>
            </button>
          </section>
        </div>
      </div>
      {showAbout && <About onClose={handleCloseAbout} />}
    </>
  );
}

export default Login;