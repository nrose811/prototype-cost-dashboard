import React from 'react';
import { Tabs } from 'antd';
import ConsolidatedCostView from './ConsolidatedCostView';
import './DashboardContent.css';

const DashboardContent = () => {
  const items = [
    {
      key: 'thst',
      label: 'THST',
      children: <ConsolidatedCostView tenantType="ST" />,
    },
    {
      key: 'thmt',
      label: 'THMT',
      children: <ConsolidatedCostView tenantType="MT" />,
    },
  ];

  return (
    <div className="dashboard-content">
      <Tabs
        defaultActiveKey="thst"
        items={items}
        className="dashboard-tabs"
      />
    </div>
  );
};

export default DashboardContent;
