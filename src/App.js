// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LogProvider } from './components/LogContext'; // Import the LogProvider
import FileUpload from './components/FileUpload';
import ShowLogFile from './components/Analyze';
import Dashboard from './components/Dashboard'; // Assuming this is your header component
import Visualize from './components/Visualize';
import Search from './components/Search';
import Sort from './components/Sort';
import ViewLog from './components/Viewlogfile';
import Download from './components/Download';

const App = () => {
  return (
    <LogProvider>
      <Router>
        <Dashboard />
        <Routes>
          <Route path="/" element={<FileUpload />} />
          <Route path="/analyze" element={<ShowLogFile />} />
          <Route path='/visualize' element={<Visualize/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/sort' element={<Sort/>}/>
          <Route path='/viewlog' element={<ViewLog/>}/>
          <Route path='download' element={<Download/>}/>
        </Routes>
      </Router>
    </LogProvider>
  );
};

export default App;
