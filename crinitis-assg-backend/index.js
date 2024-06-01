import express from "express"; // Express framework for building web applications
import cors from "cors"; // Middleware for enabling Cross-Origin Resource Sharing
import bodyParser from "body-parser"; // Middleware for parsing request bodies
import dotenv from "dotenv"; // Module for loading environment variables from a .env file
import itemRoutes from "./routes/itemRoutes.js"; // Import item routes
 
// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express application
const app = express();

// Define the port the server will listen on
const port = 5000;

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Use bodyParser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Use item routes for handling requests to /api
app.use("/api", itemRoutes);

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
