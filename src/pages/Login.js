import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      axios.post("/login", { pwd: pwd, user: user }).then((response) => {
        const { user, roles } = response.data;
        setAuth({ roles, user });
        navigate("/", { replace: true });
        ////console.log(roles, user)
      });
    } catch (error) {
      setErrMsg("Invalid username or password");
    }
  };

  return (
    <>
      <div className="start-body">
        <Navbar />
        <div className="start-container">
          <section className="start-section">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
              {errMsg}
            </p>
            <h1>Sign In</h1>
            <form className="start-form" onSubmit={handleSubmit}>
              <label className="start-label" htmlFor="username">Username:</label>
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
              <label className="start-label" htmlFor="password">Password:</label>
              <a className="forgot-password" href="/forgot">Forgot Password?</a>
              <input
                className="input-password"
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
              <button className="start-button" type="submit">Sign In</button>
            </form>
            <span className="start-text">New to Exclusive Rewards?</span>
            <button className="start-create">
              <Link to={"/Registration"}>CREATE AN ACCOUNT</Link>
            </button>
          </section>
        </div>
      </div>
    </>
  );
}

export default Login;
