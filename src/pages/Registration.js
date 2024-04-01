import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import bcrypt from "bcryptjs";
import building from "../components/imgs/building.png";
import signInIcon from "../components/imgs/SignIn.png";
import emailIcon from "../components/imgs/envelope-solid.svg";
import lockIcon from "../components/imgs/lock-solid.svg";

const REGISTER_URL = "/register";

const Register = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");

  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState("");

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
    
    
    if (pwd === confirmPwd){
      try {
        const salt = await bcrypt.genSalt();
        const hashed = bcrypt.hashSync(pwd, salt);
        const response = await axios.post(REGISTER_URL, {
          email: email,
          password: hashed,
         });
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
    }
  };
  
  return (
    <>
      <div className="start-body">
        <Navbar />
        <div className="register-container">
          <h1 className="register-title">Welcome to ESDIR</h1>
          <section className="register-body">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <section className="register-left-container float-left">
              <div className="grey-bar"></div>
              <p className="register-text">Glad to see you again!</p>
              <div className="image-container">
                <img
                  className="register-image"
                  src={building}
                  alt="Building Image"
                />
                <span className="start-line">
                  <Link to="/login">Sign In</Link>
                </span>
              </div>
            </section>

            <section className="float-right">
              <h2 className="create-account-text">Create Account</h2>
              <form className="register-form">
                <div className="account-item">
                  <div className="image-holder">
                    <img
                      className="account-image"
                      src={signInIcon}
                      alt="Sign In Icon"
                    />
                  </div>

                  <input
                    className="account-input"
                    placeholder="First Name"
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
                </div>
                <div className="account-item">
                  <div className="image-holder">
                    <img
                      className="account-image"
                      src={emailIcon}
                      alt="Sign In Icon"
                    />
                  </div>

                  <input
                    className="account-input"
                    placeholder="Email"
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </div>
                <div className="account-item">
                  <div className="image-holder">
                    <img
                      className="account-image"
                      src={lockIcon}
                      alt="Sign In Icon"
                    />
                  </div>
                  <input
                    placeholder="Password"
                    className="account-input"
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
                </div>
                <div className="account-item">
                  <div className="image-holder">
                    <img
                      className="account-image"
                      src={lockIcon}
                      alt="Sign In Icon"
                    />
                  </div>

                  <input
                    placeholder="Confirm Password"
                    className="account-input"
                    type="password"
                    id="password"
                    onChange={(e) => setConfirmPwd(e.target.value)}
                    value={confirmPwd}
                    required
                  />
                </div>
                <div className="btn-container-dark">
                  <button
                    className="register-button-dark"
                    onClick={handleSubmit}
                  >
                    Register
                  </button>
                </div>
              </form>
            </section>
          </section>
        </div>
      </div>
    </>
  );
};

export default Register;
