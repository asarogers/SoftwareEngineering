import { faCheck, faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from '../api/axios';
import useAuth from "../hooks/useAuth";
import bcrypt from 'bcryptjs';



const REGISTER_URL = '/register';

const Register = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        console.log("Register")

        try {
            const salt = await bcrypt.genSalt();
            const hashed = bcrypt.hashSync(pwd, salt);
            axios.post(REGISTER_URL, { email: user, password: hashed }).then(response => {

                if (response?.data?.code === "success") {
                    
                    const roles = response?.data?.role;
                    //const accessToken = response?.data?.accessToken;
                    setAuth({ user, hashed, roles });
                    navigate("/cart", { replace: true })
                    //console.log("success")
                } else {
                    console.log("failed")
                    alert("email already exist")
                }
                setUser('');
                setPwd('');
                setMatchPwd('');
            })

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            <div className='start-body'>
                    < Navbar/>
                <div className="start-container">
                    <section className="start-section">
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1>Register</h1>
                        <form className="start-form" onSubmit={handleSubmit}>
                            <label className="start-label" htmlFor="username">
                                Email:
                            </label>
                            <input className='input-username'
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



                            <label className="start-label" htmlFor="password">
                                Password:
                                <FontAwesomeIcon icon={faCheck} className={"hide"} />
                            </label>
                            <input className='input-password'
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
                            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters, a number and a special character.<br />
                                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>


                            <label className="start-label" htmlFor="confirm_pwd">
                                Confirm Password:
                                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                            </label>
                            <input className='input-password'
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
                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Must match the first password input field.
                            </p>

                            <button className="start-button" disabled={!validMatch ? true : false}>Sign Up</button>
                        </form>
                        <p>
                            Already registered?<br />
                            <span className="start-line">
                                <Link to="/signin">Sign In</Link>
                            </span>
                        </p>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Register
