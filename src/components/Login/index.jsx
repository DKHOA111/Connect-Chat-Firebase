import React, { useContext, useEffect } from "react";
import "./style.css";
import { auth, googleProvider } from "../../firebase/Config";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
const cookies = new Cookies();

const Login = () => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const signInGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      console.log({ res });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="start-page">
      <div className="login-box">
        <div className="head-login">
          <h3>CONNECT CHAT</h3>
          &nbsp;
          <img src="/logo.png" alt="logo" />
          &nbsp;
          <span>
            Welcome to ConnectChat – where every conversation becomes a seamless
            and delightful experience!
          </span>
        </div>
        <div className="login">
          <div className="login-btn g" onClick={signInGoogle}>
            <i className="fa-brands fa-google"></i> &nbsp; Login with google
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
