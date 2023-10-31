import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import useAuth from "../hooks/useAuth";

function Login(props) {
  const { data, setData } = props;
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; //get where the user came from

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (user === "user1" && pwd === "password1") {
      const roles = 2001;
      setAuth({ roles, user });
      navigate("/", { replace: true });
    }
  };
  return (
    <>
      <div className="start-body">
      <Navbar />
        <div className="start-container">
          <section className="start-section">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <label className="start-label" htmlFor="password">
              <h1>Sign In</h1>
            </label>
            <form className="start-form" onSubmit={handleSubmit}>
              <label className="start-label" htmlFor="username">
                Username:
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

              <button className="start-button">Sign In</button>
            </form>
            <span className="start-text">New to Tubmate?</span>
            <button
              className="start-create start-button"
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign Up
            </button>
          </section>
        </div>
      </div>
    </>
  );
}

export default Login;
