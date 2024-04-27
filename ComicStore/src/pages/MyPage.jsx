import { useEffect, useState } from "react"
import axios from "axios"


function MyArea() {

  const [collection, setCollection] = useState([]);
  const [wishlist, setWishlist] = useState([])


  useEffect(() => {
    axios
      .get('https://comickeeperbackendapi.adaptable.app/collection')
      .then((response) => {
        const collectionArray = response.data;
        setCollection(collectionArray);
      })
  }, [])

  function countObjectsInArray(array) {
    return array.length;
  }

  useEffect(() => {
    axios
      .get('https://comickeeperbackendapi.adaptable.app/wishlist')
      .then((response) => {
        const wishlistArray = response.data;
        setWishlist(wishlistArray)
      })
  }, [])



  return (
    <div>
      <section>
        <h3>My Profile</h3>
        <p>Username: Diogo Barros</p>
        <p>Last connectin: 23/04/2023</p>
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
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default MyArea;