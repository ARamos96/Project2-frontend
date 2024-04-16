import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const comicsAPI = `https://comicvine.gamespot.com/api/`;

function ComicDetailsPage() {
  const [comic, setComic] = useState([]);

  const { issueId } = useParams();
  // const APIKey = 14c652d473fc13e73ef42b10edd6423d911d4969; al ser alfanumèric no ho llegeix bé

  useEffect(() => {
    axios.get(`${comicsAPI}/issue/${issueId}/?api_key=14c652d473fc13e73ef42b10edd6423d911d4969&format=json`).then((res) => {
      setComic(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <section className="comic-details">
      <div className="issue-intro">
        <img src={comic.image.medium_url} alt={comic.name}/>
        <h1>Comic Details</h1>
        <p>Comic Description</p>
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
