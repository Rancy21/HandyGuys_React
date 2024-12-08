import React, { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { getToday } from "../components/Helper";
import { useNavigate } from "react-router";
import axios from "axios";
import "../css/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`http://localhost:8080/users/getUser`, {
        params: { email },
        headers: { "Content-Type": "application/json" },
      });

      const data = response.data;
      setUserData(data);

      if (data.password === password) {
        localStorage.setItem("token", data.token);

        const tracker = { date: getToday() };
        const trackerResponse = await axios.post(
          `http://localhost:8080/loginTracker/saveTracker`,
          tracker,
          {
            params: { userEmail: email },
            headers: { "Content-Type": "application/json" },
          }
        );

        navigate("/home");
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

          <div className="login-switchText">
            <p>
              Don't have an account?{" "}
              <a href="/sign" className="login-switchLink">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
