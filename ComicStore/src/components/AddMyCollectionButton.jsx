import { useState } from "react";
import axios from "axios"

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
    <div>
      <button onClick ={addToCollection} disabled={added}>+</button>
    </div>
  )
}

export default AddMyCollectionButton