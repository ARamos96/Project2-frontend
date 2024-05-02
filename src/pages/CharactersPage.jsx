import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../components/Pagination';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { CircularProgress } from '@mui/material';

function CharactersPage() {

  const [characters, setCharacters] = useState([]);
  const [searchCharacter, setSearchCharacters] = useState('');
  const [currentPage,setCurrentPage] = useState(1);
  const [totalPages,setTotalPages] = useState(0)
  const [loading,setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)
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
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error 404 Page not found", error);
        setLoading(false)
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
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off">
            <TextField
            id="searchCharacter"
            label="Search Character"
            value={searchCharacter}
            onChange={(e) => setSearchCharacters(e.target.value)}
            
            />
          </Box>
      </div>

      {loading ? (
        <CircularProgress
          sx={{
            position: 'relative',
            top: '50%',
            left: '50%',
            marginBottom: '100px',  
          }}
        />
      ) : (

      <div >
        {filteredCharacters.map((character) => (
          <div className="author-card" key={character.id}> 
            <img src={character.image.original_url} alt="Character-cover" />
            <Link to ={`/characters/4005-${character.id}`}>
            <p>{character.name}</p>
            </Link>
          </div>
          
        ))}
      </div>
      )}

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