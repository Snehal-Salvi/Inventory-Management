import React from "react";
import axios from "axios";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../constants";

// DeleteItem component to handle item deletion
const DeleteItem = ({ itemId, onDelete }) => {
  // Function to handle the delete item action
  const handleDeleteItem = () => {
    // Confirm the delete action with the user
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    
    // If the user confirms, proceed with the delete request
    if (confirmDelete) {
      axios
        .delete(`${BACKEND_URL}/api/items/${itemId}`)
        .then((response) => {
          console.log("Item deleted successfully:", response.data);
          toast.success("Item deleted successfully");
          
          // Notify parent component to update the item list
          onDelete(itemId);  
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
          toast.error("Error deleting item");
        });
    }
  };

  // Render the delete icon button
  return (
    <IconButton onClick={handleDeleteItem} sx={{ color: "red" }}>
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteItem;
