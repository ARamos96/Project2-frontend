import { useEffect, useState } from 'react';
import axios from 'axios';

function CharactersPage() {

  const [characters, setCharacters] = useState([]);
  const [searchCharacter, setSearchCharacters] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://corsproxy.io/?https://comicvine.gamespot.com/api/characters/?api_key=14c652d473fc13e73ef42b10edd6423d911d4969&format=json'
        , {
          withCredentials: false
        }
      )
      .then((response) => {
        setCharacters(response.data.results);
      })
      .catch((error) => {
        console.error("Error 404 Page not found", error);
      })

  }, []);

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchCharacter.toLowerCase())
  );

  return (
    <section>
      <div className="header">
        <h2>Characters</h2>
        <form>
          <label>
            Search character
            <input
              name="searchCharacter"
              type="text"
              onChange={(e) => setSearchCharacters(e.target.value)}
              value={searchCharacter}
            />
          </label>
        </form>
      </div>

      <div >
        {filteredCharacters.map((character) => (
          <div className="author-card" key={character.id}>
            <img src={character.image.original_url} alt="Character-cover" />
            <p>{character.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

//adding pagination from here

export default CharactersPage