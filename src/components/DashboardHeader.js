import React from 'react';
import { DashboardOutlined } from '@ant-design/icons';
import './DashboardHeader.css';

const DashboardHeader = () => {
  return (
    <div className="dashboard-header">
      <div className="header-left">
        <DashboardOutlined className="header-icon" />
        <h1 className="header-title">Cost Dashboard</h1>
      </div>
      <div className="header-right">
        <span className="header-subtitle">Prototype</span>
      </div>
    </div>
  );
};

export default DashboardHeader;
