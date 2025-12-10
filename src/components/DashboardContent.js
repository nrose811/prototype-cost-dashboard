import React from 'react';
import { Tabs } from 'antd';
import AWSCosts from './AWSCosts';
import DBxCosts from './DBxCosts';
import CostSummary from './CostSummary';
import './DashboardContent.css';

const DashboardContent = () => {
  const items = [
    {
      key: 'summary',
      label: 'Cost Summary',
      children: <CostSummary />,
    },
    {
      key: 'aws',
      label: 'AWS Costs',
      children: <AWSCosts />,
    },
    {
      key: 'dbx',
      label: 'DBx Costs',
      children: <DBxCosts />,
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
