import { useEffect,useState } from "react"
import axios from "axios"

function MyArea() {

const [collection,setCollection] = useState([]);
const [wishlist,setWishlist] = useState([])
const [searchComic,setSearchComic] = useState('');

useEffect(()=>{
  axios
  .get('https://comickeeperbackendapi.adaptable.app/collection')
  .then((response)=>{
    setCollection(response.data)
  })
},[])

useEffect(()=>{
  axios
  .get('https://comickeeperbackendapi.adaptable.app/wishlist')
  .then((response)=>{
    setWishlist(response.data)
  })
},[])

  return (
    <div>
      <section>
        <h3>My Profile</h3>
        <p>Username: Diogo Barros</p>
        <p>Last connectin: 23/04/2023</p>
        <p>Avatar</p>
      </section>

      <section>
        <p>Total comics</p>
        <p>Total Wishlist</p>


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