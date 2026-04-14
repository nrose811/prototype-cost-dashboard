import React, { useState, useMemo } from 'react';
import { Card, Row, Col, Alert } from 'antd';

import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import CustomerSelector from './CustomerSelector';
import OrgSlugSelector from './OrgSlugSelector';
import DateRangePicker from './DateRangePicker';
import TDPCostsTable from './TDPCostsTable';
import {
  stCustomers, mtCustomers,
  getDataForCustomer, isMonthInRange, normalizeMonth, formatMonth,
  MT_AWS_SERVICES, MT_DBX_SERVICES,
  AWS_SERVICE_TYPES, DBX_SERVICE_TYPES,
  AWS_SERVICE_COLORS, DBX_SERVICE_COLORS,
  DEFAULT_START_MONTH, DEFAULT_END_MONTH,
} from './mockData';
import './ConsolidatedCostView.css';

const PLATFORM_COLORS = {
  AWS: '#1890ff',
  Databricks: '#ff4d4f',
  Snowflake: '#00bcd4',
};

const ConsolidatedCostView = ({ tenantType }) => {
  const customers = tenantType === 'ST' ? stCustomers : mtCustomers;
  const defaultCustomer = customers[0].id;
  const [selectedCustomer, setSelectedCustomer] = useState(defaultCustomer);
  const [selectedOrgSlug, setSelectedOrgSlug] = useState(customers[0].orgSlugs[0]);
  const [dateRange, setDateRange] = useState([DEFAULT_START_MONTH, DEFAULT_END_MONTH]);

  const handleCustomerChange = (customerId) => {
    setSelectedCustomer(customerId);
    const customer = customers.find(c => c.id === customerId);
    setSelectedOrgSlug(customer?.orgSlugs[0] || '');
  };

  // Get raw data for selected customer
  const rawData = useMemo(() => getDataForCustomer(selectedCustomer), [selectedCustomer]);

  // Filter and compute derived data
  const computedData = useMemo(() => {
    if (!rawData) return null;
    const [startMonth, endMonth] = dateRange;

    // Filter AWS data by date range
    const awsFiltered = rawData.aws.filter(row => isMonthInRange(row.month, startMonth, endMonth));
    const awsServices = tenantType === 'ST' ? AWS_SERVICE_TYPES : MT_AWS_SERVICES;

    // Calculate AWS monthly totals (filtered by services)
    const awsMonthly = awsFiltered.map(row => {
      const total = awsServices.reduce((sum, svc) => sum + (row[svc] || 0), 0);
      return { month: row.month, displayMonth: row.month, total };
    });
    const awsTotalCost = awsMonthly.reduce((sum, m) => sum + m.total, 0);

    // Filter DBx data by date range
    const dbxFiltered = rawData.dbx.filter(row => isMonthInRange(row.month, startMonth, endMonth));
    const dbxServices = tenantType === 'ST' ? DBX_SERVICE_TYPES : MT_DBX_SERVICES;

    // Calculate DBx monthly totals (filtered by services)
    const dbxMonthly = dbxFiltered.map(row => {
      const total = dbxServices.reduce((sum, svc) => sum + (row[svc] || 0), 0);
      return { month: row.month, displayMonth: formatMonth(row.month), total };
    });
    const dbxTotalCost = dbxMonthly.reduce((sum, m) => sum + m.total, 0);

    // Filter Snowflake data
    const snowflakeFiltered = rawData.snowflake.filter(row => isMonthInRange(row.month, startMonth, endMonth));
    const snowflakeTotalCost = snowflakeFiltered.reduce((sum, row) => sum + row.cost, 0);
    const hasSnowflake = tenantType === 'ST' && snowflakeTotalCost > 0;

    // Combined monthly trend (aligned by normalized month)
    const monthMap = {};
    awsMonthly.forEach(m => {
      const key = normalizeMonth(m.month);
      monthMap[key] = { month: m.displayMonth, aws: m.total, dbx: 0, snowflake: 0 };
    });
    dbxMonthly.forEach(m => {
      const key = normalizeMonth(m.month);
      if (!monthMap[key]) monthMap[key] = { month: m.displayMonth, aws: 0, dbx: 0, snowflake: 0 };
      monthMap[key].dbx = m.total;
    });
    if (hasSnowflake) {
      snowflakeFiltered.forEach(m => {
        const key = normalizeMonth(m.month);
        if (!monthMap[key]) monthMap[key] = { month: formatMonth(key), aws: 0, dbx: 0, snowflake: 0 };
        monthMap[key].snowflake = m.cost;
      });
    }
    const trendData = Object.keys(monthMap).sort().map(key => monthMap[key]);

    // Platform breakdown for donut
    const platformBreakdown = [
      { name: 'AWS', value: awsTotalCost },
      { name: 'Databricks', value: dbxTotalCost },
    ];
    if (hasSnowflake) {
      platformBreakdown.push({ name: 'Snowflake', value: snowflakeTotalCost });
    }

    // Service breakdown for donut (top services by average monthly cost)
    const monthCount = trendData.length || 1;
    const serviceBreakdown = [];

    // AWS services
    const awsServiceTotals = {};
    awsFiltered.forEach(row => {
      awsServices.forEach(svc => {
        awsServiceTotals[svc] = (awsServiceTotals[svc] || 0) + (row[svc] || 0);
      });
    });
    Object.entries(awsServiceTotals).forEach(([svc, total]) => {
      serviceBreakdown.push({ name: `AWS: ${svc}`, value: total / monthCount, color: AWS_SERVICE_COLORS[svc] || '#999' });
    });

    // DBx services
    const dbxServiceTotals = {};
    dbxFiltered.forEach(row => {
      dbxServices.forEach(svc => {
        dbxServiceTotals[svc] = (dbxServiceTotals[svc] || 0) + (row[svc] || 0);
      });
    });
    Object.entries(dbxServiceTotals).forEach(([svc, total]) => {
      serviceBreakdown.push({ name: `DBx: ${svc}`, value: total / monthCount, color: DBX_SERVICE_COLORS[svc] || '#999' });
    });

    if (hasSnowflake) {
      serviceBreakdown.push({ name: 'Snowflake', value: snowflakeTotalCost / monthCount, color: PLATFORM_COLORS.Snowflake });
    }

    serviceBreakdown.sort((a, b) => b.value - a.value);

    const totalCost = awsTotalCost + dbxTotalCost + snowflakeTotalCost;
    const avgMonthlyCost = totalCost / monthCount;
    let platformCount = 2; // AWS + DBx always
    if (hasSnowflake) platformCount = 3;

    return {
      awsFiltered, dbxFiltered,
      awsServices, dbxServices,
      awsTotalCost, dbxTotalCost, snowflakeTotalCost,
      hasSnowflake, totalCost, avgMonthlyCost, platformCount,
      trendData, platformBreakdown, serviceBreakdown, monthCount,
    };
  }, [rawData, dateRange, tenantType]);

  if (!computedData) return null;

  const {
    awsFiltered, dbxFiltered,
    awsServices, dbxServices,
    hasSnowflake, totalCost, avgMonthlyCost, platformCount,
    trendData, platformBreakdown, serviceBreakdown,
  } = computedData;

  const fmtCost = (val) => `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="consolidated-layout">
      {/* Left Filter Panel (Superset-style) */}
      <div className="filter-panel">
        <div className="filter-panel-title">Filters</div>
        <CustomerSelector
          tenantType={tenantType}
          selectedCustomer={selectedCustomer}
          onCustomerChange={handleCustomerChange}
        />
        <OrgSlugSelector
          tenantType={tenantType}
          selectedCustomer={selectedCustomer}
          selectedOrgSlug={selectedOrgSlug}
          onOrgSlugChange={setSelectedOrgSlug}
        />
        <DateRangePicker
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      </div>

      {/* Main Content Area */}
      <div className="content-area">
        {/* ST Data Source Callout */}
        {tenantType === 'ST' && (
          <Alert
            message="Single-Tenant Cost Data"
            description="For THST customers, platform usage costs are obtained from AWS Cost Explorer using amortized costs for the relevant linked account(s). Databricks costs are retrieved from Phone Home Telemetry (PHT). All services and platform fees are included — covering compute, storage, data apps, connectors, streaming, EC2, Databricks, and Snowflake where applicable."
            type="info"
            showIcon
            style={{ marginBottom: 24 }}
          />
        )}

        {/* MT Data Source Callout */}
        {tenantType === 'MT' && (
          <Alert
            message="Multi-Tenant Cost Data"
            description="For THMT customers, compute and data storage costs are obtained from Phone Home Telemetry (PHT), not AWS Cost Explorer. Only data processing pass-through fees are shown — this includes ECS processing (Compute), S3 and Athena (Storage), and Athena data access. Platform fees such as ECS Data Apps, Connectors, Streaming, EC2, Databricks, and Snowflake are excluded as they are not billed to multi-tenant customers."
            type="info"
            showIcon
            style={{ marginBottom: 24 }}
          />
        )}

        {/* KPI Overview */}
        <Card className="overview-card" title={
          <span>Cost Overview <span className="info-link">Info</span></span>
        }>
          <Row gutter={24}>
            <Col span={8}>
              <div className="metric-item">
                <div className="metric-label">Total cost</div>
                <div className="metric-value">{fmtCost(totalCost)}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="metric-item">
                <div className="metric-label">Average monthly cost</div>
                <div className="metric-value">{fmtCost(avgMonthlyCost)}</div>
              </div>
            </Col>
            <Col span={8}>
              <div className="metric-item">
                <div className="metric-label">Platforms</div>
                <div className="metric-value">{platformCount}</div>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Cost Trend (multi-line) */}
        <Card className="section-card" title="Cost Trend by Platform">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis label={{ value: 'Cost ($)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => fmtCost(value)} labelStyle={{ color: '#262626' }} />
              <Legend />
              <Line type="monotone" dataKey="aws" stroke={PLATFORM_COLORS.AWS} strokeWidth={2} dot={{ r: 4 }} name="AWS" />
              <Line type="monotone" dataKey="dbx" stroke={PLATFORM_COLORS.Databricks} strokeWidth={2} dot={{ r: 4 }} name="Databricks" />
              {hasSnowflake && (
                <Line type="monotone" dataKey="snowflake" stroke={PLATFORM_COLORS.Snowflake} strokeWidth={2} dot={{ r: 4 }} name="Snowflake" />
              )}
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Donut Charts */}
        <Row gutter={24}>
          <Col span={12}>
            <Card className="section-card" title="Cost Breakdown by Platform">
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={platformBreakdown}
                    cx="50%" cy="50%"
                    innerRadius={80} outerRadius={120}
                    paddingAngle={5} dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {platformBreakdown.map((entry) => (
                      <Cell key={entry.name} fill={PLATFORM_COLORS[entry.name] || '#999'} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => fmtCost(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col span={12}>
            <Card className="section-card" title="Avg Monthly Cost by Service">
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={serviceBreakdown}
                    cx="50%" cy="50%"
                    innerRadius={80} outerRadius={120}
                    paddingAngle={2} dataKey="value"
                    label={({ percent }) => percent > 0.05 ? `${(percent * 100).toFixed(1)}%` : ''}
                  >
                    {serviceBreakdown.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => fmtCost(value)} />
                  <Legend layout="vertical" align="right" verticalAlign="middle"
                    wrapperStyle={{ fontSize: '12px', maxHeight: '300px', overflowY: 'auto' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>

        {/* AWS Detail */}
        <Card className="section-card" title="AWS Cost Breakdown">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={awsFiltered}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis label={{ value: 'Costs ($)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => fmtCost(value)} />
              <Legend />
              {awsServices.map(svc => (
                <Bar key={svc} dataKey={svc} stackId="a" fill={AWS_SERVICE_COLORS[svc] || '#999'} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* DBx Detail */}
        <Card className="section-card" title="Databricks Cost Breakdown">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={dbxFiltered}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" interval={0} tick={{ fontSize: 11 }} />
              <YAxis label={{ value: 'Usage ($)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => fmtCost(value)} />
              <Legend />
              {dbxServices.map(svc => (
                <Bar key={svc} dataKey={svc} stackId="a" fill={DBX_SERVICE_COLORS[svc] || '#999'} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* TDP Costs Table */}
        <TDPCostsTable
          tenantType={tenantType}
          customerId={selectedCustomer}
          dateRange={dateRange}
        />

      </div>
    </div>
  );
};

export default ConsolidatedCostView;
