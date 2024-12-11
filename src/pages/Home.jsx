import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../css/Home.css";
import HelperCard from "../components/HelperCard";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const [error, setError] = useState(false);
  const [skillerror, setSkillError] = useState(false);
  const [data, setData] = useState([]); // State to store data
  const [updata, setUpData] = useState([]); // State to store data
  const [categories, setCategories] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8080/review/getTopRating",
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        const transformedData = response.data.map((skill) => {
          if (skill.category === "Electrical_repair") {
            skill.category = "Electrical Repair";
          } else if (skill.category === "Event_Planing") {
            skill.category = "Event Planing";
          } else if (skill.category === "WoodWorking") {
            skill.category = "Wood Working";
          }
          return skill;
        });
        setFeatured(transformedData);
        console.log(response.data);
        setError(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError({
          status: true,
          message: error.response?.data || "Sorry, something went wrong"
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
          message: fetchError.response?.data || "Failed to fetch categories"
        });
        toast.error("Error fetching categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Filter skills based on selected category
  const onCategoryChange = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/skill/getSkillperCategory?category=${e.target.value}`
      );
      setSkillError(false);
      const transformedData = response.data.map((skill) => {
        if (skill.category === "Electrical_repair") {
          skill.category = "Electrical Repair";
        } else if (skill.category === "Event_Planing") {
          skill.category = "Event Planing";
        } else if (skill.category === "WoodWorking") {
          skill.category = "Wood Working";
        }
        return skill;
      });
      setData(transformedData);
    } catch (fetchError) {
      setData([]);
      setSkillError({
        status: true,
        message:
          fetchError.response?.data || "Failed to fetch skills per category"
      });
    } finally {
      setLoading(false);
    }
  };

  const globaSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsSearch(true);
    if (searchTerm.trim().length === 0) {
      setIsSearch(false);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/skill/globalSearch?value=${searchTerm}`
      );
      setError(false);
      const transformedData = response.data.map((skill) => {
        if (skill.category === "Electrical_repair") {
          skill.category = "Electrical Repair";
        } else if (skill.category === "Event_Planing") {
          skill.category = "Event Planing";
        } else if (skill.category === "WoodWorking") {
          skill.category = "Wood Working";
        }
        return skill;
      });
      setUpData(transformedData);
    } catch (fetchError) {
      setUpData([]);
      setError({
        status: true,
        message:
          fetchError.response?.data ||
          "Failed to fetch results of the global search"
      });
      toast.error("Error fetching global search results");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sidebar />
      <ToastContainer />
      <div className="main-content">
        <div className="search-bar">
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            placeholder="What service do you want today ?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" onClick={globaSearch}>
            Search
          </button>
        </div>
        <div className="section">
          {/* Render error message if error exists */}

          <div className="section-header">
            {isSearch ? <h2>Results:</h2> : <h2>Featured helpers</h2>}
          </div>
          {error && typeof error === "object" ? (
            <div className="error-message">{error.message}</div>
          ) : (
            error && <div className="error-message">{error}</div>
          )}
          <div className="helper-cards">
            {isSearch
              ? updata.map((skill) => (
                  <HelperCard key={skill.id} skill={skill} />
                ))
              : featured.map((skill) => (
                  <HelperCard key={skill.id} skill={skill} />
                ))}{" "}
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <h2>Category Helpers</h2>
          </div>
          <select className="category-select" onChange={onCategoryChange}>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {skillerror && typeof skillerror === "object" ? (
            <div className="error-message">{skillerror.message}</div>
          ) : (
            skillerror && <div className="error-message">{skillerror}</div>
          )}
          <div className="helper-cards">
            {data.map((skill) => (
              <HelperCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
