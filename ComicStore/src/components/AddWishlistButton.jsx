import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Toast } from "primereact/toast";

function AddWishlistButton({
  id,
  volume_title,
  issue_title,
  issue_number,
  image,
}) {
  const [added, setAdded] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    const checkIfInWishlist = async () => {
      try {
        const response = await axios.get(
          `https://comickeeperbackendapi.adaptable.app/wishlist/${id}`
        );
        if (response.data) {
          setAdded(true);
        }
      } catch (error) {
        console.log(
          "An error occurred while checking if comic is in collection",
          error
        );
      }
    };
    checkIfInWishlist();
  }, [id]);

  const addToWishlist = async () => {
    try {
      await axios.post(`https://comickeeperbackendapi.adaptable.app/wishlist`, {
        id: id,
        volume_title: volume_title,
        issue_title: issue_title,
        issue_number: issue_number,
        image: image,
      });
      setAdded(true);
      toast.current.show({
        severity: "info",
        summary: "Success",
        detail: "Comic added to wishlist",
      });
    } catch (error) {
      console.log(
        `An error has ocurred adding the comic to the wishlist`,
        error
      );
    }
  };

  return (
    <>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab
          color="primary"
          aria-label="add"
          onClick={addToWishlist}
          disabled={added}
        >
          <FavoriteIcon />
        </Fab>
      </Box>
      <Toast ref={toast} />
    </>
  );
}

export default AddWishlistButton;
