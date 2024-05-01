import { useEffect, useState } from "react";
import axios from "axios";
import AddMyCollectionButton from "../components/AddMyCollectionButton";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';

function MyArea() {
  const [collection, setCollection] = useState([]);
  const [wishlist, setWishlist] = useState([]);


  //refactor trying tu use an interval for updating the page. Not working IDK...

  useEffect(() => {
    updatePage()
      const interval = setInterval(updatePage,30000)

      return () => clearInterval(interval)

    },[])


    const updatePage = () => {
      axios.get('https://comickeeperbackendapi.adaptable.app/collection')
      .then((response) => {
        setCollection(response.data);
      })

      axios.get('https://comickeeperbackendapi.adaptable.app/wishlist')
      .then((response) => {
        setWishlist(response.data);
      })

    }

   

  function countObjectsInArray(array) {
    return array.length;
  }

 
  const removeFromCollectionAndEndpoint = (comicId) => {
    axios.delete(`https://comickeeperbackendapi.adaptable.app/collection/${comicId}`)
      .then(() => {
        setCollection(collection.filter(comic => comic.id !== comicId));
      })
      .catch(error => {
        console.error("Error deleting comic from collection:", error);
      });
  };

  const removeFromWishlistAndEndpoint = (comicId) => {
    axios.delete(`https://comickeeperbackendapi.adaptable.app/wishlist/${comicId}`)
      .then(() => {
        setWishlist(wishlist.filter(comic => comic.id !== comicId));
      })
      .catch(error => {
        console.error("Error deleting comic from wishlist:", error);
      });
  };

  return (
    <div>
      <section>
        <h3>Welcome to your page!</h3>
        <p>Username: Diogo Barros</p>
        <p>Last connection: 23/04/2023</p>
        <p>Avatar</p>
      </section>

      <section>

        <h4>My statistics</h4>
          <div className="statistics">
              <div className="statistics-card">
                <h5>Your comics</h5>
                <p> {countObjectsInArray(collection)}</p>
              </div>

              <div className="statistics-card">
              <h5>Your Wishlist</h5>
              <p>{countObjectsInArray(wishlist)}</p> 
              </div>

          </div>
      </section>
      
      <hr />

      <section>
  <div>
    <h4>My Collection</h4>
    <div className="collection-scroll-container">
      <div className="collection-container">
        {collection.map((comic) => (
          <div className="collection-card" key={comic.id}>
            <img src={comic.image} alt="comic-cover" />
            <p><b>{comic.volume_title}</b></p>
            <p><em>{comic.issue_title}</em></p>
            <p>#{comic.issue_number}</p>
            <div className="collection-card-buttons">
              <Stack direction="row" spacing={2}>
                <Button
                  color="error"
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => removeFromCollectionAndEndpoint(comic.id)}>
                  Delete
                </Button>
              </Stack>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  <hr />

  <div>
    <h4>My Wishlist</h4>
    <div className="wishlist-scroll-container">
      <div className="collection-container">
        {wishlist.map((comic) => (
          <div className="collection-card" key={comic.id}>
            <img src={comic.image} alt="comic-cover" />
            <p><b>{comic.volume_title}</b></p>
            <p><em>{comic.issue_title}</em></p>
            <p>#{comic.issue_number}</p>
            <div className="collection-card-buttons">
              <AddMyCollectionButton
                id = {comic.id}
                image = {comic.image}
                volume_title = {comic.volume_title}
                issue_title = {comic.issue_title}
                issue_number = {comic.issue_number}  
                 />
              <Stack direction="row" spacing={2}>
                <Button
                  color="error"
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => removeFromWishlistAndEndpoint(comic.id)}>
                  Delete
                </Button>
              </Stack>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

    </div>
  );
}

export default MyArea;
