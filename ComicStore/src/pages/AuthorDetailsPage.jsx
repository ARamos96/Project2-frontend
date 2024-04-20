import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

// const authorsAPI = `https://corsproxy.io/?https%3A%2F%2Fcomicvine.gamespot.com%2Fapi%2Fperson%2F`;
// const APIkey = "%3Fapi_key%3D14c652d473fc13e73ef42b10edd6423d911d4969";
// const forwardSlash = "%2F";
const authorsAPI = `https://corsproxy.io/?https://comicvine.gamespot.com/api/person`

function removeHTMLTagsAndSpecialChars(text) {
  // Remove HTML tags except <p> tags
  const withoutTagsExceptP = text.replace(/<(?!\/?p\b)[^>]*>/g, "");
  // Replace <p> tags with newline characters
  const withParagraphBreaks = withoutTagsExceptP.replace(/<\/?p>/g, "\n");
  // Remove special characters except commas and full stops
  const withoutSpecialChars = withParagraphBreaks.replace(/[^\w\s,.]/g, "");
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

  let originalBirthDate, formattedBirthDate, originalDeathDate, formattedDeathDate;

if (author) {
  originalBirthDate = new Date(author.results.birth);
  formattedBirthDate = originalBirthDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  originalDeathDate = author.results.death.date
    ? new Date(author.results.death.date)
    : null;
  formattedDeathDate = originalDeathDate
    ? originalDeathDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

    console.log(removeHTMLTagsAndSpecialChars(author.results.description.substring(0, author.results.description.indexOf('Personal Life') !== -1 ? author.results.description.indexOf('Personal Life') : undefined)))
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
    <section className="author-details">
      {author && (
        <div>
          <div className="author-intro">
            <img src={author.results.image.icon_url}/>
            <h1>Author Name</h1>
            <p><b>General Information</b></p>
          </div>
          {/* <table>Author general info table</table> */}
          <table>
            <tbody>
              <tr>
                <th>Name:</th>
                <td>{author.results.name}</td>
              </tr>
              <tr>
                <th>Gender:</th>
                <td> {author.results.gender === 1 ? "Male" : "Female"}</td>
              </tr>
              <tr>
                <th>Birth:</th>
                <td>{formattedBirthDate}</td>
              </tr>
              <tr>
                <th>Death:</th>
                <td>{formattedDeathDate}</td>
              </tr>
              <tr>
                <th>Town:</th>
                <td>{author.results.hometown}</td>
              </tr>
              <tr>
                <th>Country:</th>
                <td>{author.results.country}</td>
              </tr>
            </tbody>
          </table>
          <div className="author-career">
            <h2>Career</h2>
            <p>{removeHTMLTagsAndSpecialChars(author.results.description.substring(0, author.results.description.indexOf('Personal Life') !== -1 ? author.results.description.indexOf('Personal Life') : undefined))}</p>
          </div>
          <div className="creators">
            <h3>Creators</h3>
            {/* List of creators */}
          </div>
          <div className="characters-created">
            <h3>Characters Created</h3>
            {/* List of characters created */}
          </div>
        </div>
      )}
    </section>
  );
}

export default AuthorDetailsPage;
