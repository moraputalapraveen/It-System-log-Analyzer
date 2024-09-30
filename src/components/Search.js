// src/components/Search.js
import React, { useState, useEffect } from 'react';
import { Input, Select, Button, Table, Typography } from 'antd';
import { useLog } from './LogContext';

const { Option } = Select;
const { Text } = Typography;

const Search = () => {
  const { logData } = useLog();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('method');
  const [filteredLogs, setFilteredLogs] = useState(logData); // Show all data by default

  useEffect(() => {
    setFilteredLogs(logData); // Reset to show all data when logData changes
  }, [logData]);

  const handleSearch = () => {
    const filtered = logData.filter((log) =>
      log[selectedColumn]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLogs(filtered);
  };

  const handleColumnChange = (value) => {
    setSelectedColumn(value);
  };

  // Define columns for the table based on logData properties
  const columns = [
    {
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
    },
    {
      title: 'IP Address',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
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
      title: 'Date/Time',
      dataIndex: 'dateTime',
      key: 'dateTime',
    },
    {
      title: 'Bytes Transferred',
      dataIndex: 'bytesTransferred',
      key: 'bytesTransferred',
    },
  ];

  return (
    <div style={styles.container}>
      <Input
        placeholder="Enter search text"
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchInput}
      />
      <Select
        defaultValue="method"
        onChange={handleColumnChange}
        style={styles.columnSelect}
      >
        <Option value="method">Method</Option>
        <Option value="ipAddress">IP Address</Option>
        <Option value="requestedUrl">Requested URL</Option>
        <Option value="httpStatus">HTTP Status</Option>
        <Option value="dateTime">Date/Time</Option>
        <Option value="bytesTransferred">Bytes Transferred</Option>
      </Select>
      <Button onClick={handleSearch} type="primary" style={styles.searchButton}>
        Search
      </Button>
      
        <Table
          dataSource={filteredLogs}
          columns={columns}
          rowKey="id" // Assuming there's a unique 'id' for each log entry
          style={styles.resultTable}
          pagination={false}
        />
      
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
  searchInput: {
    width: '60%',
    marginBottom: '10px',
  },
  columnSelect: {
    width: '30%',
    marginBottom: '10px',
    marginLeft: '10px',
  },
  searchButton: {
    marginLeft: '10px',
  },
  resultTable: {
    marginTop: '20px',
  },
  noDataText: {
    marginLeft: '20px',
    marginTop: '20px',
    fontSize: '16px',
  },
};

export default Search;
