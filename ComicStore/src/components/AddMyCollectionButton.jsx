import { useState } from "react";
import axios from "axios"
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';



function AddMyCollectionButton({id, volume_title, issue_title,issue_number,image}) {
 
const [added, setAdded] = useState(false)
 
const addToCollection = async () => {
  try {
    await axios.post(`https://comickeeperbackendapi.adaptable.app/collection`,
    { id:id,
      volume_title:volume_title,
      issue_title:issue_title,
      issue_number:issue_number,
      image:image
    })
    setAdded(true);
  }
  catch (error){
    console.log (`An error has ocurred adding the comic to the collection`,error)
  }
} 
  
return (
  <Box sx={{ '& > :not(style)': { m: 1 } }}>
    <Fab color="primary" aria-label="add" onClick={addToCollection} disabled={added}>
      <AddIcon />
    </Fab>
  </Box>
);
}

export default AddMyCollectionButton