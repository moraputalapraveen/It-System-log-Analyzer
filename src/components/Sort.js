import React, { useState, useEffect } from 'react';
import { Select, Button, Table, Typography } from 'antd';
import { useLog } from './LogContext';

const { Option } = Select;
const { Text } = Typography;

const Sort = () => {
  const { logData } = useLog();
  const [selectedColumn, setSelectedColumn] = useState('method');
  const [sortedLogs, setSortedLogs] = useState(logData); // Show all data by default

  useEffect(() => {
    setSortedLogs(logData); // Reset to show all data when logData changes
  }, [logData]);

  const handleSort = () => {
    const sorted = [...logData].sort((a, b) => {
      if (typeof a[selectedColumn] === 'string') {
        return a[selectedColumn].localeCompare(b[selectedColumn]);
      } else {
        return a[selectedColumn] - b[selectedColumn];
      }
    });
    setSortedLogs(sorted);
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

  // Function to set the row class based on the index for alternating colors
  const rowClassName = (record, index) => {
    return index % 2 === 0 ? 'table-row-even' : 'table-row-odd';
  };

  return (
    <div style={styles.container}>
      <Select
        defaultValue="method"
        onChange={setSelectedColumn}
        style={styles.columnSelect}
      >
        <Option value="method">Method</Option>
        <Option value="ipAddress">IP Address</Option>
        <Option value="requestedUrl">Requested URL</Option>
        <Option value="httpStatus">HTTP Status</Option>
        <Option value="dateTime">Date/Time</Option>
        <Option value="bytesTransferred">Bytes Transferred</Option>
      </Select>
      <Button onClick={handleSort} type="primary" style={styles.sortButton}>
        Sort
      </Button>

      <Table
        dataSource={sortedLogs.length > 0 ? sortedLogs : []} // Show empty array if no data
        columns={columns}
        rowKey="id" // Assuming there's a unique 'id' for each log entry
        style={styles.resultTable}
        pagination={false}
        rowClassName={rowClassName} // Set the row class name for alternating colors
        locale={{ emptyText: <Text type="danger" style={styles.noDataText}>No data found.</Text> }} // Customize empty text
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
  columnSelect: {
    width: '70%',
    marginBottom: '10px',
  },
  sortButton: {
    marginLeft: '10px',
  },
  resultTable: {
    marginTop: '20px',
  },
  noDataText: {
    marginTop: '20px',
    fontSize: '16px',
    marginLeft: '20px',
  },
};

// Add CSS for table header and alternating row colors
const style = document.createElement('style');
style.innerHTML = `
  .ant-table-thead > tr > th {
    background-color: lightblue !important; /* Set header color with !important */
    color: white; /* Optional: change text color to white */
  }
  
`;
document.head.appendChild(style);

export default Sort;
