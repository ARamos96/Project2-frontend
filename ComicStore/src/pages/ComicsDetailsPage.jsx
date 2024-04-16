import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const comicsAPI = `https://comicvine.gamespot.com/api/issue/${issueCode}/?api_key=${APIKey}&format=json`;
const issueCode = null;
const APIKey = null

function ComicDetailsPage() {
  const [comic, setComic] = useState([]);

  return (
    <section className="comic-details">
      <div className="issue-intro">
        <img />
        <h1>Comic Details</h1>
      </div>
      {/* <table>Issue table</table> */}
      <div className="issue-summary">
        <h2>Summary</h2>
      </div>
      <div className="issue-credits">
        <div className="creators">
          <h3>Creators</h3>
          {/* List of creators */}
        </div>
        <div className="characters">
          <h3>Characters</h3>
          {/* List of characters */}
        </div>
      </div>
    </section>
  );
}

export default ComicDetailsPage;
