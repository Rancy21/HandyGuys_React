import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Lock, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../store/userSlice";
import "../css/sign.css";
import { getToday } from "../components/Helper";
import { toast, ToastContainer } from "react-toastify";
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: ""
  });
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    isHandy: false,
    skill: {
      category: "",
      description: ""
    }
  });

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8080/skill/getCategories"
        );
        setCategories(response.data);
      } catch (fetchError) {
        setError({
          status: true,
          message: fetchError.response?.data || "Failed to fetch categories"
        });
        toast.error("Error fetching categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle input changes for main form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Handle input changes for skill-related fields
  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      skill: {
        ...prev.skill,
        [name]: value
      }
    }));
  };

  // Save skill to backend
  const saveSkill = async () => {
    const skillData = {
      category: formData.skill.category,
      description: formData.skill.description
    };

    try {
      await axios.post(
        `http://localhost:8080/skill/saveSkill?email=${formData.email}`,
        skillData
      );
    } catch (skillError) {
      toast.error("Error saving skill");
      throw new Error(skillError.response?.data || "Failed to save skill");
    }
  };

  // Save user to backend
  const saveUser = async () => {
    const userData = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      isHandy: formData.isHandy,
      signUpDate: getToday()
    };

    try {
      await axios.post("http://localhost:8080/users/saveUser", userData);

      // Save skill if user is a service provider
      if (formData.isHandy) {
        await saveSkill();
      }
      // Dispatch the login action to save user data in the Redux store
      dispatch(login({ user: userData }));

      // Navigate to login page
      toast.success("User saved successfully");
      if (userData.email == "Larryckontsandaga21@gmail.com") {
        navigate("/users");
      } else if (userData.isHandy == true) {
        navigate("/profile");
      } else {
        navigate("/home");
      }
    } catch (saveError) {
      toast.error("Failed to save user");
      setError({
        status: true,
        message: saveError.response?.data || "Failed to save user"
      });
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ status: false, message: "" });

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError({
        status: true,
        message: "Passwords do not match"
      });
      return;
    }

    // Validate skill selection if isHandy is true
    if (
      formData.isHandy &&
      (!formData.skill.category || !formData.skill.description)
    ) {
      setError({
        status: true,
        message: "Please select a skill category and provide a description"
      });
      return;
    }

    try {
      setLoading(true);
      // Proceed with user and skill save
      await saveUser();
    } catch (submitError) {
      // Additional error handling if needed
      console.error(submitError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer />
      <div className="signup-sidebar">
        <div className="signup-sidebar-content">
          <h1>HandyGuys</h1>
          <p>Connect with skilled professionals</p>
        </div>
      </div>

      <div className="signup-form-container">
        <div className="signup-form-wrapper">
          <h2 className="signup-form-title">Create an Account</h2>

          {error.status && (
            <div
              className="error-message"
              style={{ color: "red", marginBottom: "1rem" }}
            >
              {error.message}
            </div>
          )}

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

            {/* Email Input */}
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

            {/* Phone Input */}
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

            {/* Password Inputs */}
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

            {/* Service Provider Checkbox */}
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

            {/* Skill Selection (Conditionally Rendered) */}
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

            {/* Submit Button */}
            <button
              type="submit"
              className="signup-submit-button"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Sign Up"}
            </button>
          </form>

          {/* Login Redirect */}
          <div className="signup-switch-text">
            <p>
              Already have an account?{" "}
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
