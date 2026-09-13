import React from "react";

function Bio({ bio }) {
  return (
    <div className="card accent bio-card">
      <strong>Short Bio:</strong>
      <p>{bio}</p>
    </div>
  );
}

export default Bio;
