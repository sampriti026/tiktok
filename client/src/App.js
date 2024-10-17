import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SchedulePosts from './SchedulePosts';
import Dashboard from '../client/src/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SchedulePosts />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;