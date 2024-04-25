import { useState } from "react";
import axios from "axios"


function AddWishlistButton({id, volume_title, issue_title,issue_number,image}) {

const [added, setAdded] = useState(false)

const addToWishlist = async () => {
  try {
    await axios.post(`https://comickeeperbackendapi.adaptable.app/wishlist`,
    { id:id,
      volume_title:volume_title,
      issue_title:issue_title,
      issue_number:issue_number,
      image:image
    })
    setAdded(true);
  }
  catch (error){
    console.log (`An error has ocurred adding the comic to the wishlist`,error)
  }
}

  return (
    <div>
      <button onClick={addToWishlist} disabled={added}>$</button>
      </div>
  )
}

export default AddWishlistButton