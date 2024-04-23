import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const characterAPI = `https://corsproxy.io/?https://comicvine.gamespot.com/api/character`;

function removeHTMLTagsAndSpecialChars(text) {
  // Remove HTML tags except <p> tags
  const withoutTagsExceptP = text.replace(/<(?!\/?p\b)[^>]*>/g, "");
  // Replace <p> tags with newline characters
  const withParagraphBreaks = withoutTagsExceptP.replace(/<\/?p>/g, "\n");
  // Remove special characters except commas and full stops
  const withoutSpecialChars = withParagraphBreaks.replace(/[^\w\s,.]/g, "");
  return withoutSpecialChars;
}

function CharacterDetailsPage() {
  const [character, setCharacter] = useState(null);

  const { characterId } = useParams();

  useEffect(() => {
    axios
      .get(
        `${characterAPI}/${characterId}/?api_key=14c652d473fc13e73ef42b10edd6423d911d4969&format=json`
        // `${newAPI}`
      )
      .then((res) => {
        setCharacter(res.data);
        console.log(res.data);
      });
  }, []);

  return (
    <section className="character-details">
      {character && (
        <div>
          <div className="character-intro">
            <img src={character.results.image.icon_url} />
            <h1>{character.results.name}</h1>
            <p>{removeHTMLTagsAndSpecialChars(character.results.deck)}</p>
          </div>
          {/* <table>Character Info table</table> */}
          <p>
            <b>General Information</b>
          </p>
          <table>
            <tbody>
              <tr>
                <th>Super Name:</th>
                <td>{character.results.name}</td>
              </tr>
              <tr>
                <th>Real Name:</th>
                <td>{character.results.real_name}</td>
              </tr>
              <tr>
                <th>Publisher:</th>
                <td>{character.results.publisher.name}</td>
              </tr>
              <tr>
                <th>Creators:</th>
                <td>
                  <ul>
                    {character.results.creators.map((creator) => (
                      <li key={creator.id}>{creator.name}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              {/* <tr>
                <th>First Appearance:</th>
                <td>Action Comics #1</td>
              </tr> */}
              <tr>
                <th>Appears In:</th>
                <td>{character.results.count_of_issue_appearances}</td>
              </tr>
            </tbody>
          </table>
          <div className="character-history">
            <h3>Origin</h3>
            <p>
              {removeHTMLTagsAndSpecialChars(
                character.results.description.substring(
                  character.results.description.indexOf("Origin") +
                    "origin".length,
                  character.results.description.indexOf("Creation")
                )
              )}
            </p>
            <h3>Creation</h3>
            <p>
              {removeHTMLTagsAndSpecialChars(
                character.results.description.substring(
                  character.results.description.indexOf("Creation") +
                    "Creation".length,
                  character.results.description.indexOf("Character Evolution")
                )
              )}
            </p>
            <h3>Evolution</h3>
            <p>
              {removeHTMLTagsAndSpecialChars(
                character.results.description.substring(
                  character.results.description.indexOf("Character Evolution") +
                    "Creation".length,
                  character.results.description.indexOf("Major Story Arcs")
                )
              )}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default CharacterDetailsPage;
