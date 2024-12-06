import React, { useState } from "react";
import { User, Lock, Mail, Phone } from "lucide-react";
import "../css/sign.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    isHandy: false,
    skills: [{ category: "", description: "" }],
  });

  const [isLogin, setIsLogin] = useState(false);

  const categories = [
    "ELECTRICIAN",
    "PLUMBER",
    "CARPENTER",
    "PAINTER",
    "GARDENER",
    "HVAC",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSkillChange = (index, e) => {
    const { name, value } = e.target;
    const newSkills = [...formData.skills];
    newSkills[index][name] = value;
    setFormData((prev) => ({
      ...prev,
      skills: newSkills,
    }));
  };

  const addSkill = () => {
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, { category: "", description: "" }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log(formData);
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
              <div>
                {formData.skills.map((skill, index) => (
                  <div key={index} className="signup-skill-container">
                    <select
                      name="category"
                      value={skill.category}
                      onChange={(e) => handleSkillChange(index, e)}
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
                      value={skill.description}
                      onChange={(e) => handleSkillChange(index, e)}
                      className="signup-input"
                      style={{ height: "100px" }}
                      required
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSkill}
                  className="signup-add-skill-button"
                >
                  Add Another Skill
                </button>
              </div>
            )}

            <button type="submit" className="signup-submit-button">
              Sign Up
            </button>
          </form>

          <div className="signup-switch-text">
            <p>
              Already have an account?
              <span
                className="signup-switch-link"
                onClick={() => setIsLogin(!isLogin)}
              >
                {" "}
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
