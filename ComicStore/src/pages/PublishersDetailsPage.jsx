import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const publisherAPI = `https://corsproxy.io/?https://comicvine.gamespot.com/api/publisher`;

function removeHTMLTagsAndSpecialChars(text) {
  // Remove HTML tags except <p> tags
  const withoutTagsExceptP = text.replace(/<(?!\/?p\b)[^>]*>/g, "");
  // Replace <p> tags with newline characters
  const withParagraphBreaks = withoutTagsExceptP.replace(/<\/?p>/g, "\n");
  // Remove special characters except commas and full stops
  const withoutSpecialChars = withParagraphBreaks.replace(/[^\w\s,.]/g, "");
  return withoutSpecialChars;
}

function PublishersDetailsPage() {
  const [publisher, setPublisher] = useState(null);

  const { publisherId } = useParams();

  useEffect(() => {
    axios
      .get(
        `${publisherAPI}/${publisherId}/?api_key=14c652d473fc13e73ef42b10edd6423d911d4969&format=json`
      )
      .then((res) => {
        setPublisher(res.data);
        console.log(res.data);
      });
  }, []);


  // let originalFoundationDate = new Date(publisher.results.birth);
  // let formattedFoundationDate = originalFoundationDate.toLocaleDateString("en-US", {
  //   month: "long",
  //   day: "numeric",
  //   year: "numeric",
  // });

  return (
    <section className="publisher-details">
      {publisher && (
        <div>
          <div className="publisher-intro">
            <img src={publisher.results.image.icon_url} />
            <h1>{publisher.results.name}</h1>
            <p>{removeHTMLTagsAndSpecialChars(publisher.results.deck)}</p>
          </div>
          {/* <table>Publisher Info Table</table> */}
          {/* <div className="publisher-history"> */}
            {/* <h2>Origin</h2> */}
            {/* <p>Brief origin</p> */}
            {/* <div className="Timeline"> */}
              {/* <h3>Timeline</h3> */}
              {/* Bulletlist timeline */}
            {/* </div> */}
          {/* </div> */}
        </div>
      )}
    </section>
  );
}

export default PublishersDetailsPage;
