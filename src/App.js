import './App.css';
import Main from '../src/components/Main'
import Details from '../src/components/Detials'
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Details" element={<Details/>}/>
        <Route path="/" element={<Main/>}/>
      </Routes>
    </Router>
  );
}

export default App;
