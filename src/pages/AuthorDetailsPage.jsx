import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

// const authorsAPI = `https://corsproxy.io/?https%3A%2F%2Fcomicvine.gamespot.com%2Fapi%2Fperson%2F`;
// const APIkey = "%3Fapi_key%3D14c652d473fc13e73ef42b10edd6423d911d4969";
// const forwardSlash = "%2F";
const authorsAPI = `https://corsproxy.io/?https://comicvine.gamespot.com/api/person`;

// function removeHTMLTagsAndSpecialChars(text) {
//   // Remove HTML tags except <p> tags
//   const withoutTagsExceptP = text.replace(/<(?!\/?p\b)[^>]*>/g, "");
//   // Replace <p> tags with newline characters
//   const withParagraphBreaks = withoutTagsExceptP.replace(/<\/?p>/g, "\n");
//   // Remove special characters except commas and full stops
//   const withoutSpecialChars = withParagraphBreaks.replace(/[^\w\s,.]/g, "");
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

function AuthorDetailsPage() {
  const [author, setAuthor] = useState(null);

  const { authorId } = useParams();
  // const newAPI = `${
  //   authorsAPI + authorId + forwardSlash + APIkey + "%26format%3Djson"
  // }`;

  useEffect(() => {
    axios
      .get(
        `${authorsAPI}/${authorId}/?api_key=14c652d473fc13e73ef42b10edd6423d911d4969&format=json`
        // `${newAPI}`
      )
      .then((res) => {
        setAuthor(res.data);
        console.log(res.data);
      });
  }, []);

  console.log(author);

  let originalBirthDate,
    formattedBirthDate,
    originalDeathDate,
    formattedDeathDate;

  if (author) {
    originalBirthDate = new Date(author.results.birth);
    formattedBirthDate = originalBirthDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    originalDeathDate = author.results.death
      ? new Date(author.results.death.date)
      : null;
    formattedDeathDate = originalDeathDate
      ? originalDeathDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "";
  }

  // const originalBirthDate = new Date(author.results.birth);
  // const formattedBirthDate = originalBirthDate.toLocaleDateString("en-US", {
  //   month: "long",
  //   day: "numeric",
  //   year: "numeric",
  // });

  // const originalDeathDate = author.results.death.date
  //   ? new Date(author.results.death.date)
  //   : null;
  // const formattedDeathDate = originalDeathDate
  //   ? originalDeathDate.toLocaleDateString("en-US", {
  //       month: "long",
  //       day: "numeric",
  //       year: "numeric",
  //     })
  //   : "";

  return (
    <section>
      <hr />
      {author && (
        <div className="author-details">
          <div className="author-intro">
            <img
              src={author.results.image.small_url}
              alt={author.results.name}
            />
            <div className="author-tile-and-deck">
              <h1>{author.results.name}</h1>
              <p>
                {author.results.deck
                  ? removeHTMLTagsAndSpecialChars(author.results.deck)
                  : ""}
              </p>
            </div>
          </div>
          <hr />
          {/* <table>Author general info table</table> */}
          <div className="genInfo-table">
            <h3>
              <b>General Information</b>
            </h3>
            <table>
              <tbody>
                <tr>
                  <th>Name:</th>
                  <td>{author.results.name}</td>
                </tr>
                <tr>
                  <th>Gender:</th>
                  <td>
                    {" "}
                    {author.results.gender === 1
                      ? "Male"
                      : author.results.gender === 2
                      ? "Female"
                      : "-"}
                  </td>
                </tr>
                <tr>
                  <th>Birth:</th>
                  <td>{originalBirthDate ? formattedBirthDate : "-"}</td>
                </tr>
                <tr>
                  <th>Death:</th>
                  <td>{originalDeathDate ? formattedDeathDate : "-"}</td>
                </tr>
                <tr>
                  <th>Town:</th>
                  <td>
                    {author.results.hometown ? author.results.hometown : "-"}
                  </td>
                </tr>
                <tr>
                  <th>Country:</th>
                  <td>
                    {author.results.country ? author.results.country : "-"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr />
          <div className="author-career">
            <h3>Career</h3>
            <p>
              {author.results.description ? (
                removeHTMLTagsAndSpecialChars(
                  author.results.description.substring(
                    author.results.description.indexOf("Career") +
                      "Career".length,
                    author.results.description.indexOf("Personal")
                  )
                )
              ) : (
                <li>Information not available</li>
              )}
            </p>
            <hr />
            <div className="characters-created">
              <h3>Characters Created</h3>
              {/* List of characters created */}
              {author.results && (
                <ul>
                  {/* <li>{author.results.created_characters[0].name}</li> */}
                  {author.results.created_characters ? (
                    author.results.created_characters.map((character) => {
                      return <li key={character.id}>{character.name}</li>;
                    })
                  ) : (
                    <li>Information not available</li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
      <hr />
    </section>
  );
}

export default AuthorDetailsPage;
