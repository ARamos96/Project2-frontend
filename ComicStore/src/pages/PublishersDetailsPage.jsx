import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const comicsAPI = `https://corsproxy.io/?https%3A%2F%2Fcomicvine.gamespot.com%2Fapi%2Fpublisher%2F`;
const APIkey = '%3Fapi_key%3D14c652d473fc13e73ef42b10edd6423d911d4969'
const forwardSlash = "%2F"

function PublishersDetailsPage() {

  const [publisher, setPublisher] = useState(null);
  
  const { publisherId } = useParams();
  const newAPI = `${comicsAPI + publisherId + forwardSlash + APIkey + '%26format%3Djson'}`;

  useEffect(() => {
    axios
      .get(
        // `${comicsAPI}/issue/${issueId}/?api_key=14c652d473fc13e73ef42b10edd6423d911d4969&format=json`
        `${newAPI}`
      )
      .then((res) => {
        setPublisher(res.data);
        console.log(res.data);
      });
  }, );

  return (
    <section className="publisher-details">
    <div className="publisher-intro">
      <img />
      <h1>Publisher Details</h1>
      <p>Publisher Description</p>
    </div>
    {/* <table>Publisher Info Table</table> */}
    <div className="publisher-history">
      <h2>Origin</h2>
      <p>Brief origin</p>
      <div className="Timeline">
        <h3>Timeline</h3>
        {/* Bulletlist timeline */}
      </div>
    </div>
  </section>
  )
}

export default PublishersDetailsPage