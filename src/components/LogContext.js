// src/context/LogContext.js
import React, { createContext, useContext, useState } from 'react';

const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const [logData, setLogData] = useState([]);

  return (
    <LogContext.Provider value={{ logData, setLogData }}>
      {children}
    </LogContext.Provider>
  );
};

export const useLog = () => {
  return useContext(LogContext);
};
