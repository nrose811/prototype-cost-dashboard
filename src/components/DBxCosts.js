import React from 'react';
import { Card, Table, Row, Col } from 'antd';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './DBxCosts.css';

// Sample data for monthly usage - now broken down by service type
const monthlyData = [
  {
    month: '2024-12',
    ALL_PURPOSE: 800,
    MODEL_SERVING: 700,
    JOBS: 600,
    VECTOR_SEARCH: 400,
    SQL: 300,
    APPS: 250,
    INTERACTIVE: 200,
    NETWORKING: 150,
    PREDICTIVE_OPTIMIZATION: 150,
    STORAGE: 150,
    DLT: 100,
    ONLINE_TABLES: 80,
    AGENT_EVALUATION: 60,
    DEFAULT_STORAGE: 40,
    ALL_ANYWAY: 20
  },
  {
    month: '2025-01',
    ALL_PURPOSE: 750,
    MODEL_SERVING: 650,
    JOBS: 550,
    VECTOR_SEARCH: 350,
    SQL: 280,
    APPS: 230,
    INTERACTIVE: 180,
    NETWORKING: 140,
    PREDICTIVE_OPTIMIZATION: 140,
    STORAGE: 140,
    DLT: 90,
    ONLINE_TABLES: 70,
    AGENT_EVALUATION: 50,
    DEFAULT_STORAGE: 35,
    ALL_ANYWAY: 15
  },
  {
    month: '2025-02',
    ALL_PURPOSE: 820,
    MODEL_SERVING: 680,
    JOBS: 580,
    VECTOR_SEARCH: 380,
    SQL: 290,
    APPS: 240,
    INTERACTIVE: 190,
    NETWORKING: 145,
    PREDICTIVE_OPTIMIZATION: 145,
    STORAGE: 145,
    DLT: 95,
    ONLINE_TABLES: 75,
    AGENT_EVALUATION: 55,
    DEFAULT_STORAGE: 38,
    ALL_ANYWAY: 17
  },
  {
    month: '2025-03',
    ALL_PURPOSE: 50,
    MODEL_SERVING: 40,
    JOBS: 30,
    VECTOR_SEARCH: 20,
    SQL: 15,
    APPS: 12,
    INTERACTIVE: 10,
    NETWORKING: 8,
    PREDICTIVE_OPTIMIZATION: 5,
    STORAGE: 5,
    DLT: 3,
    ONLINE_TABLES: 1,
    AGENT_EVALUATION: 0.5,
    DEFAULT_STORAGE: 0.3,
    ALL_ANYWAY: 0.2
  },
  {
    month: '2025-04',
    ALL_PURPOSE: 1300,
    MODEL_SERVING: 1100,
    JOBS: 900,
    VECTOR_SEARCH: 600,
    SQL: 450,
    APPS: 380,
    INTERACTIVE: 300,
    NETWORKING: 230,
    PREDICTIVE_OPTIMIZATION: 230,
    STORAGE: 230,
    DLT: 150,
    ONLINE_TABLES: 120,
    AGENT_EVALUATION: 90,
    DEFAULT_STORAGE: 60,
    ALL_ANYWAY: 30
  },
  {
    month: '2025-05',
    ALL_PURPOSE: 1100,
    MODEL_SERVING: 900,
    JOBS: 750,
    VECTOR_SEARCH: 500,
    SQL: 380,
    APPS: 320,
    INTERACTIVE: 250,
    NETWORKING: 190,
    PREDICTIVE_OPTIMIZATION: 190,
    STORAGE: 190,
    DLT: 125,
    ONLINE_TABLES: 100,
    AGENT_EVALUATION: 75,
    DEFAULT_STORAGE: 50,
    ALL_ANYWAY: 25
  },
  {
    month: '2025-06',
    ALL_PURPOSE: 1000,
    MODEL_SERVING: 800,
    JOBS: 680,
    VECTOR_SEARCH: 450,
    SQL: 340,
    APPS: 290,
    INTERACTIVE: 230,
    NETWORKING: 175,
    PREDICTIVE_OPTIMIZATION: 175,
    STORAGE: 175,
    DLT: 115,
    ONLINE_TABLES: 90,
    AGENT_EVALUATION: 68,
    DEFAULT_STORAGE: 45,
    ALL_ANYWAY: 22
  },
  {
    month: '2025-07',
    ALL_PURPOSE: 2600,
    MODEL_SERVING: 2200,
    JOBS: 1800,
    VECTOR_SEARCH: 1200,
    SQL: 900,
    APPS: 760,
    INTERACTIVE: 600,
    NETWORKING: 460,
    PREDICTIVE_OPTIMIZATION: 460,
    STORAGE: 460,
    DLT: 300,
    ONLINE_TABLES: 240,
    AGENT_EVALUATION: 180,
    DEFAULT_STORAGE: 120,
    ALL_ANYWAY: 60
  },
  {
    month: '2025-08',
    ALL_PURPOSE: 6700,
    MODEL_SERVING: 5700,
    JOBS: 4700,
    VECTOR_SEARCH: 3100,
    SQL: 2350,
    APPS: 1980,
    INTERACTIVE: 1560,
    NETWORKING: 1190,
    PREDICTIVE_OPTIMIZATION: 1190,
    STORAGE: 1190,
    DLT: 775,
    ONLINE_TABLES: 620,
    AGENT_EVALUATION: 465,
    DEFAULT_STORAGE: 310,
    ALL_ANYWAY: 155
  },
  {
    month: '2025-09',
    ALL_PURPOSE: 3900,
    MODEL_SERVING: 3300,
    JOBS: 2700,
    VECTOR_SEARCH: 1800,
    SQL: 1350,
    APPS: 1140,
    INTERACTIVE: 900,
    NETWORKING: 690,
    PREDICTIVE_OPTIMIZATION: 690,
    STORAGE: 690,
    DLT: 450,
    ONLINE_TABLES: 360,
    AGENT_EVALUATION: 270,
    DEFAULT_STORAGE: 180,
    ALL_ANYWAY: 90
  },
  {
    month: '2025-10',
    ALL_PURPOSE: 7350,
    MODEL_SERVING: 6250,
    JOBS: 5150,
    VECTOR_SEARCH: 3400,
    SQL: 2550,
    APPS: 2160,
    INTERACTIVE: 1700,
    NETWORKING: 1300,
    PREDICTIVE_OPTIMIZATION: 1300,
    STORAGE: 1300,
    DLT: 850,
    ONLINE_TABLES: 680,
    AGENT_EVALUATION: 510,
    DEFAULT_STORAGE: 340,
    ALL_ANYWAY: 170
  },
  {
    month: '2025-11',
    ALL_PURPOSE: 8000,
    MODEL_SERVING: 6800,
    JOBS: 5600,
    VECTOR_SEARCH: 3700,
    SQL: 2775,
    APPS: 2350,
    INTERACTIVE: 1850,
    NETWORKING: 1415,
    PREDICTIVE_OPTIMIZATION: 1415,
    STORAGE: 1415,
    DLT: 925,
    ONLINE_TABLES: 740,
    AGENT_EVALUATION: 555,
    DEFAULT_STORAGE: 370,
    ALL_ANYWAY: 185
  },
  {
    month: '2025-12',
    ALL_PURPOSE: 8200,
    MODEL_SERVING: 7000,
    JOBS: 5800,
    VECTOR_SEARCH: 3850,
    SQL: 2900,
    APPS: 2450,
    INTERACTIVE: 1930,
    NETWORKING: 1475,
    PREDICTIVE_OPTIMIZATION: 1475,
    STORAGE: 1475,
    DLT: 965,
    ONLINE_TABLES: 770,
    AGENT_EVALUATION: 580,
    DEFAULT_STORAGE: 385,
    ALL_ANYWAY: 195
  }
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
  // Calculate summary metrics
  const totalCost = monthlyData.reduce((sum, month) => {
    const monthTotal = Object.keys(month)
      .filter(key => key !== 'month')
      .reduce((monthSum, key) => monthSum + month[key], 0);
    return sum + monthTotal;
  }, 0);
  const averageMonthlyCost = totalCost / monthlyData.length;
  const serviceCount = serviceTypeData.length;

  // Calculate aggregated costs for trend chart
  const trendData = monthlyData.map(monthData => {
    const total = Object.keys(monthData)
      .filter(key => key !== 'month')
      .reduce((sum, key) => sum + monthData[key], 0);
    return {
      month: monthData.month,
      totalCost: total
    };
  });

  return (
    <div className="dbx-costs">
      {/* Cost and usage overview */}
      <Card className="overview-card" title={
        <span>
          Cost and usage overview <span className="info-link">Info</span>
        </span>
      }>
        <Row gutter={24}>
          <Col span={8}>
            <div className="metric-item">
              <div className="metric-label">Total cost</div>
              <div className="metric-value">${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
          </Col>
          <Col span={8}>
            <div className="metric-item">
              <div className="metric-label">Average monthly cost</div>
              <div className="metric-value">${averageMonthlyCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
          </Col>
          <Col span={8}>
            <div className="metric-item">
              <div className="metric-label">Service count</div>
              <div className="metric-value">{serviceCount}</div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Usage Cost by month */}
      <Card className="dbx-card" title="Usage Cost by month for the last 12 months">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" />
            <YAxis label={{ value: 'Usage (in USD)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="ALL_PURPOSE" stackId="a" fill="#7B68EE" />
            <Bar dataKey="MODEL_SERVING" stackId="a" fill="#C75B7A" />
            <Bar dataKey="JOBS" stackId="a" fill="#5DADE2" />
            <Bar dataKey="VECTOR_SEARCH" stackId="a" fill="#9B59B6" />
            <Bar dataKey="SQL" stackId="a" fill="#E67E22" />
            <Bar dataKey="APPS" stackId="a" fill="#3498DB" />
            <Bar dataKey="INTERACTIVE" stackId="a" fill="#922B21" />
            <Bar dataKey="NETWORKING" stackId="a" fill="#16A085" />
            <Bar dataKey="PREDICTIVE_OPTIMIZATION" stackId="a" fill="#7D6608" />
            <Bar dataKey="STORAGE" stackId="a" fill="#A0826D" />
            <Bar dataKey="DLT" stackId="a" fill="#E74C3C" />
            <Bar dataKey="ONLINE_TABLES" stackId="a" fill="#27AE60" />
            <Bar dataKey="AGENT_EVALUATION" stackId="a" fill="#F39C12" />
            <Bar dataKey="DEFAULT_STORAGE" stackId="a" fill="#8E44AD" />
            <Bar dataKey="ALL_ANYWAY" stackId="a" fill="#34495E" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Cost Trends */}
      <Card className="dbx-card" title="Cost Trends">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" />
            <YAxis label={{ value: 'Total Cost ($)', angle: -90, position: 'insideLeft' }} />
            <Tooltip
              formatter={(value) => `$${value.toLocaleString()}`}
              labelStyle={{ color: '#262626' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="totalCost"
              stroke="#ff4d4f"
              strokeWidth={2}
              dot={{ fill: '#ff4d4f', r: 4 }}
              activeDot={{ r: 6 }}
              name="Total Cost"
            />
          </LineChart>
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

