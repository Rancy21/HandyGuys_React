import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../css/Home.css";
import HelperCard from "../components/HelperCard";
import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userData, setData] = useState(null); // State to store data
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8080/skill/getAllSkills",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setData(response.data);
        console.log(response.data);
        setError(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError({
          status: true,
          message: error.response?.data || "Sorry, something went wrong",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        toast.error("Error fetching categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <Sidebar></Sidebar>
      <div class="main-content">
        <div class="search-bar">
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
          <input type="text" placeholder="What service do you want today ?" />
          <button class="search-button">Search</button>
        </div>

        <div class="section">
          {/* Render error message if error exists */}
          {error && typeof error === "object" ? (
            <div className="error-message">{error.message}</div>
          ) : (
            error && <div className="error-message">{error}</div>
          )}
          <div class="section-header">
            <h2>Featured helpers</h2>
            <a href="#" class="see-more">
              see more
            </a>
          </div>
          <div class="helper-cards">
            <HelperCard
              name={"Paola Diele"}
              category={"Baddie"}
              description={"Born to slay!"}
            />
            <div class="helper-card">
              <div class="helper-name">Basil Jones</div>
              <div class="helper-profession">Electrician</div>
              <div class="helper-stats">
                <div class="helper-rating">
                  <span class="rating-stars">★★★★½</span>
                  4.5
                </div>
                <div class="helper-reviews">2.5k reviews</div>
              </div>
              <div class="helper-description">
                Experienced electrician specializing in residential and
                commercial electrical systems. Expert in wiring installations,
                circuit repairs, and LED lighting solutions. Licensed
                professional with 10+ years of experience in delivering safe and
                reliable electrical services.Experienced electrician
                specializing in residential and commercial electrical systems.
                Expert in wiring installations, circuit repairs, and LED
                lighting solutions. Licensed professional with 10+ years of
                experience in delivering safe and reliable electrical services.
              </div>
              <button class="chat-button">Chat</button>
            </div>
            <div class="helper-card">
              <div class="helper-name">John Wick</div>
              <div class="helper-profession">Plumber</div>
              <div class="helper-stats">
                <span class="helper-rating">
                  <span class="rating-stars">★★★★½</span>
                  4.5
                </span>
                <span class="helper-reviews">1.4k reviews</span>
              </div>
              <div class="helper-description">
                Master plumber with expertise in both emergency repairs and
                planned installations. Specializes in leak detection, pipe
                installation, and water heater maintenance. Known for quick
                response times and thorough problem-solving approach.
              </div>
              <button class="chat-button">Chat</button>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-header">
            <h2>Category Helpers</h2>
          </div>
          <select class="category-select">
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <div class="helper-cards">
            <div class="helper-card">
              <div class="helper-name">Mike Wilson</div>
              <div class="helper-profession">Electrician</div>
              <div class="helper-stats">
                <span class="helper-rating">
                  <span class="rating-stars">★★★★★</span>
                  4.8
                </span>
                <span class="helper-reviews">1.2k reviews</span>
              </div>
              <div class="helper-description">
                Smart home installation specialist with deep knowledge of modern
                electrical systems. Certified in advanced troubleshooting and
                emergency repairs. Extensive experience in residential and
                commercial electrical panel upgrades.
              </div>
              <button class="chat-button">Chat</button>
            </div>
            <div class="helper-card">
              <div class="helper-name">Sarah Chen</div>
              <div class="helper-profession">Electrician</div>
              <div class="helper-stats">
                <span class="helper-rating">
                  <span class="rating-stars">★★★★½</span>
                  4.6
                </span>
                <span class="helper-reviews">980 reviews</span>
              </div>
              <div class="helper-description">
                Industrial and commercial electrical expert specializing in
                solar installations and EV charging stations. Certified in
                renewable energy systems with focus on energy-efficient
                solutions and sustainable electrical infrastructure.
              </div>
              <button class="chat-button">Chat</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
