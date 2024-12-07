import React from 'react'

function HelperCard({name, category, description}) {
  return (
    <div><div class="helper-card">
    <div class="helper-name">{name}</div>
    <div class="helper-profession">{category}</div>
    <div class="helper-stats">
      <div class="helper-rating">
        <span class="rating-stars">★★★★½</span>
        4.5
      </div>
      <div class="helper-reviews">2.5k reviews</div>
    </div>
    <div class="helper-description">
      {description}
    </div>
    <button class="chat-button">Chat</button>
  </div></div>
  )
}

export default HelperCard