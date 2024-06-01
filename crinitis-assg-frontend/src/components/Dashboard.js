import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import DeleteItem from "./DeleteItem";
import EditItem from "./EditItem";
import { BACKEND_URL } from "../constants";

// Dashboard component to display and manage items
export default function Dashboard() {
  // State to store items
  const [items, setItems] = useState([]);
  // State to handle errors
  const [error, setError] = useState(null);
  // State to handle loading status
  const [loading, setLoading] = useState(false);
  // State to track the item being edited
  const [editItemId, setEditItemId] = useState(null);

  // Fetch items on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data from the backend
  const fetchData = () => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/api/items`)
      .then((response) => {
        setItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setError(error.message);
        setLoading(false);
      });
  };

  // Function to handle item deletion
  const handleDeleteItem = (deletedItemId) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== deletedItemId)
    );
  };

  // Function to toggle item edit mode
  const handleEditItem = (item) => {
    if (editItemId === item.id) {
      setEditItemId(null);
    } else {
      setEditItemId(item.id);
    }
  };

  // Function to update item after editing
  const handleUpdateItem = (updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setEditItemId(null);
  };

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Button to navigate to the Add New Item page */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "20px",
        }}
      >
        <Button
          variant="contained"
          sx={{ textDecoration: "none", color: "white" }}
        >
          <Link to="/add" style={{ textDecoration: "none", color: "inherit" }}>
            Add New Item
          </Link>
        </Button>
      </div>

      {/* Display items in a card layout */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: "20px",
        }}
      >
        {items.map((item) => (
          <Card
            key={item.id}
            style={{ width: "300px" }}
            sx={{ backgroundColor: "#ECEFF1", borderRadius: "4px" }}
          >
            <CardContent>
              {editItemId === item.id ? (
                // Render EditItem component if the item is in edit mode
                <EditItem
                  itemId={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  onUpdate={handleUpdateItem}
                  onCancel={() => setEditItemId(null)}
                />
              ) : (
                <>
                  {/* Display item details */}
                  <Typography
                    gutterBottom
                    variant="h5"
                    color="navyblue"
                    component="div"
                    sx={{
                      backgroundColor: "skyblue",
                      padding: "8px",
                      borderRadius: "4px",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="grey"
                    sx={{
                      backgroundColor: "white",
                      padding: "8px",
                      margin: "8px",
                      borderRadius: "4px",
                    }}
                  >
                    Description: {item.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="skyblue"
                    sx={{
                      backgroundColor: "white",
                      padding: "8px",
                      margin: "8px",
                      borderRadius: "4px",
                    }}
                  >
                    Price: ${item.price}
                  </Typography>

                  {/* Buttons for deleting and editing the item */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "20px",
                    }}
                  >
                    <DeleteItem itemId={item.id} onDelete={handleDeleteItem} />
                    <IconButton
                      onClick={() => handleEditItem(item)}
                      sx={{ color: "blue" }}
                    >
                      <EditIcon />
                    </IconButton>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
