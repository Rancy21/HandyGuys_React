import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { Mail, Phone, Calendar, Award, MapPin } from "lucide-react";
import "../css/profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState([]);
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);

  useEffect(() => {
    // Mock data for now - replace with actual API call
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Replace with actual API endpoint
        const response = await axios.get(
          "http://localhost:8080/users/getUser?email=larr@gmail.com"
        );
        setUser(response.data);
        if (response.data.isHandy) {
          const skillsResponse = await axios.get(
            `http://localhost:8080/skill/getHandySkills?email=${response.data.email}`
          );
          setSkills(skillsResponse.data);
        }
      } catch (error) {
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Sidebar />
      <div className="main-content">
        <div className="profile-header">
          <div className="profile-cover"></div>
          <div className="profile-header-content">
            <div className="profile-avatar">
              {`${user?.firstName[0]}${user?.lastName[0]}`}
            </div>
            <div className="profile-header-info">
              <h1>{`${user?.firstName} ${user?.lastName}`}</h1>
              <p className="profile-location">
                <MapPin size={16} /> Montreal, Canada
              </p>
            </div>
            <button className="edit-profile-btn">Edit Profile</button>
          </div>
        </div>

        <div className="profile-grid">
          <div className="profile-card info-card">
            <h3>Contact Information</h3>
            <div className="info-item">
              <Mail size={18} />
              <span>{user?.email}</span>
            </div>
            <div className="info-item">
              <Phone size={18} />
              <span>{user?.phoneNumber}</span>
            </div>
            <div className="info-item">
              <Calendar size={18} />
              <span>Joined {user?.signUpDate}</span>
            </div>
          </div>

          {user?.isHandy && (
            <div className="profile-card stats-card">
              <h3>Statistics</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-value">4.8</span>
                  <span className="stat-label">Rating</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">127</span>
                  <span className="stat-label">Jobs</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">98%</span>
                  <span className="stat-label">Completion</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {user?.isHandy && (
          <div className="profile-card skills-section">
            <div className="section-header">
              <h3>
                <Award size={20} /> Skills & Expertise
              </h3>
              <button className="add-skill-btn">Add Skill</button>
            </div>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div key={index} className="skill-card">
                  <div className="skill-header">
                    <h4>{skill.category}</h4>
                    <span className="skill-rating">★ 4.9</span>
                  </div>
                  <p>{skill.description}</p>
                  <div className="skill-footer">
                    <span className="jobs-completed">23 jobs completed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
