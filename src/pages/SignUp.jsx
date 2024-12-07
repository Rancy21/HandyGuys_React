import React, { useEffect, useState } from "react";
import { User, Lock, Mail, Phone } from "lucide-react";
import "../css/sign.css";
import { useNavigate } from "react-router";
import { getToday } from "../components/Helper";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [canLogin, setCanLogin] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    isHandy: false,
    skill: { category: "", description: "" },
  });
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(
          "http://localhost:8080/skill/getCategories"
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch categories: status: ${response.status}`
          );
        }

        const result = await response.json();
        setCategories(result);
      } catch (error) {
        setError(true);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, [categories]);

  const [saved, setSaved] = useState(false);

  const [isLogin, setIsLogin] = useState(false);

  //   const categories = [
  //     "ELECTRICIAN",
  //     "Plumbing",
  //     "Cleaning",
  //     "PAINTER",
  //     "GARDENER",
  //     "HVAC",
  //   ];

  const saveUser = async () => {
    setLoading(true);
    const userData = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      isHandy: formData.isHandy,
      signUpDate: getToday(),
    };

    try {
      const response = await fetch(`http://localhost:8080/users/saveUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const responseError = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status} ${responseError}`
        );
      }

      const data = response.json();
      // Handle successful response based on your backend's response structure
      //   localStorage.setItem("token", data.token);
      console.log(data);
      console.log("user saved successfully");
      setSaved(true);
      setCanLogin(true);
      setError(false);
    } catch (error) {
      setError(true);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }

    return true;
  };

  const saveSkill = async () => {
    setLoading(true);
    const skillData = {
      category: formData.skill.category,
      description: formData.skill.description,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/skill/saveSkill?email=${formData.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(skillData),
        }
      );

      if (!response.ok) {
        const responseError = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status} ${responseError}`
        );
      }

      const data = response.json();
      // Handle successful response based on your backend's response structure
      //   localStorage.setItem("token", data.token);
      console.log(data);
      console.log("skill saved successfully");
      setCanLogin(true);
      setSaved(true);
      setError(false);
    } catch (error) {
      setError(true);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      skill: {
        ...prev.skill,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log(formData);
    saveUser();
    if (formData.isHandy) {
      setCanLogin(false);
      setLoading(true);
      console.log("saving skill...");
      saveSkill();
    }

    if (canLogin) {
      navigate("/home");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-sidebar">
        <div className="signup-sidebar-content">
          <h1>HandyGuys</h1>
          <p>Connect with skilled professionals</p>
        </div>
      </div>

      <div className="signup-form-container">
        <div className="signup-form-wrapper">
          <h2 className="signup-form-title">Create an Account</h2>

          <form onSubmit={handleSubmit}>
            <div className="signup-name-container">
              <div className="signup-input-container" style={{ flex: 1 }}>
                <User className="signup-icon" />
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="signup-input"
                  required
                />
              </div>
              <div className="signup-input-container" style={{ flex: 1 }}>
                <User className="signup-icon" />
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="signup-input"
                  required
                />
              </div>
            </div>

            <div className="signup-input-container">
              <Mail className="signup-icon" />
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="signup-input"
                required
              />
            </div>

            <div className="signup-input-container">
              <Phone className="signup-icon" />
              <input
                type="tel"
                placeholder="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="signup-input"
                required
              />
            </div>

            <div className="signup-input-container">
              <Lock className="signup-icon" />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="signup-input"
                required
              />
            </div>

            <div className="signup-input-container">
              <Lock className="signup-icon" />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="signup-input"
                required
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label>
                <input
                  type="checkbox"
                  name="isHandy"
                  checked={formData.isHandy}
                  onChange={handleChange}
                  className="signup-checkbox"
                />
                Are you a service provider?
              </label>
            </div>

            {formData.isHandy && (
              <div className="signup-skill-container">
                <select
                  name="category"
                  value={formData.skill.category}
                  onChange={handleSkillChange}
                  className="signup-skill-category"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <textarea
                  name="description"
                  placeholder="Skill Description"
                  value={formData.skill.description}
                  onChange={handleSkillChange}
                  className="signup-input"
                  style={{ height: "100px" }}
                  required
                />
              </div>
            )}

            <button type="submit" className="signup-submit-button">
              Sign Up
            </button>
          </form>

          <div className="signup-switch-text">
            <p>
              Already have an account?
              <a href="/" className="signup-switch-link">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
