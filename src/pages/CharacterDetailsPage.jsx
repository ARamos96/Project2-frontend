import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const characterAPI = `https://corsproxy.io/?https://comicvine.gamespot.com/api/character`;

// function removeHTMLTagsAndSpecialChars(text) {
//   //Remove <figcaption> tags and their content
//   const withoutFigCaptionTags = text.replace(
//     /<figcaption>[\s\S]*?<\/figcaption>/g,
//     ""
//   );
//   // Remove HTML tags except <p> tags
//   const withoutTagsExceptP = withoutFigCaptionTags.replace(
//     /<(?!\/?p\b)[^>]*>/g,
//     ""
//   );
//   // Replace <p> tags with newline characters
//   const withParagraphBreaks = withoutTagsExceptP.replace(/<\/?p[^>]*>/g, "\n");
//   // Remove special characters except commas, hyphens and full stops
//   const withoutSpecialChars = withParagraphBreaks.replace(/[^\w\s,.()#-]/g, "");
//   return withoutSpecialChars;
// }

function removeHTMLTagsAndSpecialChars(text) {
  const withoutFigCaptionTags = text.replace(
    /<figcaption>[\s\S]*?<\/figcaption>/g,
    ""
  );

  const withoutTagsExceptP = withoutFigCaptionTags.replace(
    /<(?!\/?p\b)[^>]*>/g,
    ""
  );

  const withParagraphBreaks = withoutTagsExceptP.replace(/<\/?p[^>]*>/g, "\n");

  const withoutSpecialChars = withParagraphBreaks.replace(
    /[^\w\s,.()#\-\n']/g,
    ""
  );

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

  if (character) {
    console.log(
      "Processed text:",
      removeHTMLTagsAndSpecialChars(
        character.results.description.substring(
          character.results.description.indexOf("Character Evolution") +
            "Character Evolution".length,
          character.results.description.indexOf("Major Story Arcs")
        )
      )
    );
  }

  return (
    <section>
      <hr />
      {character && (
        <div className="character-details">
          <div className="character-intro">
            <img
              src={character.results.image.small_url}
              alt="no image available"
            />
            <div className="author-tile-and-deck">
              <h1>{character.results.name}</h1>
              <p>
                {character.results.deck
                  ? removeHTMLTagsAndSpecialChars(character.results.deck)
                  : ""}
              </p>
            </div>
          </div>
          <hr />
          {/* <table>Character Info table</table> */}
          <div className="genInfo-table">
            <h3>
              <b>General Information</b>
            </h3>
            <table>
              <tbody>
                <tr>
                  <th>Super Name</th>
                  <td>
                    {character.results.name ? character.results.name : "-"}
                  </td>
                </tr>
                <tr>
                  <th>Real Name</th>
                  <td>
                    {character.results.real_name
                      ? character.results.real_name
                      : "-"}
                  </td>
                </tr>
                <tr>
                  <th>Publisher</th>
                  <td>
                    {character.results.publisher.name
                      ? character.results.publisher.name
                      : "-"}
                  </td>
                </tr>
                <tr>
                  <th>Creators</th>
                  <td>
                    {character.results.creators.length
                      ? character.results.creators.map((creator) => (
                          <li key={creator.id}>{creator.name}</li>
                        ))
                      : "-"}
                  </td>
                </tr>
                {/* <tr>
                <th>First Appearance:</th>
                <td>Action Comics #1</td>
              </tr> */}
                <tr>
                  <th>Appears In</th>
                  <td>{character.results.count_of_issue_appearances} issues</td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr />
          <div className="author-career">
            <h3>Origin</h3>
            <p>
              {character.results.description &&
              character.results.description.includes("Origin") ? (
                removeHTMLTagsAndSpecialChars(
                  character.results.description.substring(
                    character.results.description.indexOf("Origin") +
                      "origin".length,
                    character.results.description.indexOf("Creation")
                  )
                )
                .split("\n")
                .map(str => <p>{str}</p>)
              ) : (
                <li>Information not available</li>
              )}
            </p>
            <hr />
            <h3>Creation</h3>
            <p>
              {character.results.description &&
              character.results.description.includes("Creation") ? (
                removeHTMLTagsAndSpecialChars(
                  character.results.description.substring(
                    character.results.description.indexOf("Creation") +
                      "Creation".length,
                    character.results.description.indexOf("Character Evolution")
                  )
                )
                .split("\n")
                .map(str => <p>{str}</p>)
              ) : (
                <li>Information not available</li>
              )}
            </p>
            <hr />
            <h3>Evolution</h3>
            <p>
              {character.results.description &&
              character.results.description.includes("Evolution") ? (
                removeHTMLTagsAndSpecialChars(
                  character.results.description.substring(
                    character.results.description.indexOf(
                      "Character Evolution"
                    ) + "Character Evolution".length,
                    character.results.description.indexOf("Major Story Arcs")
                  )
                )
                .split("\n")
                .map(str => <p>{str}</p>)
              ) : (
                <li>Information not available</li>
              )}
            </p>
          </div>
        </div>
      )}
      <hr />
    </section>
  );
}

export default CharacterDetailsPage;
