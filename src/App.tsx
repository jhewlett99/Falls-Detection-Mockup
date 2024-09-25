import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import IncidentView from './components/IncidentView';
import RoomView from './components/RoomView';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/incident/:id" element={<IncidentView />} />
          <Route path="/room/:id" element={<RoomView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;