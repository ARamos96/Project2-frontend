import { useState } from "react";
import axios from "axios"
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import FavoriteIcon from '@mui/icons-material/Favorite';


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
  <Box sx={{ '& > :not(style)': { m: 1 } }}>
    <Fab color="secondary" aria-label="add" onClick={addToWishlist} disabled={added}>
      <FavoriteIcon />
    </Fab>
  </Box>
);
}

export default AddWishlistButton