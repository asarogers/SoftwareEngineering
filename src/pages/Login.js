import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "../api/axios"
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
    // axios.get("/read-all")
    //     .then((response) => {
    //       console.log(response.data)
    //     })

  }, []);


  useEffect(() => {
    console.log(auth);
  }, [auth]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // if (user === "user1" && pwd === "password1") {
    //   console.log("works")
    //   const roles = 2001;
    //   setAuth({ roles, user });
    //   navigate("/", { replace: true });

    // }
    axios.get("/get-data").then((response) => {
      console.log(response.data)
  })
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
            <h1>Sign In</h1>
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
              <a className="forgot-password" href="/forgot">
                Forgot Password?
              </a>
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
            <span className="start-text">New to Exclusive Rewards?</span>
            <button className="start-create">
              {" "}
              <Link to={"/Registration"}>CREATE AN ACCOUNT</Link>
            </button>
          </section>
        </div>
      </div>
    </>
  );
}

export default Login;
