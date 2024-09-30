import React from 'react';
import { useLog } from './LogContext';

const ViewLog = () => {
  const { logData } = useLog();

  return (
    <div style={styles.container}>
      <h2>Log File Contents</h2>
      {logData.length > 0 ? (
        <pre style={styles.logContent}>
          {logData.map((log) => (
            `${log.ipAddress} - - [${log.dateTime}] "${log.method} ${log.requestedUrl} HTTP/1.1" ${log.httpStatus} ${log.bytesTransferred}\n`
          )).join('')}
        </pre>
      ) : (
        <p>No log data available.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    margin: 'auto',
  },
  logContent: {
    whiteSpace: 'pre-wrap', // Preserve whitespace formatting
  },
};

export default ViewLog;
