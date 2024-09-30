import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLog } from './LogContext'; // Correct import path for LogContext
import background from './background.jpg'; // Assuming you are importing the background image

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('log');
  const [fileContent, setFileContent] = useState('');
  const { setLogData } = useLog(); // Get setLogData from context
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      setFileContent(content);
    };
    reader.readAsText(selectedFile);
  };

  const handleFileTypeChange = (event) => {
    setFileType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!file) {
      alert('Please upload a file.');
      return;
    }

    // Parse the log file content
    const parsedData = parseLogFile(fileContent);
    setLogData(parsedData); // Store the parsed log data in context

    // Navigate to the Show page
    navigate('/analyze');
  };

  // Log Parsing function
  const parseLogFile = (content) => {
    const logPattern = /(\S+) (\S+) (\S+) \[([\w:/]+\s[+\-]\d{4})\] "(\S+) (\S+)\s*(\S*)" (\d{3}) (\d+)/;
    const lines = content.split('\n');
    const parsedLines = lines.map((line) => {
      const match = line.match(logPattern);
      if (match) {
        return {
          ipAddress: match[1],
          dateTime: match[4],
          method: match[5],
          requestedUrl: match[6],
          httpStatus: match[8],
          bytesTransferred: match[9],
        };
      }
      return null;
    });
    return parsedLines.filter((entry) => entry !== null);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h1 style={styles.heading}>IT System Log File Analysis</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Add your Log File</label>
          <input
            type="file"
            accept=".log,.txt"
            onChange={handleFileChange}
            style={styles.fileInput}
          />
          <button type="submit" style={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

// Styles for the FileUpload component
const styles = {
  pageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Full height of the viewport
    backgroundImage: `url(${background})`, 
    backgroundColor: 'rgba(249, 249, 249, 0.4)',
    // Use imported background image
    backgroundSize: 'cover', // Cover the entire area
    backgroundPosition: 'center', // Center the background image
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px',
   
    backgroundColor: 'rgba(249, 249, 249, 0.9)', // Semi-transparent background
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px', // Max width for better alignment
    margin: 'auto', // Center the container
  },
  heading: {
    marginBottom: '20px',
    fontSize: '28px', // Increased heading size for better visibility
    color: '#333',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch', // Align items to fill the width
    gap: '15px',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontSize: '16px',
    color: '#555',
  },
  fileInput: {
    marginTop: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '10px', // Added padding for file input
  },
  submitButton: {
    padding: '12px 24px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
    alignSelf: 'center', // Center the button
  },
};

export default FileUpload;
