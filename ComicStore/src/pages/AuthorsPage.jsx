import { useState, useEffect } from 'react';
import axios from 'axios';

function AuthorsPage() {
  
  const [authors, setAuthors] = useState([]);
  const [searchAuthor, setSearchAuthors] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://corsproxy.io/?https://comicvine.gamespot.com/api/people/?api_key=14c652d473fc13e73ef42b10edd6423d911d4969&format=json'
        , {
          withCredentials: false
        }
      )
      .then((response) => {
        setAuthors(response.data.results);
      })
      .catch((error) => {
        console.error("Error 404 Page not found", error);
      })

  }, []);

  const filteredAuthors = authors.filter((author) =>
    author.name.toLowerCase().includes(searchAuthor.toLowerCase())
  );

  return (
    <section>
      <div className="header">
        <h2>Authors</h2>
        <form>
          <label>
            Search author
            <input
              name="searchAuthor"
              type="text"
              onChange={(e) => setSearchAuthors(e.target.value)}
              value={searchAuthor}
            />
          </label>
        </form>
      </div>

      <div >
        {filteredAuthors.map((author) => (
          <div className="author-card" key={author.id}>
            <img src={author.image.original_url} alt="author-cover" />
            <p>{author.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

//adding pagination from here

export default AuthorsPage;
