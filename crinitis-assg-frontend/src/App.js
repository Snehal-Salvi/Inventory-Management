import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddItem from "./components/AddItem";

const App = () => {
  return (
    <Router>
      <h1 className="heading"> Inventory Management</h1>
      <Routes>
        {/* Route for Dashboard component */}
        <Route path="/" element={<Dashboard />} />
        {/* Route for AddItem component */}
        <Route path="/add" element={<AddItem />} />
      </Routes>
    </Router>
  );
};

export default App;
