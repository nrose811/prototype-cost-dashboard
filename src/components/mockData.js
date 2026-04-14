// Centralized mock data for the Cost Dashboard prototype
// All data is organized by customer/org for THST and THMT views

// ============================================================
// Customer definitions
// ============================================================

export const stCustomers = [
  { id: 'st-acme', name: 'Acme Corp', accountId: 'saas-acme-prod-us-east-1', orgSlugs: ['acme-prod', 'acme-staging'] },
  { id: 'st-globex', name: 'Globex Inc', accountId: 'saas-globex-prod-eu-west-1', orgSlugs: ['globex-prod', 'globex-dev'] },
  { id: 'st-initech', name: 'Initech LLC', accountId: 'saas-initech-dev-us-west-2', orgSlugs: ['initech-prod', 'initech-qa', 'initech-dev'] },
];

export const mtCustomers = [
  { id: 'mt-umbrella', name: 'Umbrella Org', orgSlugs: ['umbrella-main', 'umbrella-research'] },
  { id: 'mt-wayne', name: 'Wayne Enterprises', orgSlugs: ['wayne-prod', 'wayne-labs'] },
  { id: 'mt-stark', name: 'Stark Labs', orgSlugs: ['stark-prod'] },
];

// ============================================================
// Filter constants
// ============================================================

export const MT_AWS_SERVICES = ['Elastic Container Service', 'S3'];
export const MT_DBX_SERVICES = ['JOBS', 'ALL_PURPOSE', 'SQL', 'STORAGE'];

export const AWS_SERVICE_TYPES = [
  'Glue', 'Elastic Container Service', 'Relational Database Service',
  'OpenSearch Service', 'CloudWatch', 'S3', 'EC2-Instances',
  'Kinesis', 'VPC', 'Others'
];

export const DBX_SERVICE_TYPES = [
  'ALL_PURPOSE', 'MODEL_SERVING', 'JOBS', 'VECTOR_SEARCH', 'SQL',
  'APPS', 'INTERACTIVE', 'NETWORKING', 'PREDICTIVE_OPTIMIZATION',
  'STORAGE', 'DLT', 'ONLINE_TABLES', 'AGENT_EVALUATION',
  'DEFAULT_STORAGE', 'ALL_ANYWAY'
];

// ============================================================
// Chart color constants
// ============================================================

export const AWS_SERVICE_COLORS = {
  'Glue': '#7B68EE',
  'Elastic Container Service': '#C75B7A',
  'Relational Database Service': '#5DADE2',
  'OpenSearch Service': '#9B59B6',
  'CloudWatch': '#E67E22',
  'S3': '#3498DB',
  'EC2-Instances': '#922B21',
  'Kinesis': '#16A085',
  'VPC': '#7D6608',
  'Others': '#A0826D',
};

export const DBX_SERVICE_COLORS = {
  'ALL_PURPOSE': '#7B68EE',
  'MODEL_SERVING': '#C75B7A',
  'JOBS': '#5DADE2',
  'VECTOR_SEARCH': '#9B59B6',
  'SQL': '#E67E22',
  'APPS': '#3498DB',
  'INTERACTIVE': '#922B21',
  'NETWORKING': '#16A085',
  'PREDICTIVE_OPTIMIZATION': '#7D6608',
  'STORAGE': '#A0826D',
  'DLT': '#E74C3C',
  'ONLINE_TABLES': '#27AE60',
  'AGENT_EVALUATION': '#F39C12',
  'DEFAULT_STORAGE': '#8E44AD',
  'ALL_ANYWAY': '#34495E',
};

// ============================================================
// Base AWS Cost Data (13 months, Dec 2024 - Dec 2025)
// ============================================================

const baseAwsData = [
  { month: 'Dec 2024', Glue: 3200, 'Elastic Container Service': 1800, 'Relational Database Service': 2300, 'OpenSearch Service': 2800, CloudWatch: 1400, S3: 1100, 'EC2-Instances': 1700, Kinesis: 750, VPC: 450, Others: 950 },
  { month: 'Jan 2025', Glue: 3300, 'Elastic Container Service': 1850, 'Relational Database Service': 2350, 'OpenSearch Service': 2850, CloudWatch: 1420, S3: 1120, 'EC2-Instances': 1720, Kinesis: 770, VPC: 460, Others: 960 },
  { month: 'Feb 2025', Glue: 3350, 'Elastic Container Service': 1900, 'Relational Database Service': 2400, 'OpenSearch Service': 2900, CloudWatch: 1450, S3: 1150, 'EC2-Instances': 1750, Kinesis: 780, VPC: 470, Others: 970 },
  { month: 'Mar 2025', Glue: 3400, 'Elastic Container Service': 1950, 'Relational Database Service': 2450, 'OpenSearch Service': 2950, CloudWatch: 1480, S3: 1180, 'EC2-Instances': 1780, Kinesis: 790, VPC: 480, Others: 990 },
  { month: 'Apr 2025', Glue: 3500, 'Elastic Container Service': 2000, 'Relational Database Service': 2500, 'OpenSearch Service': 3000, CloudWatch: 1500, S3: 1200, 'EC2-Instances': 1800, Kinesis: 800, VPC: 500, Others: 1000 },
  { month: 'May 2025', Glue: 4000, 'Elastic Container Service': 2200, 'Relational Database Service': 2800, 'OpenSearch Service': 3200, CloudWatch: 1600, S3: 1300, 'EC2-Instances': 2000, Kinesis: 900, VPC: 600, Others: 1100 },
  { month: 'Jun 2025', Glue: 3800, 'Elastic Container Service': 2100, 'Relational Database Service': 2600, 'OpenSearch Service': 3100, CloudWatch: 1550, S3: 1250, 'EC2-Instances': 1900, Kinesis: 850, VPC: 550, Others: 1050 },
  { month: 'Jul 2025', Glue: 4500, 'Elastic Container Service': 2400, 'Relational Database Service': 3000, 'OpenSearch Service': 3500, CloudWatch: 1700, S3: 1400, 'EC2-Instances': 2200, Kinesis: 1000, VPC: 700, Others: 1200 },
  { month: 'Aug 2025', Glue: 5000, 'Elastic Container Service': 2600, 'Relational Database Service': 3300, 'OpenSearch Service': 3800, CloudWatch: 1800, S3: 1500, 'EC2-Instances': 2400, Kinesis: 1100, VPC: 800, Others: 1300 },
  { month: 'Sep 2025', Glue: 5500, 'Elastic Container Service': 2800, 'Relational Database Service': 3500, 'OpenSearch Service': 4000, CloudWatch: 1900, S3: 1600, 'EC2-Instances': 2600, Kinesis: 1200, VPC: 900, Others: 1400 },
  { month: 'Oct 2025', Glue: 5200, 'Elastic Container Service': 2700, 'Relational Database Service': 3400, 'OpenSearch Service': 3900, CloudWatch: 1850, S3: 1550, 'EC2-Instances': 2500, Kinesis: 1150, VPC: 850, Others: 1350 },
  { month: 'Nov 2025', Glue: 5400, 'Elastic Container Service': 2750, 'Relational Database Service': 3450, 'OpenSearch Service': 3950, CloudWatch: 1880, S3: 1580, 'EC2-Instances': 2550, Kinesis: 1180, VPC: 880, Others: 1380 },
  { month: 'Dec 2025', Glue: 5600, 'Elastic Container Service': 2850, 'Relational Database Service': 3600, 'OpenSearch Service': 4100, CloudWatch: 1920, S3: 1620, 'EC2-Instances': 2650, Kinesis: 1220, VPC: 920, Others: 1420 },
];

// ============================================================
// Base DBx Cost Data (13 months, Dec 2024 - Dec 2025)
// ============================================================

const baseDbxData = [
  { month: '2024-12', ALL_PURPOSE: 800, MODEL_SERVING: 700, JOBS: 600, VECTOR_SEARCH: 400, SQL: 300, APPS: 250, INTERACTIVE: 200, NETWORKING: 150, PREDICTIVE_OPTIMIZATION: 150, STORAGE: 150, DLT: 100, ONLINE_TABLES: 80, AGENT_EVALUATION: 60, DEFAULT_STORAGE: 40, ALL_ANYWAY: 20 },
  { month: '2025-01', ALL_PURPOSE: 750, MODEL_SERVING: 650, JOBS: 550, VECTOR_SEARCH: 350, SQL: 280, APPS: 230, INTERACTIVE: 180, NETWORKING: 140, PREDICTIVE_OPTIMIZATION: 140, STORAGE: 140, DLT: 90, ONLINE_TABLES: 70, AGENT_EVALUATION: 50, DEFAULT_STORAGE: 35, ALL_ANYWAY: 15 },
  { month: '2025-02', ALL_PURPOSE: 820, MODEL_SERVING: 680, JOBS: 580, VECTOR_SEARCH: 380, SQL: 290, APPS: 240, INTERACTIVE: 190, NETWORKING: 145, PREDICTIVE_OPTIMIZATION: 145, STORAGE: 145, DLT: 95, ONLINE_TABLES: 75, AGENT_EVALUATION: 55, DEFAULT_STORAGE: 38, ALL_ANYWAY: 17 },
  { month: '2025-03', ALL_PURPOSE: 50, MODEL_SERVING: 40, JOBS: 30, VECTOR_SEARCH: 20, SQL: 15, APPS: 12, INTERACTIVE: 10, NETWORKING: 8, PREDICTIVE_OPTIMIZATION: 5, STORAGE: 5, DLT: 3, ONLINE_TABLES: 1, AGENT_EVALUATION: 0.5, DEFAULT_STORAGE: 0.3, ALL_ANYWAY: 0.2 },
  { month: '2025-04', ALL_PURPOSE: 1300, MODEL_SERVING: 1100, JOBS: 900, VECTOR_SEARCH: 600, SQL: 450, APPS: 380, INTERACTIVE: 300, NETWORKING: 230, PREDICTIVE_OPTIMIZATION: 230, STORAGE: 230, DLT: 150, ONLINE_TABLES: 120, AGENT_EVALUATION: 90, DEFAULT_STORAGE: 60, ALL_ANYWAY: 30 },
  { month: '2025-05', ALL_PURPOSE: 1100, MODEL_SERVING: 900, JOBS: 750, VECTOR_SEARCH: 500, SQL: 380, APPS: 320, INTERACTIVE: 250, NETWORKING: 190, PREDICTIVE_OPTIMIZATION: 190, STORAGE: 190, DLT: 125, ONLINE_TABLES: 100, AGENT_EVALUATION: 75, DEFAULT_STORAGE: 50, ALL_ANYWAY: 25 },
  { month: '2025-06', ALL_PURPOSE: 1000, MODEL_SERVING: 800, JOBS: 680, VECTOR_SEARCH: 450, SQL: 340, APPS: 290, INTERACTIVE: 230, NETWORKING: 175, PREDICTIVE_OPTIMIZATION: 175, STORAGE: 175, DLT: 115, ONLINE_TABLES: 90, AGENT_EVALUATION: 68, DEFAULT_STORAGE: 45, ALL_ANYWAY: 22 },
  { month: '2025-07', ALL_PURPOSE: 2600, MODEL_SERVING: 2200, JOBS: 1800, VECTOR_SEARCH: 1200, SQL: 900, APPS: 760, INTERACTIVE: 600, NETWORKING: 460, PREDICTIVE_OPTIMIZATION: 460, STORAGE: 460, DLT: 300, ONLINE_TABLES: 240, AGENT_EVALUATION: 180, DEFAULT_STORAGE: 120, ALL_ANYWAY: 60 },
  { month: '2025-08', ALL_PURPOSE: 6700, MODEL_SERVING: 5700, JOBS: 4700, VECTOR_SEARCH: 3100, SQL: 2350, APPS: 1980, INTERACTIVE: 1560, NETWORKING: 1190, PREDICTIVE_OPTIMIZATION: 1190, STORAGE: 1190, DLT: 775, ONLINE_TABLES: 620, AGENT_EVALUATION: 465, DEFAULT_STORAGE: 310, ALL_ANYWAY: 155 },
  { month: '2025-09', ALL_PURPOSE: 3900, MODEL_SERVING: 3300, JOBS: 2700, VECTOR_SEARCH: 1800, SQL: 1350, APPS: 1140, INTERACTIVE: 900, NETWORKING: 690, PREDICTIVE_OPTIMIZATION: 690, STORAGE: 690, DLT: 450, ONLINE_TABLES: 360, AGENT_EVALUATION: 270, DEFAULT_STORAGE: 180, ALL_ANYWAY: 90 },
  { month: '2025-10', ALL_PURPOSE: 7350, MODEL_SERVING: 6250, JOBS: 5150, VECTOR_SEARCH: 3400, SQL: 2550, APPS: 2160, INTERACTIVE: 1700, NETWORKING: 1300, PREDICTIVE_OPTIMIZATION: 1300, STORAGE: 1300, DLT: 850, ONLINE_TABLES: 680, AGENT_EVALUATION: 510, DEFAULT_STORAGE: 340, ALL_ANYWAY: 170 },
  { month: '2025-11', ALL_PURPOSE: 8000, MODEL_SERVING: 6800, JOBS: 5600, VECTOR_SEARCH: 3700, SQL: 2775, APPS: 2350, INTERACTIVE: 1850, NETWORKING: 1415, PREDICTIVE_OPTIMIZATION: 1415, STORAGE: 1415, DLT: 925, ONLINE_TABLES: 740, AGENT_EVALUATION: 555, DEFAULT_STORAGE: 370, ALL_ANYWAY: 185 },
  { month: '2025-12', ALL_PURPOSE: 8200, MODEL_SERVING: 7000, JOBS: 5800, VECTOR_SEARCH: 3850, SQL: 2900, APPS: 2450, INTERACTIVE: 1930, NETWORKING: 1475, PREDICTIVE_OPTIMIZATION: 1475, STORAGE: 1475, DLT: 965, ONLINE_TABLES: 770, AGENT_EVALUATION: 580, DEFAULT_STORAGE: 385, ALL_ANYWAY: 195 },
];

// ============================================================
// Base Snowflake Cost Data (13 months) — only some customers have spend
// ============================================================

const baseSnowflakeData = [
  { month: 'Dec 2024', cost: 850 },
  { month: 'Jan 2025', cost: 920 },
  { month: 'Feb 2025', cost: 880 },
  { month: 'Mar 2025', cost: 950 },
  { month: 'Apr 2025', cost: 1100 },
  { month: 'May 2025', cost: 1250 },
  { month: 'Jun 2025', cost: 1180 },
  { month: 'Jul 2025', cost: 1400 },
  { month: 'Aug 2025', cost: 1650 },
  { month: 'Sep 2025', cost: 1550 },
  { month: 'Oct 2025', cost: 1720 },
  { month: 'Nov 2025', cost: 1800 },
  { month: 'Dec 2025', cost: 1900 },
];

// ============================================================
// Base TDP Table Data (expanded to 13 months)
// ============================================================

const baseTdpData = [
  { month: 'Dec 2024', dataIngestedGB: '1.8k', dataIngestedTB: '1.76', dataIngestedYTDGB: '45k', dataIngestedYTDTB: '43.9', filesIngested: '2.1M', filesIngestedYTD: '8.7M', avgFileSize: '18.20', filesStored: '65M', dataStoredGB: '1.42M', dataStoredTB: '1.39k', storageCostDatalake: 32580.10, dataStoredAthenaGB: '240k', storageCostAthena: 5520.00, ecsProcessingCost: 2450.30, ecsDataAppsCost: 1100.50, ecsConnectorsCost: 175.20, dataAppsStreamingCost: 1950.80, ec2Cost: 18.50, databricksCost: 0, snowflakeCost: 0, athenaDataAccessCost: 0, totalMonthlyCost: 43795.40 },
  { month: 'Jan 2025', dataIngestedGB: '2.0k', dataIngestedTB: '1.95', dataIngestedYTDGB: '2.0k', dataIngestedYTDTB: '1.95', filesIngested: '2.3M', filesIngestedYTD: '2.3M', avgFileSize: '19.10', filesStored: '66M', dataStoredGB: '1.48M', dataStoredTB: '1.44k', storageCostDatalake: 33850.20, dataStoredAthenaGB: '242k', storageCostAthena: 5566.00, ecsProcessingCost: 2580.40, ecsDataAppsCost: 1150.60, ecsConnectorsCost: 180.30, dataAppsStreamingCost: 2010.50, ec2Cost: 20.10, databricksCost: 0, snowflakeCost: 0, athenaDataAccessCost: 0, totalMonthlyCost: 45358.10 },
  { month: 'Feb 2025', dataIngestedGB: '2.1k', dataIngestedTB: '2.05', dataIngestedYTDGB: '4.1k', dataIngestedYTDTB: '4.00', filesIngested: '2.5M', filesIngestedYTD: '4.8M', avgFileSize: '19.80', filesStored: '67M', dataStoredGB: '1.52M', dataStoredTB: '1.48k', storageCostDatalake: 34920.50, dataStoredAthenaGB: '244k', storageCostAthena: 5612.00, ecsProcessingCost: 2700.20, ecsDataAppsCost: 1200.40, ecsConnectorsCost: 188.50, dataAppsStreamingCost: 2120.30, ec2Cost: 21.80, databricksCost: 0, snowflakeCost: 0, athenaDataAccessCost: 0, totalMonthlyCost: 46763.70 },
  { month: 'Mar 2025', dataIngestedGB: '68.4k', dataIngestedTB: '66.76', dataIngestedYTDGB: '122k', dataIngestedYTDTB: '119.1', filesIngested: '12.8M', filesIngestedYTD: '21.5M', avgFileSize: '3.99', filesStored: '69.3M', dataStoredGB: '1.59M', dataStoredTB: '1.55k', storageCostDatalake: 36542.55, dataStoredAthenaGB: '247k', storageCostAthena: 5685.27, ecsProcessingCost: 2964.17, ecsDataAppsCost: 1356.73, ecsConnectorsCost: 196.04, dataAppsStreamingCost: 2511.12, ec2Cost: 24.33, databricksCost: 0, snowflakeCost: 0, athenaDataAccessCost: 0, totalMonthlyCost: 49280.21 },
  { month: 'Apr 2025', dataIngestedGB: '31k', dataIngestedTB: '30.23', dataIngestedYTDGB: '152k', dataIngestedYTDTB: '148.8', filesIngested: '4.22M', filesIngestedYTD: '25.8M', avgFileSize: '35.26', filesStored: '70.2M', dataStoredGB: '1.63M', dataStoredTB: '1.61k', storageCostDatalake: 37849.69, dataStoredAthenaGB: '249k', storageCostAthena: 5722.29, ecsProcessingCost: 4155.00, ecsDataAppsCost: 1762.81, ecsConnectorsCost: 225.81, dataAppsStreamingCost: 1805.92, ec2Cost: 37.22, databricksCost: 0, snowflakeCost: 0, athenaDataAccessCost: 0, totalMonthlyCost: 51558.74 },
  { month: 'May 2025', dataIngestedGB: '2.5k', dataIngestedTB: '2.46', dataIngestedYTDGB: '178k', dataIngestedYTDTB: '174.3', filesIngested: '3.29M', filesIngestedYTD: '29.1M', avgFileSize: '20.47', filesStored: '71M', dataStoredGB: '1.72M', dataStoredTB: '1.68k', storageCostDatalake: 39651.28, dataStoredAthenaGB: '254k', storageCostAthena: 5851.75, ecsProcessingCost: 5186.12, ecsDataAppsCost: 2135.62, ecsConnectorsCost: 248.20, dataAppsStreamingCost: 1131.03, ec2Cost: 834.54, databricksCost: 0, snowflakeCost: 0, athenaDataAccessCost: 0, totalMonthlyCost: 55038.54 },
  { month: 'Jun 2025', dataIngestedGB: '2.8k', dataIngestedTB: '2.73', dataIngestedYTDGB: '181k', dataIngestedYTDTB: '177.0', filesIngested: '3.50M', filesIngestedYTD: '32.6M', avgFileSize: '21.10', filesStored: '72M', dataStoredGB: '1.78M', dataStoredTB: '1.74k', storageCostDatalake: 40820.50, dataStoredAthenaGB: '258k', storageCostAthena: 5935.00, ecsProcessingCost: 5350.80, ecsDataAppsCost: 2200.10, ecsConnectorsCost: 260.30, dataAppsStreamingCost: 1200.50, ec2Cost: 850.20, databricksCost: 0, snowflakeCost: 0, athenaDataAccessCost: 0, totalMonthlyCost: 56617.40 },
  { month: 'Jul 2025', dataIngestedGB: '3.1k', dataIngestedTB: '3.03', dataIngestedYTDGB: '184k', dataIngestedYTDTB: '180.0', filesIngested: '3.80M', filesIngestedYTD: '36.4M', avgFileSize: '22.50', filesStored: '73.5M', dataStoredGB: '1.85M', dataStoredTB: '1.81k', storageCostDatalake: 42150.30, dataStoredAthenaGB: '262k', storageCostAthena: 6026.00, ecsProcessingCost: 5580.40, ecsDataAppsCost: 2320.50, ecsConnectorsCost: 275.60, dataAppsStreamingCost: 1320.80, ec2Cost: 900.30, databricksCost: 0, snowflakeCost: 0, athenaDataAccessCost: 0, totalMonthlyCost: 58573.90 },
  { month: 'Aug 2025', dataIngestedGB: '3.4k', dataIngestedTB: '3.32', dataIngestedYTDGB: '188k', dataIngestedYTDTB: '183.3', filesIngested: '4.10M', filesIngestedYTD: '40.5M', avgFileSize: '23.80', filesStored: '75M', dataStoredGB: '1.92M', dataStoredTB: '1.88k', storageCostDatalake: 43520.80, dataStoredAthenaGB: '266k', storageCostAthena: 6118.00, ecsProcessingCost: 5820.60, ecsDataAppsCost: 2450.30, ecsConnectorsCost: 290.80, dataAppsStreamingCost: 1450.20, ec2Cost: 950.40, databricksCost: 0, snowflakeCost: 0, athenaDataAccessCost: 0, totalMonthlyCost: 60601.10 },
  { month: 'Sep 2025', dataIngestedGB: '3.2k', dataIngestedTB: '3.13', dataIngestedYTDGB: '191k', dataIngestedYTDTB: '186.4', filesIngested: '3.95M', filesIngestedYTD: '44.5M', avgFileSize: '22.90', filesStored: '76M', dataStoredGB: '1.98M', dataStoredTB: '1.93k', storageCostDatalake: 44850.20, dataStoredAthenaGB: '270k', storageCostAthena: 6210.00, ecsProcessingCost: 5650.30, ecsDataAppsCost: 2380.20, ecsConnectorsCost: 282.50, dataAppsStreamingCost: 1380.60, ec2Cost: 920.50, databricksCost: 0, snowflakeCost: 0, athenaDataAccessCost: 0, totalMonthlyCost: 61674.30 },
  { month: 'Oct 2025', dataIngestedGB: '3.5k', dataIngestedTB: '3.42', dataIngestedYTDGB: '195k', dataIngestedYTDTB: '189.8', filesIngested: '4.20M', filesIngestedYTD: '48.7M', avgFileSize: '24.10', filesStored: '77.5M', dataStoredGB: '2.05M', dataStoredTB: '2.00k', storageCostDatalake: 46200.50, dataStoredAthenaGB: '274k', storageCostAthena: 6302.00, ecsProcessingCost: 5920.80, ecsDataAppsCost: 2500.40, ecsConnectorsCost: 298.60, dataAppsStreamingCost: 1520.30, ec2Cost: 980.60, databricksCost: 0, snowflakeCost: 0, athenaDataAccessCost: 0, totalMonthlyCost: 63723.20 },
  { month: 'Nov 2025', dataIngestedGB: '3.3k', dataIngestedTB: '3.22', dataIngestedYTDGB: '198k', dataIngestedYTDTB: '193.0', filesIngested: '4.05M', filesIngestedYTD: '52.8M', avgFileSize: '23.50', filesStored: '78.5M', dataStoredGB: '2.10M', dataStoredTB: '2.05k', storageCostDatalake: 47350.80, dataStoredAthenaGB: '278k', storageCostAthena: 6394.00, ecsProcessingCost: 5780.50, ecsDataAppsCost: 2440.60, ecsConnectorsCost: 290.40, dataAppsStreamingCost: 1450.80, ec2Cost: 960.30, databricksCost: 0, snowflakeCost: 0, athenaDataAccessCost: 0, totalMonthlyCost: 64667.40 },
  { month: 'Dec 2025', dataIngestedGB: '3.0k', dataIngestedTB: '2.93', dataIngestedYTDGB: '201k', dataIngestedYTDTB: '195.9', filesIngested: '3.85M', filesIngestedYTD: '56.7M', avgFileSize: '22.20', filesStored: '80M', dataStoredGB: '2.15M', dataStoredTB: '2.10k', storageCostDatalake: 48500.20, dataStoredAthenaGB: '282k', storageCostAthena: 6486.00, ecsProcessingCost: 5650.30, ecsDataAppsCost: 2380.50, ecsConnectorsCost: 282.30, dataAppsStreamingCost: 1380.50, ec2Cost: 940.20, databricksCost: 0, snowflakeCost: 0, athenaDataAccessCost: 0, totalMonthlyCost: 65620.00 },
];

// ============================================================
// Utility: apply multiplier to numeric fields in a data object
// ============================================================

function applyMultiplier(data, multiplier, numericExceptions = ['month', 'key']) {
  return data.map(row => {
    const newRow = {};
    for (const [key, value] of Object.entries(row)) {
      if (numericExceptions.includes(key) || typeof value !== 'number') {
        newRow[key] = value;
      } else {
        newRow[key] = Math.round(value * multiplier * 100) / 100;
      }
    }
    return newRow;
  });
}

// ============================================================
// Customer-specific multipliers and Snowflake config
// ============================================================

const customerConfig = {
  // THST customers
  'st-acme': { awsMultiplier: 1.0, dbxMultiplier: 1.0, tdpMultiplier: 1.0, snowflakeMultiplier: 0 },
  'st-globex': { awsMultiplier: 0.7, dbxMultiplier: 0.8, tdpMultiplier: 0.75, snowflakeMultiplier: 0 },
  'st-initech': { awsMultiplier: 1.3, dbxMultiplier: 1.2, tdpMultiplier: 1.1, snowflakeMultiplier: 1.0 },
  // THMT customers
  'mt-umbrella': { awsMultiplier: 0.4, dbxMultiplier: 0.5, tdpMultiplier: 0.35, snowflakeMultiplier: 0 },
  'mt-wayne': { awsMultiplier: 0.6, dbxMultiplier: 0.45, tdpMultiplier: 0.5, snowflakeMultiplier: 0 },
  'mt-stark': { awsMultiplier: 0.3, dbxMultiplier: 0.35, tdpMultiplier: 0.25, snowflakeMultiplier: 0 },
};

// ============================================================
// Month parsing utilities
// ============================================================

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Normalize any month string to "YYYY-MM" for comparison
export function normalizeMonth(monthStr) {
  // Handle "YYYY-MM" format (DBx style)
  if (/^\d{4}-\d{2}$/.test(monthStr)) {
    return monthStr;
  }
  // Handle "Mon YYYY" format (AWS style, e.g., "Apr 2025")
  const match = monthStr.match(/^(\w{3})\s+(\d{4})$/);
  if (match) {
    const monthIndex = MONTH_NAMES.indexOf(match[1]);
    if (monthIndex >= 0) {
      return `${match[2]}-${String(monthIndex + 1).padStart(2, '0')}`;
    }
  }
  // Handle "Mon/YYYY" format (TDP style, e.g., "May/2025")
  const slashMatch = monthStr.match(/^(\w{3})\/(\d{4})$/);
  if (slashMatch) {
    const monthIndex = MONTH_NAMES.indexOf(slashMatch[1]);
    if (monthIndex >= 0) {
      return `${slashMatch[2]}-${String(monthIndex + 1).padStart(2, '0')}`;
    }
  }
  return monthStr;
}

// Format "YYYY-MM" to display format "Mon YYYY"
export function formatMonth(normalizedMonth) {
  const [year, month] = normalizedMonth.split('-');
  return `${MONTH_NAMES[parseInt(month) - 1]} ${year}`;
}

// Check if a month string falls within a range (inclusive)
// startMonth and endMonth should be "YYYY-MM" format
export function isMonthInRange(monthStr, startMonth, endMonth) {
  const normalized = normalizeMonth(monthStr);
  return normalized >= startMonth && normalized <= endMonth;
}

// ============================================================
// Main data accessor
// ============================================================

export function getDataForCustomer(customerId) {
  const config = customerConfig[customerId];
  if (!config) return null;

  const aws = applyMultiplier(baseAwsData, config.awsMultiplier);
  const dbx = applyMultiplier(baseDbxData, config.dbxMultiplier);
  const snowflake = config.snowflakeMultiplier > 0
    ? applyMultiplier(baseSnowflakeData, config.snowflakeMultiplier)
    : baseSnowflakeData.map(row => ({ ...row, cost: 0 }));

  // TDP data needs special handling for non-numeric fields
  const tdp = baseTdpData.map((row, index) => {
    const newRow = { ...row, key: String(index + 1) };
    // Apply multiplier only to cost fields
    const costFields = [
      'storageCostDatalake', 'storageCostAthena', 'ecsProcessingCost',
      'ecsDataAppsCost', 'ecsConnectorsCost', 'dataAppsStreamingCost',
      'ec2Cost', 'databricksCost', 'snowflakeCost', 'athenaDataAccessCost', 'totalMonthlyCost'
    ];
    costFields.forEach(field => {
      newRow[field] = Math.round(row[field] * config.tdpMultiplier * 100) / 100;
    });
    // For Initech, add Snowflake costs to TDP
    if (customerId === 'st-initech') {
      const snowMonth = snowflake.find(s => normalizeMonth(s.month) === normalizeMonth(row.month));
      if (snowMonth) {
        newRow.snowflakeCost = snowMonth.cost;
        newRow.totalMonthlyCost = Math.round((newRow.totalMonthlyCost + snowMonth.cost) * 100) / 100;
      }
    }
    return newRow;
  });

  return { aws, dbx, snowflake, tdp };
}

// ============================================================
// Default date range: Q4 2025
// ============================================================

export const DEFAULT_START_MONTH = '2025-10';
export const DEFAULT_END_MONTH = '2025-12';
