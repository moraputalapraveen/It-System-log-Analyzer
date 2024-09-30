import React, { useState } from 'react';
import { Select, Button, Typography, Table } from 'antd';
import { useLog } from './LogContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const { Option } = Select;
const { Text } = Typography;

const Download = () => {
  const { logData } = useLog();
  const [downloadType, setDownloadType] = useState('csv');

  // Define columns for the table based on logData properties
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

  const handleDownloadCSV = () => {
    const csvContent = [
      ["IP Address", "Date/Time", "Method", "Requested URL", "HTTP Status", "Bytes Transferred"],
      ...logData.map(log => [
        log.ipAddress,
        log.dateTime,
        log.method,
        log.requestedUrl,
        log.httpStatus,
        log.bytesTransferred,
      ]),
    ]
      .map(e => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "logData.csv");
    link.click();
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    doc.autoTable({
      head: [['IP Address', 'Date/Time', 'Method', 'Requested URL', 'HTTP Status', 'Bytes Transferred']],
      body: logData.map(log => [
        log.ipAddress,
        log.dateTime,
        log.method,
        log.requestedUrl,
        log.httpStatus,
        log.bytesTransferred,
      ]),
      theme: 'grid', // Optional: Use 'striped' or 'plain' for different styles
    });

    doc.save("logData.pdf");
  };

  const handleDownload = () => {
    if (downloadType === 'csv') {
      handleDownloadCSV();
    } else if (downloadType === 'pdf') {
      handleDownloadPDF();
    }
  };

  const handleDownloadTypeChange = (value) => {
    setDownloadType(value);
  };

  return (
    <div style={styles.container}>
      <Select
        defaultValue={downloadType}
        onChange={handleDownloadTypeChange}
        style={styles.formatSelect}
      >
        <Option value="csv">CSV</Option>
        <Option value="pdf">PDF</Option>
      </Select>
      <Button onClick={handleDownload} style={styles.downloadButton}>
        Download {downloadType.toUpperCase()}
      </Button>
      
      {/* Ant Design Table */}
      <Table
        dataSource={logData}
        columns={columns}
        rowKey="id" // Assuming there's a unique 'id' for each log entry
        pagination={false}
        style={styles.table}
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
  formatSelect: {
    width: '30%',
    marginBottom: '10px',
  },
  downloadButton: {
    marginLeft: '10px',
  },
  table: {
    marginTop: '20px',
    border: '1px solid #e0e0e0', // Add border to table
  },
};

export default Download;
