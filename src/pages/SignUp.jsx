import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Lock, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../css/sign.css";
import { getToday } from "../components/Helper";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: "",
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
      description: "",
    },
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
          message: fetchError.response?.data || "Failed to fetch categories",
        });
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
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle input changes for skill-related fields
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

  // Save skill to backend
  const saveSkill = async () => {
    const skillData = {
      category: formData.skill.category,
      description: formData.skill.description,
    };

    try {
      await axios.post(
        `http://localhost:8080/skill/saveSkill?email=${formData.email}`,
        skillData
      );
    } catch (skillError) {
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
      signUpDate: getToday(),
    };

    try {
      await axios.post("http://localhost:8080/users/saveUser", userData);

      // Save skill if user is a service provider
      if (formData.isHandy) {
        await saveSkill();
      }

      // Navigate to login page
      navigate("/");
    } catch (saveError) {
      setError({
        status: true,
        message: saveError.response?.data || "Failed to save user",
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
        message: "Passwords do not match",
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
        message: "Please select a skill category and provide a description",
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
            {/* Form inputs remain the same as in the previous version */}
            {/* ... (rest of the component remains unchanged) ... */}

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
