import axios from "axios"
import {useState,useEffect} from "react"


function ComicsPage() {

  const [comics, setComics] = useState([]);
  const [searchComic, setSearchComics] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://corsproxy.io/?https://comicvine.gamespot.com/api/issues/?api_key=14c652d473fc13e73ef42b10edd6423d911d4969&format=json'
        , {
          withCredentials: false
        }
      )
      .then((response) => {
        setComics(response.data.results);
      })
      .catch((error) => {
        console.error("Error 404 Page not found", error);
      })

  }, []);

  const filteredComics = comics.filter((comic) =>
    comic && comic.name && comic.name.toLowerCase().includes(searchComic.toLowerCase())
  );

  // Trying to add Volumes in the filters returns an error int he browser related with the API structure


  
  return (

    <section>
    <div className="header">
      <h2>Comics</h2>
      <form>
        <label>
          Search comic
          <input
            name="searchComic"
            type="text"
            onChange={(e) => setSearchComics(e.target.value)}
            value={searchComic}
          />
        </label>
      </form>
    </div>

    <div >
      {filteredComics.map((comic) => (
        
        <div className="author-card" key={comic.id}>
          
          <img src={comic.image.original_url} alt="comic-cover" />
          <p><b>{comic.volume.name} </b><br />
          <small>{comic.name}</small> <br />
          <small>Issue # {comic.issue_number}</small> </p> 
          <div className="comic-action-button">
            <button>$</button>
            <button>+</button>
          </div>
         
        </div>
        
        
      ))}
    </div>
  </section>
);
}

//adding pagination from here

export default ComicsPage