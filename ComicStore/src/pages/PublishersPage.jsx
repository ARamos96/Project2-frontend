import { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../components/Pagination';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


function PublishersPage() {

  const [publishers, setPublishers] = useState([]);
  const [searchPublisher, setSearchPublishers] = useState('');
  const [currentPage,setCurrentPage] = useState(1);
  const [totalPages,setTotalPages] = useState(0)
  const [loading,setLoading] = useState(false)


  useEffect(() =>{
    setLoading(true);
    fetchPublishers();
  },[currentPage]);

  const fetchPublishers =() => {
    const offset = (currentPage - 1) * 100;
    axios
      .get(
        `https://corsproxy.io/?https://comicvine.gamespot.com/api/publishers/?api_key=14c652d473fc13e73ef42b10edd6423d911d4969&format=json&offset=${offset}`,
       {
          withCredentials: false
        }
      )
      .then((response) => {
        
        const sortedPublishers = response.data.results.sort ((a,b) => a.name.localeCompare(b.name))

        setPublishers(sortedPublishers);
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

  const filteredPublishers = publishers.filter((publisher) =>
    publisher.name.toLowerCase().includes(searchPublisher.toLowerCase())
  );

  return (
    <section>
      <div className="header">
        <h2>Publishers</h2>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="searchPublisher"
            label="Search Publisher"
            value={searchPublisher}
            onChange={(e) => setSearchPublishers(e.target.value)}
          />
        </Box>
      </div>
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (

      <div >
        {filteredPublishers.map((publisher) => (
          <div className="author-card" key={publisher.id}> <Link to= {`/publishers/4010-${publisher.id}`}>
            <img src={publisher.image.original_url} alt="publisher-cover" />
            <p>{publisher.name}</p>
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

export default PublishersPage;