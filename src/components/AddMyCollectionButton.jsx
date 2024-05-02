import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Toast } from 'primereact/toast';

function AddMyCollectionButton({ id, volume_title, issue_title, issue_number, image, updatePage }) {

  const [added, setAdded] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    const checkIfInCollection = async () => {
      try {
        const response = await axios.get(`https://comickeeperbackendapi.adaptable.app/collection/${id}`);
        if (response && response.data) {
          setAdded(true); 

          // If a given movie exists in the collection, delete it from wishlist
          //checkIfinWishlistAndDelete(id);


        }
      } catch (error) {
        console.log(`An error occurred while checking if comic is in collection`, error);
      }
    };
    
    // const checkIfinWishlistAndDelete = async (id) => {
    //   try {
    //     const response = await axios.get(`https://comickeeperbackendapi.adaptable.app/wishlist/${id}`);
    //     if (response && response.data) {
    //       await removeFromWishlist(id);
    //     }
    //   } catch (error) {
    //     console.log(`An error occurred while checking if comic is in collection`, error);
    //   }
    // }

    checkIfInCollection();

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

      await axios.delete(`https://comickeeperbackendapi.adaptable.app/wishlist/${id}`);

      setAdded(true);
      updatePage()
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Comic added to collection' });
    } catch (error) {
      console.log(`An error has occurred adding the comic to the collection`, error);
    }
  };

  const removeFromWishlist = async (comicId) => {
    try {
      await axios.delete(`https://comickeeperbackendapi.adaptable.app/wishlist/${comicId}`);
      updatePage()
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

