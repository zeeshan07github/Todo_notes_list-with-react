import React from 'react';
import './App.css';
import Header from './components/header';
import Noteslistpage from './pages/noteslistpage';
import Notepage from './pages/notepage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container dark">
        <div className="app">
        <Header />
        <Routes> 
          <Route path='/' element={<Noteslistpage />} />
          <Route path="/note/:id" element={<Notepage />} />
        </Routes>

        </div>
      </div>
    </Router>
  );
}

export default App;
