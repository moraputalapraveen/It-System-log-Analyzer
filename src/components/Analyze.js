// src/components/ShowLogFile.js
import React from 'react';
import { useLog } from './LogContext';
import { Table, Typography } from 'antd';

const { Title } = Typography;

const ShowLogFile = () => {
  const { logData } = useLog(); // Get the log data from context

  // Define the columns for the Ant Design table
  const columns = [
    {
      title: 'IP Address',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
    },
    {
      title: 'Date/Time',
      dataIndex: 'dateTime',
      key: 'dateTime',
    },
    {
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
    },
    {
      title: 'Requested URL',
      dataIndex: 'requestedUrl',
      key: 'requestedUrl',
    },
    {
      title: 'HTTP Status',
      dataIndex: 'httpStatus',
      key: 'httpStatus',
    },
    {
      title: 'Bytes Transferred',
      dataIndex: 'bytesTransferred',
      key: 'bytesTransferred',
    },
  ];

  return (
    <div style={styles.container}>
      <Title level={2}>Log File Content</Title>
      {logData.length > 0 ? (
        <Table dataSource={logData} columns={columns} rowKey={(record) => record.ipAddress + record.dateTime} />
      ) : (
        <p>No log data available. Please upload a file.</p>
      )}
    </div>
  );
};

// Styles for the ShowLogFile component
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
};

export default ShowLogFile;
