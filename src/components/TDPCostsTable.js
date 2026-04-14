import React, { useMemo } from 'react';
import { Card, Table } from 'antd';
import { getDataForCustomer, isMonthInRange } from './mockData';
import './TDPCostsTable.css';

const TDPCostsTable = ({ tenantType = 'ST', customerId, dateRange }) => {
  const tdpData = useMemo(() => {
    if (!customerId) return [];
    const data = getDataForCustomer(customerId);
    if (!data) return [];

    let filtered = data.tdp;
    if (dateRange && dateRange[0] && dateRange[1]) {
      filtered = filtered.filter(row => isMonthInRange(row.month, dateRange[0], dateRange[1]));
    }
    return filtered;
  }, [customerId, dateRange]);

  // Define all columns
  const allColumns = [
    { title: 'Month', dataIndex: 'month', key: 'month', fixed: 'left', width: 100 },
    { title: 'Data Ingested (RAW) (GB)', dataIndex: 'dataIngestedGB', key: 'dataIngestedGB', width: 120 },
    { title: 'Data Ingested (RAW) (TB)', dataIndex: 'dataIngestedTB', key: 'dataIngestedTB', width: 120 },
    { title: 'Data Ingested YTD (RAW) (GB)', dataIndex: 'dataIngestedYTDGB', key: 'dataIngestedYTDGB', width: 140 },
    { title: 'Data Ingested YTD (RAW) (TB)', dataIndex: 'dataIngestedYTDTB', key: 'dataIngestedYTDTB', width: 140 },
    { title: 'Files Ingested (RAW) (Count)', dataIndex: 'filesIngested', key: 'filesIngested', width: 140 },
    { title: 'Files Ingested YTD (RAW) (Count)', dataIndex: 'filesIngestedYTD', key: 'filesIngestedYTD', width: 160 },
    { title: 'Average File Size (RAW) (MB)', dataIndex: 'avgFileSize', key: 'avgFileSize', width: 140 },
    { title: 'Files Stored [Datalake] (Count)', dataIndex: 'filesStored', key: 'filesStored', width: 150 },
    { title: 'Data Stored [Datalake] (GB)', dataIndex: 'dataStoredGB', key: 'dataStoredGB', width: 140 },
    { title: 'Data Stored [Datalake] (TB)', dataIndex: 'dataStoredTB', key: 'dataStoredTB', width: 140 },
    { title: 'Storage Cost [Datalake] (USD)', dataIndex: 'storageCostDatalake', key: 'storageCostDatalake', width: 150, render: (value) => `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    { title: 'Data Stored [Athena] (GB)', dataIndex: 'dataStoredAthenaGB', key: 'dataStoredAthenaGB', width: 140 },
    { title: 'Storage Cost [Athena] (USD)', dataIndex: 'storageCostAthena', key: 'storageCostAthena', width: 150, render: (value) => `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    { title: 'ECS Processing Cost (USD)', dataIndex: 'ecsProcessingCost', key: 'ecsProcessingCost', width: 150, render: (value) => `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    { title: 'ECS Data Apps Cost (USD)', dataIndex: 'ecsDataAppsCost', key: 'ecsDataAppsCost', width: 150, render: (value) => `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    { title: 'ECS Connectors Cost (USD)', dataIndex: 'ecsConnectorsCost', key: 'ecsConnectorsCost', width: 150, render: (value) => `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    { title: 'Data Apps Streaming Cost (USD)', dataIndex: 'dataAppsStreamingCost', key: 'dataAppsStreamingCost', width: 170, render: (value) => `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    { title: 'EC2 Cost (USD)', dataIndex: 'ec2Cost', key: 'ec2Cost', width: 120, render: (value) => `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    { title: 'Databricks Cost (USD)', dataIndex: 'databricksCost', key: 'databricksCost', width: 140, render: (value) => `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    { title: 'Snowflake Cost (USD)', dataIndex: 'snowflakeCost', key: 'snowflakeCost', width: 140, render: (value) => `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    { title: 'Athena Data Access Cost (USD)', dataIndex: 'athenaDataAccessCost', key: 'athenaDataAccessCost', width: 170, render: (value) => `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    { title: 'Total Monthly Cost (USD)', dataIndex: 'totalMonthlyCost', key: 'totalMonthlyCost', width: 150, fixed: 'right', render: (value) => `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
  ];

  // For MT customers, exclude platform fee columns
  const mtExcludedColumns = [
    'ecsDataAppsCost', 'ecsConnectorsCost', 'dataAppsStreamingCost',
    'ec2Cost', 'databricksCost', 'snowflakeCost'
  ];

  const columns = tenantType === 'MT'
    ? allColumns.filter(col => !mtExcludedColumns.includes(col.key))
    : allColumns;

  return (
    <Card className="tdp-costs-card" title="TDP Costs">
      <div className="table-search">
        <span>Search</span>
        <span className="record-count">{tdpData.length} records...</span>
      </div>
      <Table
        columns={columns}
        dataSource={tdpData}
        pagination={false}
        scroll={{ x: 'max-content' }}
        size="small"
      />
    </Card>
  );
};

export default TDPCostsTable;
