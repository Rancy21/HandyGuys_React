import React, { useEffect, useState } from "react";
import { User, Lock, Mail } from "lucide-react";
import { useFetch } from "./useFetch ";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

   const [userData, setData] = useState(null); // State to store data


  // const handleSubmit = async () => {
  //   const { data, error, loading } = useFetch("http://localhost:8080/users/getUser?email=" + email);
  //   setError(error);
  //   setLoading(loading);

  //   if (data != null) {
  //     if (data.password == password) {
  //       // User is authenticated
  //       localStorage.setItem("token", data.token);
  //       console.log("user: " + data);
  //       setError()
  //     } else {
  //       setError("Incorrect password");
  //     }
  //   } else {
  //     setError("User not found");
  //   }
  // };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setLoading(true);
    setError(false);
    setIsLogin(true);

    try{
      const response = await fetch('http://localhost:8080/users/getUser?email=' + email);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setData(data);
      if(data.password === password){
        localStorage.setItem('token', data.token);
        console.log('User authenticated');
        setError(false);
      } else {
        setError('Incorrect password');
      }
    }

  };

  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
    },
    sidebar: {
      width: "50%",
      backgroundColor: "#2e613c",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      textAlign: "center",
    },
    formContainer: {
      width: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    formWrapper: {
      backgroundColor: "white",
      padding: "3rem",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      width: "500px",
    },
    formTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "1.5rem",
      textAlign: "center",
      color: "#1c3b6a",
    },
    inputContainer: {
      position: "relative",
      marginBottom: "1rem",
    },
    input: {
      width: "100%",
      padding: "0.75rem 0.75rem 0.75rem 2.5rem",
      border: "2px solid #d1d5db",
      borderRadius: "8px",
      outline: "none",
    },
    inputFocus: {
      borderColor: "#408953",
    },
    icon: {
      position: "absolute",
      left: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#9ca3af",
    },
    submitButton: {
      width: "100%",
      padding: "0.75rem",
      backgroundColor: "#408953",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    submitButtonHover: {
      backgroundColor: "#2e613c",
    },
    switchText: {
      textAlign: "center",
      marginTop: "1.5rem",
      color: "#4b5563",
    },
    switchLink: {
      color: "#1c3b6a",
      fontWeight: "bold",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            HandyGuys
          </h1>
          <p style={{ fontSize: "1.25rem" }}>
            Connect with skilled professionals
          </p>
        </div>
      </div>

      <div style={styles.formContainer}>
        <div style={styles.formWrapper}>
          <h2 style={styles.formTitle}>
            {isLogin ? "Login to HandyGuys" : "Create an Account"}
          </h2>

          <p style={{ color: "red", marginBottom: "0.5rem" }}>Error: {error}</p>
          <p>Loading state: {loading ? "Loading" : "not loading"}</p>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div style={styles.inputContainer}>
                <User style={styles.icon} />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={styles.input}
                  required={!isLogin}
                />
              </div>
            )}

            <div style={styles.inputContainer}>
              <Mail style={styles.icon} />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputContainer}>
              <Lock style={styles.icon} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <button
              type="submit"
              style={styles.submitButton}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor =
                  styles.submitButtonHover.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor =
                  styles.submitButton.backgroundColor)
              }
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div style={styles.switchText}>
            <p>
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <span
                style={styles.switchLink}
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign Up" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
