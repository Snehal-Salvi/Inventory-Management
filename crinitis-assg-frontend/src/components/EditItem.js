import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { toast } from "react-toastify";

// EditItem component for editing item details
const EditItem = ({ itemId, name, description, price, onUpdate, onCancel }) => {
  // State to manage edited data
  const [editData, setEditData] = useState({ name, description, price });

  // Update editData state when props change
  useEffect(() => {
    setEditData({ name, description, price });
  }, [name, description, price]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  // Save edited item data
  const handleSaveEdit = () => {
    // Check if all fields are filled
    if (!editData.name || !editData.description || !editData.price) {
      toast.error("All fields are required.");
      return;
    }

    // Send PUT request to update item
    axios
      .put(`${BACKEND_URL}/api/items/${itemId}`, editData)
      .then((response) => {
        // Update item in parent component
        onUpdate(response.data);
      })
      .catch((error) => {
        console.error("Error updating item:", error);
        toast.error("Error updating item.");
      });
  };

  return (
    <Box>
      {/* Text field for editing item name */}
      <TextField
        name="name"
        value={editData.name}
        onChange={handleInputChange}
        label="Name"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: "15px" }}
      />
      {/* Text field for editing item description */}
      <TextField
        name="description"
        value={editData.description}
        onChange={handleInputChange}
        label="Description"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: "15px" }}
      />
      {/* Text field for editing item price */}
      <TextField
        name="price"
        value={editData.price}
        onChange={handleInputChange}
        label="Price"
        type="number"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: "15px" }}
      />
      {/* Button to save edited item */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveEdit}
        fullWidth
        sx={{ padding: "10px 0", marginBottom: "10px" }}
      >
        Save
      </Button>
      {/* Button to cancel editing */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={onCancel}
        fullWidth
        sx={{ padding: "10px 0" }}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default EditItem;
