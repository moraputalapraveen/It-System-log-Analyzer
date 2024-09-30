// src/components/Visualize.js
import React, { useState } from 'react';
import { useLog } from './LogContext';
import { Pie, Bar, Line, Area } from '@ant-design/charts';
import { Typography, Select, Button } from 'antd';

const { Title } = Typography;
const { Option } = Select;

const Visualize = () => {
  const { logData } = useLog();
  const [chartType, setChartType] = useState('pie');
  const [selectedColumn, setSelectedColumn] = useState('method');
  const [chartData, setChartData] = useState([]);

  // Function to get counts based on selected column
  const getCounts = (column) => {
    const counts = {};
    logData.forEach((entry) => {
      if (entry[column]) {
        counts[entry[column]] = (counts[entry[column]] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([key, value]) => ({
      type: key,
      value: value,
    }));
  };

  const handleChartTypeChange = (value) => {
    setChartType(value);
  };

  const handleColumnChange = (value) => {
    setSelectedColumn(value);
  };

  const handleSubmit = () => {
    setChartData(getCounts(selectedColumn));
  };

  const config = {
    data: chartData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
  };

  const doughnutConfig = {
    ...config,
    innerRadius: 0.6, // Make it a doughnut chart
  };

  const barConfig = {
    data: chartData,
    xField: 'type',
    yField: 'value',
  };

  const lineConfig = {
    data: chartData,
    xField: 'type',
    yField: 'value',
    smooth: true,
  };

  const areaConfig = {
    data: chartData,
    xField: 'type',
    yField: 'value',
    areaStyle: {
      fill: 'l(270) 0:#5B8FF9 0.5:#E8EDF3 1:#FFFFFF',
    },
  };

  return (
    <div className="visualization-container">
      <Title level={2}>Data Visualization</Title>
      <div className="controls">
        <Select 
          defaultValue="pie" 
          onChange={handleChartTypeChange} 
          className="chart-type-select"
        >
          <Option value="pie">Pie Chart</Option>
          <Option value="doughnut">Doughnut Chart</Option>
          <Option value="bar">Bar Chart</Option>
          <Option value="line">Line Chart</Option>
          <Option value="area">Area Chart</Option>
        </Select>
        <Select 
          defaultValue="method" 
          onChange={handleColumnChange} 
          className="column-select"
        >
          <Option value="method">Method</Option>
          <Option value="ipAddress">IP Address</Option>
          
          
          <Option value="httpStatus">HTTP Status</Option>
          
        </Select>
        <Button onClick={handleSubmit} type="primary" className="submit-button">
          Submit
        </Button>
      </div>
      {chartData.length > 0 ? (
        <div className="chart-container">
          {chartType === 'pie' ? (
            <Pie {...config} />
          ) : chartType === 'doughnut' ? (
            <Pie {...doughnutConfig} /> // Render Doughnut Chart
          ) : chartType === 'bar' ? (
            <Bar {...barConfig} />
          ) : chartType === 'line' ? (
            <Line {...lineConfig} />
          ) : (
            <Area {...areaConfig} />
          )}
        </div>
      ) : (
        <p>No data available for visualization.</p>
      )}
      <style>
        {`
          .visualization-container {
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
           
            margin: auto;
          }

          .controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }

          .chart-type-select,
          .column-select {
            width: 45%; /* Adjust width as necessary */
          }

          .submit-button {
            margin-left: 10px;
          }

          .chart-container {
            margin-top: 20px;
            padding: 20px;
            border: 1px solid #e8e8e8;
            border-radius: 8px;
            background-color: #f9f9f9;
          }
        `}
      </style>
    </div>
  );
};

export default Visualize;
