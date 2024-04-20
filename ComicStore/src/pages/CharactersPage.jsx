import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../components/Pagination';

function CharactersPage() {

  const [characters, setCharacters] = useState([]);
  const [searchCharacter, setSearchCharacters] = useState('');
  const [currentPage,setCurrentPage] = useState(1);
  const [totalPages,setTotalPages] = useState(0)

  useEffect(() => {
    fetchCharacters();
  },[currentPage]);
    
    
  const fetchCharacters = () =>{
    const offset = (currentPage -1) * 100;  
    axios
      .get(
        `https://corsproxy.io/?https://comicvine.gamespot.com/api/characters/?api_key=14c652d473fc13e73ef42b10edd6423d911d4969&format=json&offset=${offset}`,
        {
          withCredentials: false
        }
      )
      .then((response) => {

        const sortedCharacters = response.data.results.sort ((a,b) => a.name.localeCompare(b.name))

        setCharacters(sortedCharacters);
        const totalPagesCount = Math.ceil(response.data.number_of_total_results / 100);
        setTotalPages(totalPagesCount);
        //console.log("Total Pages:", totalPagesCount);
      })
      .catch((error) => {
        console.error("Error 404 Page not found", error);
      })

  };

  const handleNextPage =() => {
    if (currentPage < totalPages){
      setCurrentPage (currentPage +1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1){
      setCurrentPage(currentPage -1)
    }
  }

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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
      />

    </section>
  );
}

//adding pagination from here

export default CharactersPage