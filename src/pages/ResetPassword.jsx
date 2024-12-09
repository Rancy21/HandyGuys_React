import React, { useState } from "react";
import { Lock, Mail } from "lucide-react";
import axios from "axios";

const ResetPassword = () => {
    const [isStep1, setSetp1] = useState(true);
    const [isStep2, setSetp2] = useState(false);
    const [isStep3, setSetp3] = useState(false);

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [OTP, setOTP] = useState();
    const [serverOTP, setServerOTP] = useState();

    const handleSubmit1 = async (e) => {
        e.preventDefault();
        setError(false);
    
        try {

          const response = await fetch(
            `http://localhost:8080/users/getUser?email=${email}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status == 404)
          {
            setErrorMessage("Email not found");
            throw new Error("Email not found");
          }
          else if (!response.ok) {
            setErrorMessage("Sorry, something went wrong");
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          else{
            const getOtp = await axios.get(`http://localhost:8080/users/sendOTPbyEmail?to=${email}`);
            setServerOTP(getOtp.data.otp);
            console.log("OTP sent " + serverOTP);
            setSetp1(false);
            setSetp2(true);
            // const response2 = await fetch(
            //     `http://localhost:8080/users/sendOTPbyEmail?to=${email}`,
            //     {
            //       method: "GET",
            //       headers: {
            //         "Content-Type": "application/json",
            //       },
            //     }
            //   );
            //    if (!response2.ok) {
            //     setErrorMessage("Sorry, something went wrong");
            //     throw new Error(`HTTP error! status: ${response.status}`);
            //   }
            //   else{
            //     const data = await response2.json();
            //     setServerOTP(data.OTP);
            //     console.log("OTP sent " + serverOTP);
            //     setSetp1(false);
            //     setSetp2(true);
            //   }
          }
        }catch (error) {
        setError(true);
        console.error("Error:", error);
      }
        
    }
    const handleSubmit2 = (e) => {
        e.preventDefault();
        setSetp2(false);
        setSetp3(true);
    }
    const handleSubmit3 = (e) => {
        e.preventDefault();
        setSetp3(false);
        setSetp1(true);
    }

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
          textDecoration: "none",
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
            {error && (
            <p style={{ color: "red", marginBottom: "0.5rem" }}>
              {errorMessage}
            </p>
          )}
          <h2 style={styles.formTitle}>Reset password</h2>
        {isStep1 && (
        <form onSubmit={handleSubmit1}>
            <div style={styles.inputContainer}>
                <Mail style={styles.icon} />
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required />
            </div>

            <p>Enter your email address and we will send you a one time password to confirm your address. </p><br />

            <button
                type="submit"
                style={styles.submitButton}
                onMouseOver={(e) => (e.target.style.backgroundColor =
                    styles.submitButtonHover.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor =
                    styles.submitButton.backgroundColor)}
            >
                Send
            </button>
        </form>
    )}
    {isStep2 && (
        <form onSubmit={handleSubmit2}>
            <div style={styles.inputContainer}>
                <Lock style={styles.icon} />
                <input
                    type="number"
                    placeholder="OTP"
                    value={OTP}
                    onChange={(e) => setOTP(e.target.value)}
                    style={styles.input}
                    required />
            </div>

            <button
                type="submit"
                style={styles.submitButton}
                onMouseOver={(e) => (e.target.style.backgroundColor =
                    styles.submitButtonHover.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor =
                    styles.submitButton.backgroundColor)}
            >
                Send
            </button>
        </form>
    )}
    {isStep3 && (
        <form onSubmit={handleSubmit3}>
            <div style={styles.inputContainer}>
                <Lock style={styles.icon} />
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required />
            </div>
            <div style={styles.inputContainer}>
                <Lock style={styles.icon} />
                <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={styles.input}
                    required />
            </div>

            <button
                type="submit"
                style={styles.submitButton}
                onMouseOver={(e) => (e.target.style.backgroundColor =
                    styles.submitButtonHover.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor =
                    styles.submitButton.backgroundColor)}
            >
                Reset Password
            </button>
        </form>
    )}
          

          
        </div>
      </div>
    </div>
  )
}

export default ResetPassword