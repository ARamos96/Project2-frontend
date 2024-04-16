import React from "react";

function CharacterDetailsPage() {
  return (
    <section className="character-details">
      <div className="character-intro">
        <img />
        <h1>Character Details</h1>
        <p> Character Intro</p>
      </div>
      {/* <table>Character Info table</table> */}
      <div className="character-history">
        <h2>Origin</h2>
        <p>Character Origin</p>
        <h2>Creation</h2>
        <p>Character Creation</p>
        <h2>Evolution</h2>
        <p>Character Creation</p>
      </div>
    </section>
  );
}

export default CharacterDetailsPage;
