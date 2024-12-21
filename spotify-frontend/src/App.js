import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Login from "./pages/Login";

function App() {
  useEffect(() => {
  }, []);
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  </Router>
  );
}

export default App;