import express from "express";
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";

// Create a new router instance
const router = express.Router();

//route for getting all items
router.get("/items", getAllItems);

//route for getting a specific item by ID
router.get("/items/:id", getItemById);

//route for creating a new item
router.post("/items", createItem);

//route for updating an existing item by ID
router.put("/items/:id", updateItem);

//route for deleting an item by ID
router.delete("/items/:id", deleteItem);

export default router;
