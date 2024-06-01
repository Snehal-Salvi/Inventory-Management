import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { BACKEND_URL } from "../constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Component for adding a new item
const AddItem = () => {
  // Use the navigate hook for navigation
  const navigate = useNavigate();

  // State to manage the new item data
  const [newItemData, setNewItemData] = useState({
    name: "",
    description: "",
    price: "",
  });

  // Handle input change and update the state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItemData({
      ...newItemData,
      [name]: value,
    });
  };

  // Handle the creation of a new item
  const handleCreateItem = () => {
    const { name, description, price } = newItemData;
    
    // Check if all fields are filled
    if (!name || !description || !price) {
      toast.error("All fields are required.");
      return;
    }

    // Send POST request to create a new item
    axios
      .post(`${BACKEND_URL}/api/items`, newItemData)
      .then((response) => {
        console.log("Item created successfully:", response.data);
        toast.success("Item added successfully");
        
        // Reset the form
        setNewItemData({ name: "", description: "", price: "" });
        
        // Navigate back to the home page
        navigate("/");
      })
      .catch((error) => {
        console.error("Error creating item:", error);
        toast.error("Error creating item");
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper sx={{ padding: "30px", maxWidth: "500px", width: "100%" }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
          Add New Item
        </Typography>

        <TextField
          name="name"
          value={newItemData.name}
          onChange={handleInputChange}
          label="Name"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "15px" }}
        />
        <TextField
          name="description"
          value={newItemData.description}
          onChange={handleInputChange}
          label="Description"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "15px" }}
        />
        <TextField
          name="price"
          value={newItemData.price}
          onChange={handleInputChange}
          label="Price"
          type="number"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "15px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateItem}
          fullWidth
          sx={{ padding: "10px 0" }}
        >
          Add New Item
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/")}
          fullWidth
          sx={{ marginTop: "15px" }}
        >
          Back to Home
        </Button>
      </Paper>
    </Box>
  );
};

export default AddItem;
