import { faCheck, faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import bcrypt from "bcryptjs";

const REGISTER_URL = "/register";

const Register = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const salt = await bcrypt.genSalt();
      const hashed = bcrypt.hashSync(pwd, salt);
      const response = await axios.post(REGISTER_URL, { email: user, password: hashed });
      if (response?.data?.code === "success") {
        const roles = response?.data?.role;
        setAuth({ user, hashed, roles });
        navigate("/login", { replace: true });
      } else {
        alert("Email already exists");
      }
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username taken");
      } else {
        setErrMsg("Registration failed");
      }
      errRef.current.focus();
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
            <h1>Register</h1>
            <form className="start-form" onSubmit={handleSubmit}>
              <label className="start-label" htmlFor="username">Email:</label>
              <input
                className="input-username"
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />

              <label className="start-label" htmlFor="password">Password:</label>
              <input
                className="input-password"
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <label className="start-label" htmlFor="confirm_pwd">Confirm Password:</label>
              <input
                className="input-password"
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
            
              <button className="start-button" disabled={!validMatch}>Sign Up</button>
            </form>
            <p>
              Already registered?
              <br />
              <span className="start-line">
                <Link to="/signin">Sign In</Link>
              </span>
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Register;
