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
        <h3>My Profile</h3>
        <p>Username: Diogo Barros</p>
        <p>Last connection: 23/04/2023</p>
        <p>Avatar</p>
      </section>

      <section>
        <h4>My statistic</h4>
  
        <h5>Total comics</h5>
        {countObjectsInArray(collection)}
        <h5>Total Wishlist</h5>
        {countObjectsInArray(wishlist)}
      </section>

      <section>
        <div>
          <h4>My Collection</h4>
          <div>
            {collection.map((comic) => (
              <div key={comic.id}>
                <img src={comic.image} alt="comic-cover" />
                <p>{comic.volume_title}</p>
                <p>{comic.issue_title}</p>
                <p>{comic.issue_number}</p>
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
            ))}
          </div>
        </div>
        
        <div>
          <h4>My Wishlist</h4>
          <div>
            {wishlist.map((comic) => (
              <div key={comic.id}>
                <img src={comic.image} alt="comic-cover" />
                <p>{comic.volume_title}</p>
                <p>{comic.issue_title}</p>
                <p>{comic.issue_number}</p>
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default MyArea;
