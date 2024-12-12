import { useEffect, useState } from "react";
import { Star, ThumbsUp, Clock, MessageSquare } from "lucide-react";
import "../css/review.css";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { getToday } from "../components/Helper";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

const Review = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate("/");
    }
  }, [user.isAuthenticated, navigate]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [skill, setSkill] = useState(null);
  const [handy, setHandy] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Added back success state
  const [updated, setUpdated] = useState(true);
  const [existing, setExisting] = useState({
    comment: "",
    rating: 0
  });
  const location = useLocation();
  const skillState = location.state || {};

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/skill/getSkill?id=${skillState?.id}` // Replace with route params
        );
        setSkill(response.data);
        setHandy(response.data.handyGuy);

        const fetchReview = await axios.get(
          `http://localhost:8080/review/getReview?email=${user?.email}&id=${response.data.id}` // Replace with route params
        );
        if (fetchReview.data) {
          setRating(fetchReview.data.rating);
          setComment(fetchReview.data.review);
          setExisting({
            comment: fetchReview.data.review,
            rating: fetchReview.data.rating
          });
          setUpdated(false);
        }
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
      }
    };
    fetchSkill();
  }, [skillState.id, user?.email]);

  const checkUpdate = (newRating, newComment) => {
    if (existing.comment !== newComment || existing.rating !== newRating) {
      setUpdated(true);
    } else {
      setUpdated(false);
    }
  };

  const handleRatingChange = (star) => {
    setRating((prevRating) => {
      const newRating = star;
      checkUpdate(newRating, comment);
      return newRating;
    });
  };

  const handleCommentChange = (e) => {
    const newComment = e.target.value;
    setComment((prevComment) => {
      checkUpdate(rating, newComment);
      return newComment;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const reviewData = {
      review: comment,
      rating,
      date: getToday()
    };
    try {
      const response = await axios.post(
        `http://localhost:8080/review/saveReview?skillId=${skill.id}&email=${user.email}`,
        reviewData
      );
      toast.success(response.data);
      setSuccess(response.data); // Added success message update
      setExisting({
        comment: "",
        rating: 0
      });
      setUpdated(false);
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  if (skill) {
    if (skill.category === "Electrical_repair") {
      skill.category = "Electrical Repair";
    } else if (skill.category === "Event_Planing") {
      skill.category = "Event Planing";
    } else if (skill.category === "WoodWorking") {
      skill.category = "Wood Working";
    }
  }

  return (
    <>
      <Sidebar />
      <div className="main-content">
        <div className="review-container">
          <ToastContainer />
          <div className="review-wrapper">
            <div className="review-header">
              <div className="provider-card">
                {handy && (
                  <>
                    <div className="provider-avatar">{`${handy.firstName[0]}${handy.lastName[0]}`}</div>
                    <div className="provider-details">
                      <h2>{`${handy.firstName} ${handy.lastName}`}</h2>
                      <p className="service-type">{skill && skill.category}</p>
                      <div className="provider-stats">
                        <span>
                          <ThumbsUp size={16} /> 95% Success Rate
                        </span>
                        <span>
                          <Clock size={16} /> 48 Jobs
                        </span>
                        <span>
                          <MessageSquare size={16} /> 32 Reviews
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
              {skill && skill.rating && skill.rating.avgRating ? (
                <button
                  className="action-button"
                  onClick={() =>
                    navigate("/reviewsList", { state: { id: skill?.id } })
                  }
                >
                  See List of Reviews
                </button>
              ) : null}
            </div>

            <div className="review-content">
              <h3>Rate Your Experience</h3>
              {error && <div className="review-error">{error}</div>}
              {success && <div className="review-success">{success}</div>}{" "}
              {/* Added success message display */}
              <div className="rating-container">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={40}
                    className={`star ${rating >= star ? "filled" : ""}`}
                    onClick={() => handleRatingChange(star)}
                  />
                ))}
                <span className="rating-text">
                  {rating ? `${rating} out of 5` : "Select Rating"}
                </span>
              </div>
              <div className="comment-section">
                <h3>Share Your Experience</h3>
                <textarea
                  placeholder={
                    handy
                      ? `Tell us about your experience with ${handy.firstName} ${handy.lastName}`
                      : "Tell us about your experience"
                  }
                  value={comment}
                  onChange={handleCommentChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="submit-review"
                onClick={handleSubmit}
                disabled={loading || !rating || !updated}
              >
                {loading ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
