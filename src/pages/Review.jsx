import { useEffect, useState } from "react";
import { Star, ThumbsUp, Clock, MessageSquare } from "lucide-react";
import "../css/review.css";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { getToday } from "../components/Helper";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Review = () => {
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
    rating: 0,
  });

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/skill/getSkill?id=f42c0ac3-8a58-479e-97d5-c0419f7954e9" // Replace with route params
        );
        setSkill(response.data);
        setHandy(response.data.handyGuy);

        const fetchReview = await axios.get(
          `http://localhost:8080/review/getReview?email=larr@gmail.com&id=f42c0ac3-8a58-479e-97d5-c0419f7954e9` // Replace with route params
        );
        if (fetchReview.data) {
          setRating(fetchReview.data.rating);
          setComment(fetchReview.data.review);
          setExisting({
            comment: fetchReview.data.review,
            rating: fetchReview.data.rating,
          });
          setUpdated(false);
        }
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
      }
    };
    fetchSkill();
  }, []);

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
      date: getToday(),
    };
    try {
      const response = await axios.post(
        `http://localhost:8080/review/saveReview?skillId=${skill.id}&email=larr@gmail.com`,
        reviewData
      );
      toast.success(response.data);
      setSuccess(response.data); // Added success message update
      setRating(0);
      setComment("");
      setExisting({
        comment: "",
        rating: 0,
      });
      setUpdated(false);
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sidebar />
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
    </>
  );
};

export default Review;