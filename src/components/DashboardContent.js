import React from 'react';
import { Tabs } from 'antd';
import AWSCosts from './AWSCosts';
import DBxCosts from './DBxCosts';
import CostSummary from './CostSummary';
import './DashboardContent.css';

const DashboardContent = ({ tenantType }) => {
  const items = [
    {
      key: 'summary',
      label: 'Cost Summary',
      children: <CostSummary tenantType={tenantType} />,
    },
    {
      key: 'aws',
      label: 'AWS Costs',
      children: <AWSCosts tenantType={tenantType} />,
    },
    {
      key: 'dbx',
      label: 'DBx Costs',
      children: <DBxCosts tenantType={tenantType} />,
    },
  ];

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <h2>Cost Dashboard</h2>
      </div>

      <Tabs
        defaultActiveKey="summary"
        items={items}
        className="dashboard-tabs"
      />
    </div>
  );
};

export default DashboardContent;
