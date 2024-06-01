// Import the pg package and dotenv for environment variable management
import pkg from "pg";
import dotenv from "dotenv";

// Load environment variables from a .env file into process.env
dotenv.config();

const { Pool } = pkg;

// Create a new Pool instance with database configuration from environment variables
const pool = new Pool({
  user: process.env.DB_USER, // Database username
  host: process.env.DB_HOST, // Database host
  database: process.env.DB_NAME, // Database name
  password: process.env.DB_PASSWORD, // Database password
  port: process.env.DB_PORT, // Database port
});

// Attempt to connect to the database
pool.connect((err, client, release) => {
  // If there is an error acquiring a client, log the error
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  // Log a success message if connected to the database
  console.log("Connected to the database");
  // Release the client back to the pool
  release();
});

export default pool;
