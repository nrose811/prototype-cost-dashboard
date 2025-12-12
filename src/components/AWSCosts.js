import React from 'react';
import { Card, Row, Col, Table } from 'antd';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './AWSCosts.css';

// Sample data matching the screenshot
const costData = [
  {
    month: 'Apr 2025',
    Glue: 3500,
    'Elastic Container Service': 2000,
    'Relational Database Service': 2500,
    'OpenSearch Service': 3000,
    CloudWatch: 1500,
    S3: 1200,
    'EC2-Instances': 1800,
    Kinesis: 800,
    VPC: 500,
    Others: 1000
  },
  {
    month: 'May 2025',
    Glue: 4000,
    'Elastic Container Service': 2200,
    'Relational Database Service': 2800,
    'OpenSearch Service': 3200,
    CloudWatch: 1600,
    S3: 1300,
    'EC2-Instances': 2000,
    Kinesis: 900,
    VPC: 600,
    Others: 1100
  },
  {
    month: 'Jun 2025',
    Glue: 3800,
    'Elastic Container Service': 2100,
    'Relational Database Service': 2600,
    'OpenSearch Service': 3100,
    CloudWatch: 1550,
    S3: 1250,
    'EC2-Instances': 1900,
    Kinesis: 850,
    VPC: 550,
    Others: 1050
  },
  {
    month: 'Jul 2025',
    Glue: 4500,
    'Elastic Container Service': 2400,
    'Relational Database Service': 3000,
    'OpenSearch Service': 3500,
    CloudWatch: 1700,
    S3: 1400,
    'EC2-Instances': 2200,
    Kinesis: 1000,
    VPC: 700,
    Others: 1200
  },
  {
    month: 'Aug 2025',
    Glue: 5000,
    'Elastic Container Service': 2600,
    'Relational Database Service': 3300,
    'OpenSearch Service': 3800,
    CloudWatch: 1800,
    S3: 1500,
    'EC2-Instances': 2400,
    Kinesis: 1100,
    VPC: 800,
    Others: 1300
  },
  {
    month: 'Sep 2025',
    Glue: 5500,
    'Elastic Container Service': 2800,
    'Relational Database Service': 3500,
    'OpenSearch Service': 4000,
    CloudWatch: 1900,
    S3: 1600,
    'EC2-Instances': 2600,
    Kinesis: 1200,
    VPC: 900,
    Others: 1400
  }
];

// Prepare table data with totals
const tableDataWithTotals = costData.map((row, index) => {
  const total = Object.keys(row)
    .filter(key => key !== 'month')
    .reduce((sum, key) => sum + (row[key] || 0), 0);

  return {
    key: index.toString(),
    ...row,
    TOTAL_COSTS: total
  };
});

// Define service types for columns
const awsServiceTypes = [
  'Glue',
  'Elastic Container Service',
  'Relational Database Service',
  'OpenSearch Service',
  'CloudWatch',
  'S3',
  'EC2-Instances',
  'Kinesis',
  'VPC',
  'Others'
];

// Define table columns
const awsTableColumns = [
  {
    title: 'Month',
    dataIndex: 'month',
    key: 'month',
    fixed: 'left',
    width: 120,
    sorter: (a, b) => a.month.localeCompare(b.month),
  },
  ...awsServiceTypes.map(serviceType => ({
    title: serviceType,
    dataIndex: serviceType,
    key: serviceType,
    width: 180,
    render: (cost) => cost ? `$${cost.toLocaleString()}` : '$0',
    sorter: (a, b) => (a[serviceType] || 0) - (b[serviceType] || 0),
  })),
  {
    title: 'Total Costs',
    dataIndex: 'TOTAL_COSTS',
    key: 'TOTAL_COSTS',
    fixed: 'right',
    width: 120,
    render: (cost) => `$${cost.toLocaleString()}`,
    sorter: (a, b) => a.TOTAL_COSTS - b.TOTAL_COSTS,
  }
];

const AWSCosts = ({ tenantType = 'ST' }) => {
  // For MT, only show ECS (Compute) and S3 (Storage)
  const mtAwsServices = ['Elastic Container Service', 'S3'];

  // Filter data based on tenant type
  const filteredCostData = costData.map(monthData => {
    if (tenantType === 'MT') {
      const filtered = { month: monthData.month };
      mtAwsServices.forEach(service => {
        if (monthData[service] !== undefined) {
          filtered[service] = monthData[service];
        }
      });
      return filtered;
    }
    return monthData;
  });

  // Calculate aggregated costs for trend chart
  const trendData = filteredCostData.map(monthData => {
    const total = Object.keys(monthData)
      .filter(key => key !== 'month')
      .reduce((sum, key) => sum + monthData[key], 0);

    return {
      month: monthData.month,
      totalCost: total
    };
  });

  return (
    <div className="aws-costs">
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
              <div className="metric-value">$131,618.90</div>
            </div>
          </Col>
          <Col span={8}>
            <div className="metric-item">
              <div className="metric-label">Average monthly cost</div>
              <div className="metric-value">$21,936.48</div>
            </div>
          </Col>
          <Col span={8}>
            <div className="metric-item">
              <div className="metric-label">Service count</div>
              <div className="metric-value">38</div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Cost and usage graph */}
      <Card className="graph-card" title="Cost and usage graph">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={filteredCostData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" />
            <YAxis label={{ value: 'Costs ($)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            {tenantType === 'ST' && <Bar dataKey="Glue" stackId="a" fill="#7B68EE" />}
            <Bar dataKey="Elastic Container Service" stackId="a" fill="#C75B7A" />
            {tenantType === 'ST' && <Bar dataKey="Relational Database Service" stackId="a" fill="#5DADE2" />}
            {tenantType === 'ST' && <Bar dataKey="OpenSearch Service" stackId="a" fill="#9B59B6" />}
            {tenantType === 'ST' && <Bar dataKey="CloudWatch" stackId="a" fill="#E67E22" />}
            <Bar dataKey="S3" stackId="a" fill="#3498DB" />
            {tenantType === 'ST' && <Bar dataKey="EC2-Instances" stackId="a" fill="#922B21" />}
            {tenantType === 'ST' && <Bar dataKey="Kinesis" stackId="a" fill="#16A085" />}
            {tenantType === 'ST' && <Bar dataKey="VPC" stackId="a" fill="#7D6608" />}
            {tenantType === 'ST' && <Bar dataKey="Others" stackId="a" fill="#A0826D" />}
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Cost Trends */}
      <Card className="graph-card" title="Cost Trends">
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
              stroke="#1890ff"
              strokeWidth={2}
              dot={{ fill: '#1890ff', r: 4 }}
              activeDot={{ r: 6 }}
              name="Total Cost"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Cost by month and service type */}
      <Card className="graph-card" title="Cost by month and service type">
        <Table
          columns={awsTableColumns}
          dataSource={tableDataWithTotals}
          pagination={{
            pageSize: 6,
            showSizeChanger: false,
            position: ['bottomCenter']
          }}
          scroll={{ x: 'max-content' }}
        />
      </Card>
    </div>
  );
};

export default AWSCosts;

