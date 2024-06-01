// Import the pool instance from the database configuration file
import pool from '../config/db.js';

// Controller to get all items from the database
export const getAllItems = async (req, res) => {
    try {
        // Query the database to select all items
        const result = await pool.query('SELECT * FROM items');
        // Send the retrieved rows as a JSON response
        res.json(result.rows);
    } catch (err) {
        // Log any errors and send a 500 status with a server error message
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Controller to get a single item by its ID from the database
export const getItemById = async (req, res) => {
    const { id } = req.params; // Extract the ID from the request parameters
    try {
        // Query the database to select the item with the given ID
        const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
        // If no item is found, send a 404 status with an item not found message
        if (result.rows.length === 0) {
            return res.status(404).send('Item not found');
        }
        // Send the retrieved item as a JSON response
        res.json(result.rows[0]);
    } catch (err) {
        // Log any errors and send a 500 status with a server error message
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Controller to create a new item in the database
export const createItem = async (req, res) => {
    const { name, description, price } = req.body; // Extract item details from the request body
    try {
        // Insert the new item into the database and return the created item
        const result = await pool.query(
            'INSERT INTO items (name, description, price, updated_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *',
            [name, description, price]
        );
        // Send the created item as a JSON response with a 201 status
        res.status(201).json(result.rows[0]);
    } catch (err) {
        // Log any errors and send a 500 status with a server error message
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Controller to update an existing item in the database
export const updateItem = async (req, res) => {
    const { id } = req.params; // Extract the ID from the request parameters
    const { name, description, price } = req.body; // Extract the updated details from the request body
    try {
        // Update the item in the database and return the updated item
        const result = await pool.query(
            'UPDATE items SET name = $1, description = $2, price = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
            [name, description, price, id]
        );
        // If no item is found to update, send a 404 status with an item not found message
        if (result.rows.length === 0) {
            return res.status(404).send('Item not found');
        }
        // Send the updated item as a JSON response
        res.json(result.rows[0]);
    } catch (err) {
        // Log any errors and send a 500 status with a server error message
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Controller to delete an item from the database
export const deleteItem = async (req, res) => {
    const { id } = req.params; // Extract the ID from the request parameters
    try {
        // Delete the item from the database and return the deleted item
        const result = await pool.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);
        // If no item is found to delete, send a 404 status with an item not found message
        if (result.rows.length === 0) {
            return res.status(404).send('Item not found');
        }
        // Send a success message indicating the item was deleted
        res.send('Item deleted');
    } catch (err) {
        // Log any errors and send a 500 status with a server error message
        console.error(err);
        res.status(500).send('Server Error');
    }
};
