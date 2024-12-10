import React from "react";
import { Star } from "lucide-react";
import { Reviews } from "@mui/icons-material";

function HelperCard({ skill }) {
  const generateStars = (rating) => {
    return [...Array(5)].map((_, index) => {
      const fillPercentage = Math.max(0, Math.min(1, rating - index));

      return (
        <div
          key={index}
          style={{
            position: "relative",
            display: "inline-block",
            marginRight: "2px"
          }}
        >
          {/* Base (empty) star */}
          <Star
            size={20}
            strokeWidth={1.5}
            color="#FFD700"
            fill="transparent"
          />

          {/* Filled star overlay */}
          {fillPercentage > 0 && (
            <Star
              size={20}
              strokeWidth={1.5}
              color="#FFD700"
              fill="#FFD700"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                clipPath: `inset(0 ${(1 - fillPercentage) * 100}% 0 0)`,
                zIndex: 1
              }}
            />
          )}
        </div>
      );
    });
  };

  return (
    <div>
      <div className="helper-card">
        <div className="helper-name">
          {skill.handyGuy.firstName} {skill.handyGuy.lastName}
        </div>
        <div className="helper-profession">{skill.category}</div>
        <div className="helper-stats">
          <div className="helper-rating">
            <span className="rating-stars">
              {skill.rating && skill.rating.avgRating
                ? generateStars(skill.rating.avgRating)
                : generateStars(0)}
            </span>
            {skill.rating ? skill.rating.avgRating.toFixed(1) : "0.0"}
          </div>
          {skill.rating && skill.rating.numberOfRatings ? (
            skill.rating.numberOfRatings === 1 ? (
              <div className="helper-reviews">
                {skill.rating.numberOfRatings} review
              </div>
            ) : (
              <div className="helper-reviews">
                {skill.rating.numberOfRatings} reviews
              </div>
            )
          ) : (
            <div className="helper-reviews">No reviews yet</div>
          )}
        </div>
        <div className="helper-description">{skill.description}</div>
        <button className="chat-button">Chat</button>
      </div>
    </div>
  );
}

export default HelperCard;
