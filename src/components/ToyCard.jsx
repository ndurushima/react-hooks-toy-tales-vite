import React from "react";

function ToyCard({toy, onLike, onDelete}) {
  const {id, name, image, likes} = toy;
  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={() => onLike(toy)}>Like {"<3"}</button>
      <button className="del-btn" onClick={() => onDelete(id)}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
