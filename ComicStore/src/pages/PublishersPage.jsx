import { useState, useEffect } from 'react';
import axios from 'axios';

function PublishersPage() {

  const [publishers, setPublishers] = useState([]);
  const [searchPublisher, setSearchPublishers] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://corsproxy.io/?https://comicvine.gamespot.com/api/publishers/?api_key=14c652d473fc13e73ef42b10edd6423d911d4969&format=json'
        , {
          withCredentials: false
        }
      )
      .then((response) => {
        setPublishers(response.data.results);
      })
      .catch((error) => {
        console.error("Error 404 Page not found", error);
      })

  }, []);

  const filteredPublishers = publishers.filter((publisher) =>
    publisher.name.toLowerCase().includes(searchPublisher.toLowerCase())
  );

  return (
    <section>
      <div className="header">
        <h2>Publishers</h2>
        <form>
          <label>
            Search Publisher
            <input
              name="searchPublisher"
              type="text"
              onChange={(e) => setSearchPublishers(e.target.value)}
              value={searchPublisher}
            />
          </label>
        </form>
      </div>

      <div >
        {filteredPublishers.map((publisher) => (
          <div className="author-card" key={publisher.id}>
            <img src={publisher.image.original_url} alt="publisher-cover" />
            <p>{publisher.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

//adding pagination from here

export default PublishersPage