import React from 'react';
import { Card, Table } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './DBxCosts.css';

// Sample data for monthly usage
const monthlyData = [
  { month: '2024-12', usage: 4000 },
  { month: '2025-01', usage: 3500 },
  { month: '2025-02', usage: 3800 },
  { month: '2025-03', usage: 200 },
  { month: '2025-04', usage: 6000 },
  { month: '2025-05', usage: 5000 },
  { month: '2025-06', usage: 4500 },
  { month: '2025-07', usage: 12000 },
  { month: '2025-08', usage: 31000 },
  { month: '2025-09', usage: 18000 },
  { month: '2025-10', usage: 34000 },
  { month: '2025-11', usage: 37000 },
  { month: '2025-12', usage: 38000 }
];

// Sample data for service type usage
const serviceTypeData = [
  { serviceType: 'ALL_PURPOSE', usage: 58000 },
  { serviceType: 'MODEL_SERVING', usage: 48000 },
  { serviceType: 'JOBS', usage: 40000 },
  { serviceType: 'VECTOR_SEARCH', usage: 18000 },
  { serviceType: 'SQL', usage: 12000 },
  { serviceType: 'APPS', usage: 8000 },
  { serviceType: 'INTERACTIVE', usage: 5000 },
  { serviceType: 'NETWORKING', usage: 3000 },
  { serviceType: 'PREDICTIVE_OPTIMIZATION', usage: 2000 },
  { serviceType: 'STORAGE', usage: 1500 },
  { serviceType: 'DLT', usage: 1000 },
  { serviceType: 'ONLINE_TABLES', usage: 800 },
  { serviceType: 'AGENT_EVALUATION', usage: 500 },
  { serviceType: 'DEFAULT_STORAGE', usage: 300 },
  { serviceType: 'ALL_ANYWAY', usage: 200 }
];

// Sample data for detailed table - pivoted by month
const detailedData = [
  {
    key: '1',
    month: '2025-12',
    ALL_PURPOSE: 447.45,
    MODEL_SERVING: 408.39,
    JOBS: 231.21,
    VECTOR_SEARCH: 120.96,
    SQL: 19.67,
    APPS: 18.00,
    PREDICTIVE_OPTIMIZATION: 2.00,
    INTERACTIVE: 1.28,
    NETWORKING: 0,
    STORAGE: 0,
    DLT: 0,
    ONLINE_TABLES: 0,
    AGENT_EVALUATION: 0,
    DEFAULT_STORAGE: 0,
    ALL_ANYWAY: 0
  },
  {
    key: '2',
    month: '2025-11',
    ALL_PURPOSE: 425.30,
    MODEL_SERVING: 390.15,
    JOBS: 220.50,
    VECTOR_SEARCH: 115.80,
    SQL: 18.90,
    APPS: 17.25,
    PREDICTIVE_OPTIMIZATION: 1.95,
    INTERACTIVE: 1.20,
    NETWORKING: 0,
    STORAGE: 0,
    DLT: 0,
    ONLINE_TABLES: 0,
    AGENT_EVALUATION: 0,
    DEFAULT_STORAGE: 0,
    ALL_ANYWAY: 0
  },
  {
    key: '3',
    month: '2025-10',
    ALL_PURPOSE: 410.20,
    MODEL_SERVING: 375.80,
    JOBS: 210.30,
    VECTOR_SEARCH: 110.50,
    SQL: 18.20,
    APPS: 16.50,
    PREDICTIVE_OPTIMIZATION: 1.85,
    INTERACTIVE: 1.15,
    NETWORKING: 0,
    STORAGE: 0,
    DLT: 0,
    ONLINE_TABLES: 0,
    AGENT_EVALUATION: 0,
    DEFAULT_STORAGE: 0,
    ALL_ANYWAY: 0
  },
  {
    key: '4',
    month: '2025-09',
    ALL_PURPOSE: 380.50,
    MODEL_SERVING: 350.25,
    JOBS: 195.40,
    VECTOR_SEARCH: 102.30,
    SQL: 17.50,
    APPS: 15.80,
    PREDICTIVE_OPTIMIZATION: 1.75,
    INTERACTIVE: 1.10,
    NETWORKING: 0,
    STORAGE: 0,
    DLT: 0,
    ONLINE_TABLES: 0,
    AGENT_EVALUATION: 0,
    DEFAULT_STORAGE: 0,
    ALL_ANYWAY: 0
  },
  {
    key: '5',
    month: '2025-08',
    ALL_PURPOSE: 365.80,
    MODEL_SERVING: 335.60,
    JOBS: 185.20,
    VECTOR_SEARCH: 98.40,
    SQL: 16.80,
    APPS: 15.20,
    PREDICTIVE_OPTIMIZATION: 1.65,
    INTERACTIVE: 1.05,
    NETWORKING: 0,
    STORAGE: 0,
    DLT: 0,
    ONLINE_TABLES: 0,
    AGENT_EVALUATION: 0,
    DEFAULT_STORAGE: 0,
    ALL_ANYWAY: 0
  }
];

// Add total costs to each row
const detailedDataWithTotals = detailedData.map(row => {
  const total = Object.keys(row)
    .filter(key => key !== 'month' && key !== 'key')
    .reduce((sum, key) => sum + (row[key] || 0), 0);

  return {
    ...row,
    TOTAL_COSTS: total
  };
});

const serviceTypes = [
  'ALL_PURPOSE',
  'MODEL_SERVING',
  'JOBS',
  'VECTOR_SEARCH',
  'SQL',
  'APPS',
  'PREDICTIVE_OPTIMIZATION',
  'INTERACTIVE',
  'NETWORKING',
  'STORAGE',
  'DLT',
  'ONLINE_TABLES',
  'AGENT_EVALUATION',
  'DEFAULT_STORAGE',
  'ALL_ANYWAY'
];

const columns = [
  {
    title: 'Month',
    dataIndex: 'month',
    key: 'month',
    fixed: 'left',
    width: 120,
    sorter: (a, b) => a.month.localeCompare(b.month),
  },
  ...serviceTypes.map(serviceType => ({
    title: serviceType,
    dataIndex: serviceType,
    key: serviceType,
    width: 150,
    render: (cost) => cost ? `$${cost.toFixed(2)}` : '$0.00',
    sorter: (a, b) => (a[serviceType] || 0) - (b[serviceType] || 0),
  })),
  {
    title: 'Total Costs',
    dataIndex: 'TOTAL_COSTS',
    key: 'TOTAL_COSTS',
    fixed: 'right',
    width: 120,
    render: (cost) => `$${cost.toFixed(2)}`,
    sorter: (a, b) => a.TOTAL_COSTS - b.TOTAL_COSTS,
  }
];

const DBxCosts = () => {
  return (
    <div className="dbx-costs">
      {/* Usage Cost by month */}
      <Card className="dbx-card" title="Usage Cost by month for the last 12 months">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              label={{ value: 'Month', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              label={{ value: 'Usage (in USD)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Bar dataKey="usage" fill="#ff4d4f" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Usage Cost by Service type */}
      <Card className="dbx-card" title="Usage Cost by Service type">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={serviceTypeData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              type="number"
              label={{ value: 'Usage (in USD)', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              type="category"
              dataKey="serviceType"
              width={150}
              label={{ value: 'Service Type', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Bar dataKey="usage" fill="#1890ff" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Usage Cost by month and service type */}
      <Card className="dbx-card" title="Usage Cost by month and service type">
        <Table
          columns={columns}
          dataSource={detailedDataWithTotals}
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
            position: ['bottomCenter']
          }}
          scroll={{ x: 'max-content' }}
        />
      </Card>
    </div>
  );
};

export default DBxCosts;

