import React from 'react';
import { DashboardOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import './DashboardHeader.css';

const DashboardHeader = ({ tenantType, setTenantType }) => {
  const handleToggle = (checked) => {
    setTenantType(checked ? 'MT' : 'ST');
  };

  return (
    <div className="dashboard-header">
      <div className="header-left">
        <DashboardOutlined className="header-icon" />
        <h1 className="header-title">Cost Dashboard</h1>
      </div>
      <div className="header-center">
        <div className="tenant-toggle">
          <span className={`toggle-label ${tenantType === 'ST' ? 'active' : ''}`}>ST</span>
          <Switch
            checked={tenantType === 'MT'}
            onChange={handleToggle}
            className="toggle-switch"
          />
          <span className={`toggle-label ${tenantType === 'MT' ? 'active' : ''}`}>MT</span>
        </div>
      </div>
      <div className="header-right">
        <span className="header-subtitle">Prototype</span>
      </div>
    </div>
  );
};

export default DashboardHeader;
