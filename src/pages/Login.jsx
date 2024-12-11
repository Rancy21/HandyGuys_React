import React, { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { getToday } from "../components/Helper";
import { useNavigate } from "react-router";
import axios from "axios";
import "../css/login.css";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/userSlice";
import { persistor } from "../store/store";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);

  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);

  const [OTP, setOTP] = useState("");
  const [serverOTP, setServerOTP] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`http://localhost:8080/users/getUser`, {
        params: { email },
        headers: { "Content-Type": "application/json" }
      });

      const data = response.data;
      setUserData(data);

      if (data.password === password) {
        localStorage.setItem("token", data.token);

        const getOtp = await axios.get(
          `http://localhost:8080/users/sendOTPbyEmail?to=${email}&condition=login`
        );
        setServerOTP(getOtp.data.otp);
        console.log("OTP sent " + getOtp.data.otp);
        setStep1(false);
        setStep2(true);
        setLoading(false);
        dispatch(login({ user: data }));
      } else {
        setError("Incorrect password");
      }
    } catch (error) {
      setError(
        `Error: ${error.response ? error.response.data : error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const onOTPsubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (OTP == serverOTP) {
      try {
        const tracker = { date: getToday() };
        const response = await axios.post(
          `http://localhost:8080/loginTracker/saveTracker`,
          tracker,
          {
            params: { userEmail: email },
            headers: { "Content-Type": "application/json" }
          }
        );
        if (userData.email == "Larryckontsandaga21@gmail.com") {
          navigate("/users");
        } else if (userData.isHandy == true) {
          navigate("/profile");
        } else {
          navigate("/home");
        }
      } catch (error) {
        setError(
          `Error: ${error.response ? error.response.data : error.message}`
        );
      } finally {
        setLoading(false);
      }
    } else {
      setError(true);
      setError("Invalid OTP");
      setLoading(false);
      dispatch(logout());
      persistor.purge();
    }
  };

  return (
    <div className="login-container">
      <div className="login-sidebar">
        <div>
          <h1 className="login-sidebar-title">HandyGuys</h1>
          <p className="login-sidebar-text">
            Connect with skilled professionals
          </p>
        </div>
      </div>

      <div className="login-formContainer">
        <div className="login-formWrapper">
          <h2 className="login-formTitle">Login to HandyGuys</h2>

          {error && <p className="login-error">{error}</p>}

          {step1 && (
            <form onSubmit={handleSubmit}>
              <div className="login-inputContainer">
                <Mail className="login-icon" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="login-input"
                  required
                />
              </div>

              <div className="login-inputContainer">
                <Lock className="login-icon" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login-input"
                  required
                />
              </div>

              <button
                type="submit"
                className="login-submitButton"
                onMouseOut={(e) => (e.target.className = "login-submitButton")}
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </form>
          )}

          {step2 && (
            <form onSubmit={onOTPsubmit}>
              <div className="login-switchText">
                <p>
                  Enter the One Time Password (OTP) that was sent to your email
                  address.
                </p>
                <br />
              </div>
              <div className="login-inputContainer">
                <Lock className="login-icon" />
                <input
                  type="number"
                  placeholder="OTP"
                  value={OTP}
                  onChange={(e) => setOTP(e.target.value)}
                  className="login-input"
                  required
                />
              </div>

              <button
                type="submit"
                className="login-submitButton"
                onMouseOut={(e) => (e.target.className = "login-submitButton")}
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </form>
          )}

          <div className="login-switchText">
            <p>
              Don't have an account?{" "}
              <a href="/sign" className="login-switchLink">
                Sign Up
              </a>
            </p>
          </div>
          {step1 && (
            <div className="login-switchText">
              <p>
                <a href="/reset" className="login-switchLink">
                  Forgot Password?
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
