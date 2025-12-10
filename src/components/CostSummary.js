import React from 'react';
import { Card, Row, Col } from 'antd';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './CostSummary.css';

// AWS Cost Data (from AWSCosts.js)
const awsCostData = [
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

// DBx Cost Data (from DBxCosts.js)
const dbxMonthlyData = [
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

const dbxServiceTypeData = [
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

const CostSummary = () => {
  // Calculate AWS totals
  const awsTotalCost = awsCostData.reduce((sum, monthData) => {
    const monthTotal = Object.keys(monthData)
      .filter(key => key !== 'month')
      .reduce((monthSum, key) => monthSum + monthData[key], 0);
    return sum + monthTotal;
  }, 0);

  const awsAverageMonthlyCost = awsTotalCost / awsCostData.length;
  const awsServiceCount = 38; // From AWS dashboard KPI

  // Calculate DBx totals
  const dbxTotalCost = dbxMonthlyData.reduce((sum, month) => sum + month.usage, 0);
  const dbxAverageMonthlyCost = dbxTotalCost / dbxMonthlyData.length;
  const dbxServiceCount = 15; // From DBx dashboard KPI

  // Calculate combined totals
  const combinedTotalCost = awsTotalCost + dbxTotalCost;
  const combinedAverageMonthlyCost = (awsAverageMonthlyCost + dbxAverageMonthlyCost);
  const combinedServiceCount = awsServiceCount + dbxServiceCount; // 38 + 15 = 53

  // Create combined monthly trend data
  // First, calculate AWS monthly totals
  const awsMonthlyTotals = awsCostData.map(monthData => {
    const total = Object.keys(monthData)
      .filter(key => key !== 'month')
      .reduce((sum, key) => sum + monthData[key], 0);
    return {
      month: monthData.month,
      awsCost: total
    };
  });

  // Create a map of DBx costs by month (normalize month format)
  const dbxCostMap = {};
  dbxMonthlyData.forEach(item => {
    // Convert "2025-04" to "Apr 2025" format for matching
    const [year, monthNum] = item.month.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthName = monthNames[parseInt(monthNum) - 1];
    const formattedMonth = `${monthName} ${year}`;
    dbxCostMap[formattedMonth] = item.usage;
  });

  // Combine AWS and DBx data
  const combinedTrendData = awsMonthlyTotals.map(awsMonth => {
    const dbxCost = dbxCostMap[awsMonth.month] || 0;
    return {
      month: awsMonth.month,
      totalCost: awsMonth.awsCost + dbxCost
    };
  });

  // Calculate average cost per service across all months
  // AWS services
  const awsServiceAverages = {};
  awsCostData.forEach(monthData => {
    Object.keys(monthData)
      .filter(key => key !== 'month')
      .forEach(service => {
        if (!awsServiceAverages[service]) {
          awsServiceAverages[service] = 0;
        }
        awsServiceAverages[service] += monthData[service];
      });
  });

  // Convert to average
  Object.keys(awsServiceAverages).forEach(service => {
    awsServiceAverages[service] = awsServiceAverages[service] / awsCostData.length;
  });

  // DBx services - calculate average from service type data
  const dbxServiceAverages = {};
  dbxServiceTypeData.forEach(service => {
    // Average is total usage divided by number of months
    dbxServiceAverages[service.serviceType] = service.usage / dbxMonthlyData.length;
  });

  // Combine all services for the donut chart
  const serviceBreakdownData = [
    ...Object.keys(awsServiceAverages).map(service => ({
      name: `AWS: ${service}`,
      value: awsServiceAverages[service]
    })),
    ...Object.keys(dbxServiceAverages)
      .filter(service => dbxServiceAverages[service] > 0) // Only include services with costs
      .map(service => ({
        name: `DBx: ${service}`,
        value: dbxServiceAverages[service]
      }))
  ].sort((a, b) => b.value - a.value); // Sort by value descending

  // Define colors for the service breakdown
  const serviceColors = [
    '#1890ff', '#ff4d4f', '#52c41a', '#faad14', '#722ed1',
    '#13c2c2', '#eb2f96', '#fa8c16', '#a0d911', '#2f54eb',
    '#7B68EE', '#C75B7A', '#5DADE2', '#9B59B6', '#E67E22',
    '#3498DB', '#922B21', '#16A085', '#7D6608', '#A0826D',
    '#E74C3C', '#27AE60', '#F39C12', '#8E44AD', '#34495E'
  ];

  return (
    <div className="cost-summary">
      {/* Combined Cost and usage overview */}
      <Card className="overview-card" title={
        <span>
          Combined Cost and usage overview <span className="info-link">Info</span>
        </span>
      }>
        <Row gutter={24}>
          <Col span={8}>
            <div className="metric-item">
              <div className="metric-label">Total cost</div>
              <div className="metric-value">${combinedTotalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
          </Col>
          <Col span={8}>
            <div className="metric-item">
              <div className="metric-label">Average monthly cost</div>
              <div className="metric-value">${combinedAverageMonthlyCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
          </Col>
          <Col span={8}>
            <div className="metric-item">
              <div className="metric-label">Service count</div>
              <div className="metric-value">{combinedServiceCount}</div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Total Cost Trend */}
      <Card className="trend-card" title="Total Cost Trend">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={combinedTrendData}>
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
              stroke="#52c41a"
              strokeWidth={3}
              dot={{ fill: '#52c41a', r: 5 }}
              activeDot={{ r: 7 }}
              name="Total Cost (AWS + DBx)"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Donut Charts Row */}
      <Row gutter={24}>
        <Col span={12}>
          <Card className="donut-card" title="Total Cost Breakdown by Platform">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'AWS', value: awsTotalCost },
                    { name: 'DBx', value: dbxTotalCost }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                >
                  <Cell fill="#1890ff" />
                  <Cell fill="#ff4d4f" />
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card className="donut-card" title="Average Monthly Cost Breakdown by Service">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={serviceBreakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ percent }) => percent > 0.05 ? `${(percent * 100).toFixed(1)}%` : ''}
                >
                  {serviceBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={serviceColors[index % serviceColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  wrapperStyle={{ fontSize: '12px', maxHeight: '300px', overflowY: 'auto' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CostSummary;

