import { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../components/Pagination';

function PublishersPage() {

  const [publishers, setPublishers] = useState([]);
  const [searchPublisher, setSearchPublishers] = useState('');
  const [currentPage,setCurrentPage] = useState(1);
  const [totalPages,setTotalPages] = useState(0)

  useEffect(() =>{
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
      />

    </section>
  );
}

export default PublishersPage