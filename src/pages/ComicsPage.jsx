import axios from "axios";
import { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import AddMyCollectionButton from "../components/AddMyCollectionButton";
import AddWishlistButton from "../components/AddWishlistButton";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

function ComicsPage() {
  const [comics, setComics] = useState([]);
  const [searchComic, setSearchComics] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchComics();
  }, [currentPage]);

  const fetchComics = () => {
    const offset = (currentPage - 1) * 100;
    axios
      .get(
        `https://corsproxy.io/?https://comicvine.gamespot.com/api/issues/?api_key=14c652d473fc13e73ef42b10edd6423d911d4969&format=json&offset=${offset}`,
        {
          withCredentials: false,
        }
      )
      .then((response) => {
        const sortedComics = response.data.results
          .filter((comic) => comic.name !== null)
          .sort((a, b) => a.name.localeCompare(b.name));
        setComics(sortedComics);

        setComics(sortedComics);
        const totalPagesCount = Math.ceil(
          response.data.number_of_total_results / 100
        );
        setTotalPages(totalPagesCount);
        //console.log("Total Pages:", totalPagesCount);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error 404 Page not found", error);
        setLoading(false);
      });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredComics = comics.filter(
    (comic) =>
      comic &&
      comic.name &&
      comic.name.toLowerCase().includes(searchComic.toLowerCase())
  );

  // Trying to add Volumes in the filters returns an error int he browser related with the API structure

  return (
    <section>
      <div className="header">
        <h2>Comics</h2>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="searchComic"
            label="Search Comic"
            value={searchComic}
            onChange={(e) => setSearchComics(e.target.value)}
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
        <div>
          {filteredComics.map((comic) => (
            <div className="author-card" key={comic.id}>
              <div className="author-card-box">
                <img src={comic.image.original_url} alt="comic-cover" />
                <Link to={`/comics/4000-${comic.id}`}>
                  <p>
                    <b>{comic.volume.name} </b>
                    <br />
                    <small>
                      {comic.name && comic.name < 30
                        ? comic.name
                        : comic.volume.name}
                    </small>{" "}
                    <br />
                    <small>Issue # {comic.issue_number}</small>{" "}
                  </p>
                </Link>
              </div>
              <div className="comic-action-button">
                <AddMyCollectionButton
                  id={comic.id}
                  volume_title={comic.volume.name}
                  issue_title={comic.name}
                  issue_number={comic.issue_number}
                  image={comic.image.original_url}
                />
                <AddWishlistButton
                  id={comic.id}
                  volume_title={comic.volume.name}
                  issue_title={comic.name}
                  issue_number={comic.issue_number}
                  image={comic.image.original_url}
                />
              </div>
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

export default ComicsPage;
