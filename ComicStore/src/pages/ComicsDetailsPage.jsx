import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

// const comicsAPI = `https://corsproxy.io/?https%3A%2F%2Fcomicvine.gamespot.com%2Fapi%2Fissue%2F`;
// const APIkey = '%3Fapi_key%3D14c652d473fc13e73ef42b10edd6423d911d4969'
// const forwardSlash = "%2F"
const comicsAPI = `https://corsproxy.io/?https://comicvine.gamespot.com/api/issue`;

function removeHTMLTagsAndSpecialChars(text) {
  const withoutFigCaptionTags = text.replace(
    /<figcaption>[\s\S]*?<\/figcaption>/g,
    ""
  );
  // Remove HTML tags except <p> tags
  const withoutTagsExceptP = withoutFigCaptionTags.replace(
    /<(?!\/?p\b)[^>]*>/g,
    ""
  );
  // Replace <p> tags with newline characters
  const withParagraphBreaks = withoutTagsExceptP.replace(/<\/?p[^>]*>/g, "\n");
  // Remove special characters except commas and full stops
  const withoutSpecialChars = withParagraphBreaks.replace(
    /[^\w\s,.()#\-\n']/g,
    ""
  );
  return withoutSpecialChars;
}
function ComicDetailsPage() {
  const [comic, setComic] = useState(null);

  const { issueId } = useParams();
  // const newAPI = `${comicsAPI + issueId + forwardSlash + APIkey + '%26format%3Djson'}`; //API dinàmica

  useEffect(() => {
    axios
      .get(
        `${comicsAPI}/${issueId}/?api_key=14c652d473fc13e73ef42b10edd6423d911d4969&format=json`
        // `${newAPI}`
      )
      .then((res) => {
        setComic(res.data);
        console.log(res.data);
      });
  }, []);

  console.log(comic);
  // console.log(comic.results.image.medium_url)
  console.log(issueId);

  return (
    <section>
      <hr />
      {comic && (
        <div className="author-details">
          <div className="author-intro">
            <img
              src={comic.results.image.medium_url}
              alt={comic.results.name}
            />
            <h2>
              {comic.results.name && comic.results.name.length < 30
                ? comic.results.name
                : `${comic.results.volume.name} #${comic.results.issue_number}`}
            </h2>
          </div>
          <hr />
          {/* <table>Issue table</table> */}
          <div className="author-career">
            <div className="issue-summary">
              <h3>Summary</h3>
              <p>
                {comic.results.description ? (
                  removeHTMLTagsAndSpecialChars(comic.results.description)
                ) : (
                  <li>No summary available</li>
                )}
              </p>
            </div>
            <hr />
            <div className="issue-credits">
              <div className="creators">
                <h3>Creators</h3>
                {/* List of creators */}
                {comic.results.person_credits.length ? (
                  <div className="genInfo-table">
                    <table>
                      <tbody>
                        {comic.results.person_credits.map((creator) => {
                          return (
                            <tr key={creator.id}>
                              <th>
                                <b>{creator.name}:</b>
                              </th>
                              <td className="creator-role">{creator.role}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  "Creators not available"
                )}
                <hr />
              </div>
              <div className="characters-created">
                <h3>Characters</h3>
                {/* List of characters */}
                {comic.results.character_credits.length ? (
                  <ul>
                    {comic.results.character_credits.map((character) => (
                      <li key={character.id}>{character.name}</li>
                    ))}
                  </ul>
                ) : (
                  "Character information not available"
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <hr />
    </section>
  );
}

export default ComicDetailsPage;
