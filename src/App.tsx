import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import IncidentView from './components/IncidentView';
import RoomView from './components/RoomView';
import IncidentSettings from './components/IncidentSettings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/incident/:id" element={<IncidentView />} />
        <Route path="/room/:id" element={<RoomView />} />
        <Route path="/incident-settings" element={<IncidentSettings />} />
      </Routes>
    </Router>
  );
}

export default App;