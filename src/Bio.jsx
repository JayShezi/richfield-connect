import React from "react";

/*
  Bio Component:
  This simple functional component receives a bio string as a prop and displays it inside a styled card.
  It consists of a heading "Short Bio:" and the bio content below it, visually separated with card styling.
  Used for showing a brief user biography or description in the profile view or other sections.
*/
function Bio({ bio }) {
  return (
    <div className="card accent bio-card">
      <strong>Short Bio:</strong>
      <p>{bio}</p>
    </div>
  );
}

export default Bio;
