import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const comicsAPI = `https://corsproxy.io/?https%3A%2F%2Fcomicvine.gamespot.com%2Fapi%2Fissue%2F`;
const APIkey = '%3Fapi_key%3D14c652d473fc13e73ef42b10edd6423d911d4969'
const forwardSlash = "%2F"
// const comicsAPI = `https://corsproxy.io/?https%3A%2F%2Fcomicvine.gamespot.com%2Fapi%2Fissue%2F4000-173%2F%3Fapi_key%3D14c652d473fc13e73ef42b10edd6423d911d4969%26limit%3D0%26format%3Djson`;
function ComicDetailsPage() {
  const [comic, setComic] = useState(null);
  
  const { issueId } = useParams();
  const newAPI = `${comicsAPI + issueId + forwardSlash + APIkey + '%26format%3Djson'}`; //API dinàmica

  useEffect(() => {
    axios
      .get(
        // `${comicsAPI}/issue/${issueId}/?api_key=14c652d473fc13e73ef42b10edd6423d911d4969&format=json`
        `${newAPI}`
      )
      .then((res) => {
        setComic(res.data);
        console.log(res.data);
      });
  },[]);

  console.log(comic);
  // console.log(comic.results.image.medium_url)
  console.log(issueId);

  return (
    <section className="comic-details">
      {comic && (
        <div>
          <div className="issue-intro">
            <img src={comic.results.image.medium_url} alt={comic.results.name} />
            <h1>{comic.results.volume.name} #{comic.results.issue_number}</h1>
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
              {/* Problemes amb comic.map o creator.map, l'error q dona és q no és cap funció */}
              <ul>
          {/* <li>{comic.results.person_credits[0].name && 'none'}<br/>{comic.results.person_credits[0].role && 'none'}</li>               */}
              </ul>
            </div>
            <div className="characters">
              <h3>Characters</h3>
              {/* List of characters */}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ComicDetailsPage;
