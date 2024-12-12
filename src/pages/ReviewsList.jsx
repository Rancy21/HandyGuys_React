import React, { useState, useEffect } from "react";
import { Star, MessageSquare, ThumbsUp, Phone } from "lucide-react";
import axios from "axios";
import "../css/reviewsList.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/Sidebar";
import { useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";

const ReviewsList = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate("/");
    }
  }, [user.isAuthenticated, navigate]);
  const [provider, setProvider] = useState(null);
  const [skill, setSkill] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  const skillState = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillRes, reviewsRes] = await Promise.all([
          axios.get(
            `http://localhost:8080/skill/getSkill?id=${skillState?.id}`
          ),
          axios.get(
            `http://localhost:8080/review/getReviewsList?id=${skillState?.id}`
          )
        ]);
        if (skillRes.data) {
          if (skillRes.data.category === "Electrical_repair") {
            skillRes.data.category = "Electrical Repair";
          } else if (skillRes.data.category === "Event_Planing") {
            skillRes.data.category = "Event Planing";
          } else if (skillRes.data.category === "WoodWorking") {
            skillRes.data.category = "Wood Working";
          }
        }
        setSkill(skillRes.data);
        setProvider(skillRes.data.handyGuy);
        setReviews(reviewsRes.data);
      } catch (error) {
        setError("Failed to load reviews");
        toast.error("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={`star ${index < rating ? "filled" : ""}`}
      />
    ));
  };

  return (
    <>
      <Sidebar />
      <div className="main-content">
        <div className="reviews-page">
          <ToastContainer />
          <div className="reviews-container">
            {provider && (
              <div className="provider-header">
                <div className="provider-card">
                  <div className="provider-avatar-large">
                    {`${provider.firstName[0]}${provider.lastName[0]}`}
                  </div>
                  <div className="provider-info">
                    <h1>{`${provider.firstName} ${provider.lastName}`}</h1>
                    <span className="provider-badge">{skill?.category}</span>
                    <div className="provider-metrics">
                      <div className="metric">
                        <ThumbsUp size={20} />
                        <span>{reviews.length} Reviews</span>
                      </div>
                      <div className="metric">
                        <Star size={20} />
                        <span>{skill?.rating?.avgRating} Average</span>
                      </div>
                      <div className="metric">
                        <Phone size={20} />
                        <span>{provider?.phoneNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {user.email !== provider.email ? (
                  <button
                    className="action-button"
                    onClick={() =>
                      navigate("/review", { state: { id: skillState?.id } })
                    }
                  >
                    Give a Review Now
                  </button>
                ) : null}
              </div>
            )}

            <div className="reviews-section">
              <h2>Client Reviews</h2>
              {reviews.length > 0 ? (
                <div className="reviews-grid">
                  {reviews.map((review) => (
                    <div key={review.id} className="review-card">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <div className="reviewer-avatar">
                            {`${review.user.firstName[0]}${review.user.lastName[0]}`}
                          </div>
                          <div>
                            <h3>{`${review.user.firstName} ${review.user.lastName}`}</h3>
                            <div className="rating">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                        </div>
                        <span className="review-date">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="review-comment">{review.review}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-reviews">No reviews available yet</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewsList;
