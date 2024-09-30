import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation(); // Get the current location

  return (
    <header style={styles.header}>
        
      <nav style={styles.nav}>

        <Link to="/" style={getLinkStyle(location.pathname, "/")}>Upload File</Link>
        <Link to="/analyze" style={getLinkStyle(location.pathname, "/analyze")}>Analyze</Link>
        <Link to="/visualize" style={getLinkStyle(location.pathname, "/visualize")}>Visualize</Link>
        <Link to="/sort" style={getLinkStyle(location.pathname, "/sort")}>Sort</Link>
        <Link to="/search" style={getLinkStyle(location.pathname, "/search")}>Search</Link>
        <Link to="/viewlog" style={getLinkStyle(location.pathname, "/viewlog")}>View LogFile</Link>
        <Link to="/download" style={getLinkStyle(location.pathname, "/download")}>Download</Link>
      </nav>
    </header>
  );
};

// Helper function to determine the link style based on the current path
const getLinkStyle = (currentPath, linkPath) => {
  return {
    color: '#fff', // White text color
    textDecoration: 'none', // Remove underline
    padding: '10px 15px', // Add padding for clickable area
    borderRadius: '5px', // Rounded corners
    background: currentPath === linkPath ? '#FF9800' : 'transparent', // Highlight active link
    transition: 'background 0.3s', // Smooth transition for background
  };
};

const styles = {
  header: {
    padding: '15px',
    background: '#080354',
    display: 'flex',
    justifyContent: 'center',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', // Add shadow for depth
  },
  nav: {
    display: 'flex',
    gap: '20px',
  },
};

export default Dashboard;
