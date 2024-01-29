// Importing FontAwesome icons and necessary React and routing-related dependencies
import { faCheck, faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Importing components and libraries
import Navbar from "../components/Navbar";
import axios from '../api/axios';
import useAuth from "../hooks/useAuth";
import bcrypt from 'bcryptjs';

// Defining the URL for user registration
const REGISTER_URL = '/register';

// React functional component for the registration page
export default function Register(){
  // Hook for navigation
  const navigate = useNavigate();
  // Hook for managing authentication state
  const { setAuth } = useAuth();

  // Refs for DOM elements
  const userRef = useRef();
  const errRef = useRef();

  // State variables for user input and form validation
  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState(''); // Error message for displaying registration errors
  // Success state (unused in the provided code)
  // const [success, setSuccess] = useState(false);

  // useEffect to focus on the username input when the component mounts
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // useEffect to update the validation for matching passwords when they change
  useEffect(() => {
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  // useEffect to reset error message when user input changes
  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Hashing the password using bcrypt
      const salt = await bcrypt.genSalt();
      const hashed = bcrypt.hashSync(pwd, salt);

      // Sending registration request to the server
      const response = await axios.post(REGISTER_URL, { email: user, password: hashed });

      if (response?.data?.code === "success") {
        // If registration is successful, set authentication state and navigate to the cart page
        const roles = response?.data?.role;
        setAuth({ user, hashed, roles });
        navigate("/login", { replace: true });
      } else {
        // If registration fails, display an alert and reset user input
        console.log("failed");
        alert("Email already exists");
      }

      // Resetting user input fields
      setUser('');
      setPwd('');
      setMatchPwd('');
    } catch (err) {
      // Handling registration errors
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }
      // Focusing on the error message for screen readers
      errRef.current.focus();
    }
  }

  // JSX for the registration page
  return (
    <>
      <div className='start-body'>
        <Navbar />
        <div className="start-container">
          <section className="start-section">
            {/* Error message for displaying registration errors */}
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            {/* Form for user registration */}
            <form className="start-form" onSubmit={handleSubmit}>
              {/* Username input field */}
              <label className="start-label" htmlFor="username">
                Email:
              </label>
              <input
                className='input-username'
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

              {/* Password input field */}
              <label className="start-label" htmlFor="password">
                Password:
                <FontAwesomeIcon icon={faCheck} className={"hide"} />
              </label>
              <input
                className='input-password'
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
              {/* Password instructions */}
              <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.<br />
                Must include uppercase and lowercase letters, a number, and a special character.<br />
                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
              </p>

              {/* Confirm Password input field */}
              <label className="start-label" htmlFor="confirm_pwd">
                Confirm Password:
                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
              </label>
              <input
                className='input-password'
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
              {/* Confirm Password instructions */}
              <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p>

              {/* Submit button */}
              <button className="start-button" disabled={!validMatch}>Sign Up</button>
            </form>

            {/* Already registered link */}
            <p>
              Already registered?<br />
              <span className="start-line">
                <Link to="/Login">Sign In</Link>
              </span>
            </p>
          </section>
        </div>
      </div>
    </>
  )
}