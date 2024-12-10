import React from 'react'

function HelperCard({skill}) {
  return (
    <div><div className="helper-card">
    <div className="helper-name">{skill.handyGuy.firstName} {skill.handyGuy.lastName}</div>
    <div className="helper-profession">{skill.category}</div>
    <div className="helper-stats">
      <div className="helper-rating">
        <span className="rating-stars">★★★★½</span>
        4.5
      </div>
      <div className="helper-reviews">2.5k reviews</div>
    </div>
    <div className="helper-description">
      {skill.description}
    </div>
    <button className="chat-button">Chat</button>
  </div></div>
  )
}

export default HelperCard