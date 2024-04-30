import { useEffect, useState } from "react";
import axios from "axios";
import AddMyCollectionButton from "../components/AddMyCollectionButton";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';

function MyArea() {
  const [collection, setCollection] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    axios.get('https://comickeeperbackendapi.adaptable.app/collection')
      .then((response) => {
        const collectionArray = response.data;
        setCollection(collectionArray);
      });
  }, []);

  useEffect(() => {
    axios.get('https://comickeeperbackendapi.adaptable.app/wishlist')
      .then((response) => {
        const wishlistArray = response.data;
        setWishlist(wishlistArray);
      });
  }, []);

  function countObjectsInArray(array) {
    return array.length;
  }

  const addToCollectionAndDeleteInWishlist = (comic) => {
    setCollection([...collection, comic]);
    setWishlist(wishlist.filter(item => item.id !== comic.id));
  };

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
              <AddMyCollectionButton comic={comic} addToCollectionAndDeleteInWishlist={addToCollectionAndDeleteInWishlist} />
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
