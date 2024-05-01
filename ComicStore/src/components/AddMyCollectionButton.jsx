import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Toast } from 'primereact/toast';

function AddMyCollectionButton({ id, volume_title, issue_title, issue_number, image }) {

  const [added, setAdded] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    const checkIfInCollection = async () => {
      try {
        const response = await axios.get(`https://comickeeperbackendapi.adaptable.app/collection/${id}`);
        if (response.data) {
          setAdded(true); 
        }
      } catch (error) {
        console.log(`An error occurred while checking if comic is in collection`, error);
      }
    };

    const checkIfinWishlist = async () => {
      try {
        const response = await axios.get(`https://comickeeperbackendapi.adaptable.app/wishlist/${id}`);
        if (response.data) {
          await removeFromWishlist(id);
        }
      } catch (error) {
        console.log(`An error occurred while checking if comic is in collection`, error);
      }
    }

    checkIfInCollection();
    checkIfinWishlist();
  }, [id]);

  const addToCollection = async () => {
    try {
      await axios.post(`https://comickeeperbackendapi.adaptable.app/collection`, {
        id: id,
        volume_title: volume_title,
        issue_title: issue_title,
        issue_number: issue_number,
        image: image
      });
      setAdded(true);
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Comic added to collection' });
    } catch (error) {
      console.log(`An error has occurred adding the comic to the collection`, error);
    }
  };

  const removeFromWishlist = async (comicId) => {
    try {
      await axios.delete(`https://comickeeperbackendapi.adaptable.app/wishlist/${comicId}`);
    } catch (error) {
      console.error("Error deleting comic from wishlist:", error);
    }
  }

  return (
    <>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab aria-label="add" onClick={addToCollection} disabled={added}>
          <AddIcon />
        </Fab>
      </Box>
      <Toast ref={toast} />
    </>
  );
}

export default AddMyCollectionButton;

