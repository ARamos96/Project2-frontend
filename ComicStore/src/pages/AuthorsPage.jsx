import { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Pagination from '../components/Pagination';

function AuthorsPage() {
  
  const [authors, setAuthors] = useState([]);
  const [searchAuthor, setSearchAuthors] = useState('');
  const [currentPage,setCurrentPage] = useState(1);
  const [totalPages,setTotalPages] = useState(0)


  useEffect(() =>{
    fetchAuthors();
  },[currentPage]);

  const fetchAuthors = () => {
    const offset = (currentPage - 1) * 100;
    axios
      .get(
        `https://corsproxy.io/?https://comicvine.gamespot.com/api/people/?api_key=14c652d473fc13e73ef42b10edd6423d911d4969&format=json&offset=${offset}`,
        {
          withCredentials: false
        }
      )
      .then((response) => {

        const sortedAuthors = response.data.results.sort((a,b)=>
      a.name.localeCompare(b.name))

        setAuthors(sortedAuthors);
        const totalPagesCount = Math.ceil(response.data.number_of_total_results / 100);
        setTotalPages(totalPagesCount);
        //console.log("Total Pages:", totalPagesCount);
      })
      .catch((error) => {
        console.error("Error 404 Page not found", error);
      });
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
            <p><Link to={`/authors/4040-${author.id}`}>
              {author.name}
              </Link>
              </p>
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

export default AuthorsPage;
