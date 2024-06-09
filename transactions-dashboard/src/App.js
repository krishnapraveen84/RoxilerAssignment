import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar/Navbar';
import TransactionTable from './components/TransactionTable/TransactionTable';
import Statistics from './components/Statistics/Statistics';
import BarChart from './components/BarChart/BarChart';
import './App.css'

const App = () => {
  return (
    <Router>
      <div className='main-container'>
        <Navbar />
        <Routes>
          <Route path="/" element={<TransactionTable />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/bar-chart" element={<BarChart />} />
        </Routes>
        
      </div>
    </Router>
  );
};

export default App;
