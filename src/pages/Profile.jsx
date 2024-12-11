import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import "../css/profile.css";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  Mail,
  Phone,
  Calendar,
  Award,
  MapPin,
  Edit,
  Plus,
  User
} from "lucide-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Rating
} from "@mui/material";

const ServiceProviderProfile = () => {
  const navigate = useNavigate();
  const storedUser = useSelector((state) => state.user);

  useEffect(() => {
    if(!storedUser.isAuthenticated) {
      navigate("/");
      return;
    };
  }, [navigate])

  const [isHandy, setIsHandy] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [newSkill, setNewSkill] = useState({
    category: "",
    description: ""
  });
  const [editedProfile, setEditedProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, categoriesResponse] = await Promise.all([
          axios.get(
            `http://localhost:8080/users/getUser?email=${storedUser.email}`
          ),
          axios.get("http://localhost:8080/skill/getCategories")
        ]);

        setUser(userResponse.data);
        setCategories(categoriesResponse.data);
        setEditedProfile({
          firstName: userResponse.data.firstName,
          lastName: userResponse.data.lastName,
          email: userResponse.data.email,
          phoneNumber: userResponse.data.phoneNumber
        });

        if (userResponse.data.isHandy) {
          setIsHandy(true);
          const skillsResponse = await axios.get(
            `http://localhost:8080/skill/getHandySkills?email=${userResponse.data.email}`
          );
          setSkills(skillsResponse.data);
        }
      } catch (error) {
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddSkill = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/skill/saveSkill?email=${user.email}`,
        {
          category: newSkill.category,
          description: newSkill.description
        }
      );
      setSkills([...skills, response.data]);
      setShowAddSkillModal(false);
      toast.success("Skill added successfully");
    } catch (error) {
      setShowAddSkillModal(false);
      toast.error("Failed to add skill");
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await axios.post(
        `http://localhost:8080/users/updateUser?email=${user.email}`,
        editedProfile
      );
      setUser({ ...user, ...editedProfile });
      setShowEditProfileModal(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      setShowEditProfileModal(false);
      toast.error("Failed to update profile.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Sidebar />
      <ToastContainer />
      <div className="main-content">
        {/* Existing profile header */}
        <div className="profile-header">
               <div className="profile-cover"></div>       {" "}
          <div className="profile-header-content">
                {" "}
            <div className="profile-avatar">
                     {`${user?.firstName[0]}${user?.lastName[0]}`}       
              {" "}
            </div>
                {" "}
            <div className="profile-header-info">
              <h1>{`${user?.firstName} ${user?.lastName}`}</h1>
              {" "}
              <p className="profile-location">
                  _____________________________
              </p>
                      {" "}
            </div>
          </div>
        </div>
        <div className="profile-info-section">
          <div className="profile-card personal-info">
            <div className="card-header">
              <div className="header-title">
                <h3>Personal Information</h3>
                <span className="subtitle">Manage your personal details</span>
              </div>
              <button
                className="edit-profile-btn"
                onClick={() => setShowEditProfileModal(true)}
              >
                <Edit size={16} /> Edit Profile
              </button>
            </div>

            <div className="info-grid">
              <div className="info-group">
                <div className="info-item">
                  <div className="info-icon">
                    <User size={18} />
                  </div>
                  <div className="info-content">
                    <label>First Name</label>
                    <span>{user?.firstName}</span>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">
                    <User size={18} />
                  </div>
                  <div className="info-content">
                    <label>Last Name</label>
                    <span>{user?.lastName}</span>
                  </div>
                </div>
              </div>

              <div className="info-group">
                <div className="info-item">
                  <div className="info-icon">
                    <Mail size={18} />
                  </div>
                  <div className="info-content">
                    <label>Email</label>
                    <span>{user?.email}</span>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">
                    <Phone size={18} />
                  </div>
                  <div className="info-content">
                    <label>Phone</label>
                    <span>{user?.phoneNumber}</span>
                  </div>
                </div>
              </div>

              <div className="info-group">
                <div className="info-item">
                  <div className="info-icon">
                    <Calendar size={18} />
                  </div>
                  <div className="info-content">
                    <label>Member Since</label>
                    <span>
                      {new Date(user?.signUpDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        {isHandy && (
          <div className="profile-card skills-section">
          <div className="section-header">
            <h3>
              <Award size={20} /> Skills & Expertise
            </h3>
            <button
              className="add-skill-btn"
              onClick={() => setShowAddSkillModal(true)}
            >
              <Plus size={16} /> Add Skill
            </button>
          </div>
          <div className="skills-grid">
            {skills.map((skill) => (
              <div key={skill.id} className="skill-card">
                <div className="skill-header">
                  <h4>{skill.category}</h4>
                  <Rating value={skill.rating?.avgRating || 0} readOnly />
                </div>
                <p style={{color: "#2c3e50"}}>{skill.description}</p>
                {/* <div className="skill-footer">
                  <span className="jobs-completed">23 jobs completed</span>
                </div> */}
              </div>
            ))}
          </div>
        </div>
        )}
        
        {/* Enhanced Edit Profile Modal */}
        <Dialog
          open={showEditProfileModal}
          onClose={() => setShowEditProfileModal(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "16px",
              padding: "1rem"
            }
          }}
        >
          <DialogTitle>
            <div className="modal-header">
              <div className="modal-title">
                <h2>Edit Profile</h2>
                <span>Update your personal information</span>
              </div>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className="modal-grid">
              <TextField
                label="First Name"
                value={editedProfile.firstName}
                onChange={(e) =>
                  setEditedProfile({
                    ...editedProfile,
                    firstName: e.target.value
                  })
                }
                variant="outlined"
                className="modal-input"
              />
              <TextField
                label="Last Name"
                value={editedProfile.lastName}
                onChange={(e) =>
                  setEditedProfile({
                    ...editedProfile,
                    lastName: e.target.value
                  })
                }
                variant="outlined"
                className="modal-input"
              />
              <TextField
                label="Email"
                value={editedProfile.email}
                onChange={(e) =>
                  setEditedProfile({ ...editedProfile, email: e.target.value })
                }
                variant="outlined"
                className="modal-input"
                fullWidth
              />
              <TextField
                label="Phone Number"
                value={editedProfile.phoneNumber}
                onChange={(e) =>
                  setEditedProfile({
                    ...editedProfile,
                    phoneNumber: e.target.value
                  })
                }
                variant="outlined"
                className="modal-input"
              />
            </div>
          </DialogContent>
          <DialogActions className="modal-actions">
            <Button
              onClick={() => setShowEditProfileModal(false)}
              className="cancel-btn"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateProfile}
              variant="contained"
              className="save-btn"
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>

        {/* Enhanced Add Skill Modal */}
        <Dialog
          open={showAddSkillModal}
          onClose={() => setShowAddSkillModal(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "16px",
              padding: "1rem"
            }
          }}
        >
          <DialogTitle>
            <div className="modal-header">
              <div className="modal-title">
                <h2>Add New Skill</h2>
                <span>Share your expertise with clients</span>
              </div>
            </div>
          </DialogTitle>
          <DialogContent>
            <FormControl fullWidth className="modal-input">
              {/* <InputLabel>Category</InputLabel> */}
              <select
                value={newSkill.category}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, category: e.target.value })
                }
                className="category-select"
              >
                <option value={""} disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </FormControl>
            <FormControl fullWidth className="modal-input">
              <TextField
                            multiline
                            rows={4}
                            label="Description"
                            value={newSkill.description}
                            onChange={(e) =>
                              setNewSkill({ ...newSkill, description: e.target.value })
                            }
                            variant="outlined"
                            className="modal-input description-input"
                            placeholder="Describe your experience and expertise in this skill..."
                          />
            </FormControl>
            
          </DialogContent>
          <DialogActions className="modal-actions">
            <Button
              onClick={() => setShowAddSkillModal(false)}
              className="cancel-btn"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddSkill}
              variant="contained"
              className="save-btn"
            >
              Add Skill
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default ServiceProviderProfile;
