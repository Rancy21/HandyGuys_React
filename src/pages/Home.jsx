import React from "react";
import Sidebar from "../components/Sidebar";
import "../css/Home.css";
import HelperCard from "../components/HelperCard";

const Home = () => {
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
          <div class="section-header">
            <h2>Featured helpers</h2>
            <a href="#" class="see-more">
              see more
            </a>
          </div>
          <div class="helper-cards">
            <HelperCard name={"Paola Diele"} category={"Baddie"} description={"Born to slay!"}/>
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
            <option value="electrician">Electrician</option>
            <option value="plumber">Plumber</option>
            <option value="carpenter">Carpenter</option>
            <option value="painter">Painter</option>
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
