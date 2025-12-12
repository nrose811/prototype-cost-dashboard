import React from 'react';
import { Card, Table } from 'antd';
import './TDPCostsTable.css';

const TDPCostsTable = ({ tenantType = 'ST' }) => {
  // Sample data for 3 months
  const tdpData = [
    {
      key: '1',
      month: 'May/2025',
      dataIngestedGB: '2.5k',
      dataIngestedTB: '2.46',
      dataIngestedYTDGB: '178k',
      dataIngestedYTDTB: '174.3',
      filesIngested: '3.29M',
      filesIngestedYTD: '29.1M',
      avgFileSize: '20.47',
      filesStored: '71M',
      dataStoredGB: '1.72M',
      dataStoredTB: '1.68k',
      storageCostDatalake: 39651.28,
      dataStoredAthenaGB: '254k',
      storageCostAthena: 5851.75,
      ecsProcessingCost: 5186.12,
      ecsDataAppsCost: 2135.62,
      ecsConnectorsCost: 248.20,
      dataAppsStreamingCost: 1131.03,
      ec2Cost: 834.54,
      databricksCost: 0.00,
      snowflakeCost: 0.00,
      athenaDataAccessCost: 0.00,
      totalMonthlyCost: 55038.54,
      ecsPipelineCost: 5186.12,
      dataCost: 834.54
    },
    {
      key: '2',
      month: 'Apr/2025',
      dataIngestedGB: '31k',
      dataIngestedTB: '30.23',
      dataIngestedYTDGB: '152k',
      dataIngestedYTDTB: '148.8',
      filesIngested: '4.22M',
      filesIngestedYTD: '25.8M',
      avgFileSize: '35.26',
      filesStored: '70.2M',
      dataStoredGB: '1.63M',
      dataStoredTB: '1.61k',
      storageCostDatalake: 37849.69,
      dataStoredAthenaGB: '249k',
      storageCostAthena: 5722.29,
      ecsProcessingCost: 4155.00,
      ecsDataAppsCost: 1762.81,
      ecsConnectorsCost: 225.81,
      dataAppsStreamingCost: 1805.92,
      ec2Cost: 37.22,
      databricksCost: 0.00,
      snowflakeCost: 0.00,
      athenaDataAccessCost: 0.00,
      totalMonthlyCost: 51558.74,
      ecsPipelineCost: 4155.00,
      dataCost: 37.22
    },
    {
      key: '3',
      month: 'Mar/2025',
      dataIngestedGB: '68.4k',
      dataIngestedTB: '66.76',
      dataIngestedYTDGB: '122k',
      dataIngestedYTDTB: '119.1',
      filesIngested: '12.8M',
      filesIngestedYTD: '21.5M',
      avgFileSize: '3.99',
      filesStored: '69.3M',
      dataStoredGB: '1.59M',
      dataStoredTB: '1.55k',
      storageCostDatalake: 36542.55,
      dataStoredAthenaGB: '247k',
      storageCostAthena: 5685.27,
      ecsProcessingCost: 2964.17,
      ecsDataAppsCost: 1356.73,
      ecsConnectorsCost: 196.04,
      dataAppsStreamingCost: 2511.12,
      ec2Cost: 24.33,
      databricksCost: 0.00,
      snowflakeCost: 0.00,
      athenaDataAccessCost: 0.00,
      totalMonthlyCost: 49280.21,
      ecsPipelineCost: 2964.17,
      dataCost: 24.33
    }
  ];

  // Define all columns
  const allColumns = [
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month',
      fixed: 'left',
      width: 100
    },
    {
      title: 'Data Ingested (RAW) (GB)',
      dataIndex: 'dataIngestedGB',
      key: 'dataIngestedGB',
      width: 120
    },
    {
      title: 'Data Ingested (RAW) (TB)',
      dataIndex: 'dataIngestedTB',
      key: 'dataIngestedTB',
      width: 120
    },
    {
      title: 'Data Ingested YTD (RAW) (GB)',
      dataIndex: 'dataIngestedYTDGB',
      key: 'dataIngestedYTDGB',
      width: 140
    },
    {
      title: 'Data Ingested YTD (RAW) (TB)',
      dataIndex: 'dataIngestedYTDTB',
      key: 'dataIngestedYTDTB',
      width: 140
    },
    {
      title: 'Files Ingested (RAW) (Count)',
      dataIndex: 'filesIngested',
      key: 'filesIngested',
      width: 140
    },
    {
      title: 'Files Ingested YTD (RAW) (Count)',
      dataIndex: 'filesIngestedYTD',
      key: 'filesIngestedYTD',
      width: 160
    },
    {
      title: 'Average File Size (RAW) (MB)',
      dataIndex: 'avgFileSize',
      key: 'avgFileSize',
      width: 140
    },
    {
      title: 'Files Stored [Datalake] (Count)',
      dataIndex: 'filesStored',
      key: 'filesStored',
      width: 150
    },
    {
      title: 'Data Stored [Datalake] (GB)',
      dataIndex: 'dataStoredGB',
      key: 'dataStoredGB',
      width: 140
    },
    {
      title: 'Data Stored [Datalake] (TB)',
      dataIndex: 'dataStoredTB',
      key: 'dataStoredTB',
      width: 140
    },
    {
      title: 'Storage Cost [Datalake] (USD)',
      dataIndex: 'storageCostDatalake',
      key: 'storageCostDatalake',
      width: 150,
      render: (value) => `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    },
    {
      title: 'Data Stored [Athena] (GB)',
      dataIndex: 'dataStoredAthenaGB',
      key: 'dataStoredAthenaGB',
      width: 140
    },
    {
      title: 'Storage Cost [Athena] (USD)',
      dataIndex: 'storageCostAthena',
      key: 'storageCostAthena',
      width: 150,
      render: (value) => `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    },
    {
      title: 'ECS Processing Cost (USD)',
      dataIndex: 'ecsProcessingCost',
      key: 'ecsProcessingCost',
      width: 150,
      render: (value) => `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    },
    {
      title: 'ECS Data Apps Cost (USD)',
      dataIndex: 'ecsDataAppsCost',
      key: 'ecsDataAppsCost',
      width: 150,
      render: (value) => `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    },
    {
      title: 'ECS Connectors Cost (USD)',
      dataIndex: 'ecsConnectorsCost',
      key: 'ecsConnectorsCost',
      width: 150,
      render: (value) => `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    },
    {
      title: 'Data Apps Streaming Cost (USD)',
      dataIndex: 'dataAppsStreamingCost',
      key: 'dataAppsStreamingCost',
      width: 170,
      render: (value) => `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    },
    {
      title: 'EC2 Cost (USD)',
      dataIndex: 'ec2Cost',
      key: 'ec2Cost',
      width: 120,
      render: (value) => `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    },
    {
      title: 'Databricks Cost (USD)',
      dataIndex: 'databricksCost',
      key: 'databricksCost',
      width: 140,
      render: (value) => `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    },
    {
      title: 'Snowflake Cost (USD)',
      dataIndex: 'snowflakeCost',
      key: 'snowflakeCost',
      width: 140,
      render: (value) => `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    },
    {
      title: 'Athena Data Access Cost (USD)',
      dataIndex: 'athenaDataAccessCost',
      key: 'athenaDataAccessCost',
      width: 170,
      render: (value) => `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    },
    {
      title: 'Total Monthly Cost (USD)',
      dataIndex: 'totalMonthlyCost',
      key: 'totalMonthlyCost',
      width: 150,
      fixed: 'right',
      render: (value) => `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
  ];

  // For MT customers, only show ECS (Compute), S3 (Storage), and Athena (Access) costs
  // Filter out columns that are not relevant for MT
  const mtExcludedColumns = [
    'ecsDataAppsCost',
    'ecsConnectorsCost',
    'dataAppsStreamingCost',
    'ec2Cost',
    'databricksCost',
    'snowflakeCost'
  ];

  const columns = tenantType === 'MT'
    ? allColumns.filter(col => !mtExcludedColumns.includes(col.key))
    : allColumns;

  return (
    <Card className="tdp-costs-card" title="TDP Costs">
      <div className="table-search">
        <span>Search</span>
        <span className="record-count">3 records...</span>
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

