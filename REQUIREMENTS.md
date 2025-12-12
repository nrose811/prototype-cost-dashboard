# Cost Dashboard - Technical Requirements

## Overview
A React-based cost dashboard for visualizing AWS and Databricks (DBx) costs with support for both Multi-Tenant (MT) and Single-Tenant (ST) deployment models.

## Technology Stack
- **Framework**: React 19.2.1
- **UI Library**: Ant Design 6.1.0
- **Charts**: Recharts 3.5.1
- **Styling**: Custom CSS with Superset-inspired design

## Core Features

### 1. Tenant Type Toggle
- **Location**: Center of dashboard header
- **Options**: ST (Single-Tenant) ↔ MT (Multi-Tenant)
- **Default**: ST
- **Behavior**: Dynamically filters all data, charts, and tables based on selected tenant type

### 2. Dashboard Header
**Layout** (3 sections):
- **Left**: Dashboard icon + "Cost Dashboard" title
- **Center**: MT/ST toggle switch
- **Right**: "Prototype" subtitle

**Styling**:
- Dark gradient background
- Semi-transparent toggle container with rounded corners
- Active/inactive state styling for toggle labels

### 3. Tabbed Navigation
**Three tabs** (Cost Summary is default):
1. Cost Summary
2. AWS Costs
3. DBx Costs

## Tab 1: Cost Summary

### Components

#### A. Overview Card (KPIs)
Display combined AWS + DBx metrics:
- **Total cost**: Sum of all AWS and DBx costs
- **Average monthly cost**: Combined average
- **Service count**: Total number of services
  - ST: 53 services (38 AWS + 15 DBx)
  - MT: 6 services (2 AWS + 4 DBx)

#### B. Total Cost Trend Chart (Line Chart)
- **X-axis**: Month (Apr 2025 - Sep 2025)
- **Y-axis**: Total Cost (USD)
- **Data**: Combined AWS + DBx monthly totals
- **Filtering**: Recalculates based on tenant type

#### C. Cost Breakdown Donut Charts (2 charts side-by-side)

**Chart 1: Total Cost by Platform**
- AWS vs DBx breakdown
- Shows total cost distribution

**Chart 2: Average Monthly Cost by Service**
- Individual service breakdown across both platforms
- Format: "AWS: [Service Name]" and "DBx: [Service Type]"
- Sorted by value (descending)
- Top services displayed with color coding

#### D. TDP Costs Table
Comprehensive table with horizontal scrolling:

**Fixed Columns**:
- Month (left)
- Total Monthly Cost (USD) (right)

**Scrollable Columns** (ST view - all columns):

**Data Ingestion Metrics**:
- Data Ingested (RAW) (GB)
- Data Ingested (RAW) (TB)
- Data Ingested YTD (RAW) (GB)
- Data Ingested YTD (RAW) (TB)
- Files Ingested (RAW) (Count)
- Files Ingested YTD (RAW) (Count)
- Average File Size (RAW) (MB)

**Storage Metrics**:
- Files Stored [Datalake] (Count)
- Data Stored [Datalake] (GB)
- Data Stored [Datalake] (TB)
- Storage Cost [Datalake] (USD)
- Data Stored [Athena] (GB)
- Storage Cost [Athena] (USD)

**Cost Metrics**:
- ECS Processing Cost (USD)
- ECS Data Apps Cost (USD) - **EXCLUDED in MT view**
- ECS Connectors Cost (USD) - **EXCLUDED in MT view**
- Data Apps Streaming Cost (USD) - **EXCLUDED in MT view**
- EC2 Cost (USD) - **EXCLUDED in MT view**
- Databricks Cost (USD) - **EXCLUDED in MT view**
- Snowflake Cost (USD) - **EXCLUDED in MT view**
- Athena Data Access Cost (USD)

**Table Features**:
- Search header with record count (e.g., "3 records...")
- Currency formatting: $ with 2 decimal places
- Number formatting: Commas for thousands
- Compact design with proper spacing
- Sample data: 3 months (May, Apr, Mar 2025)

## Tab 2: AWS Costs

### Components

#### A. Cost and Usage Overview Card (KPIs)
- **Total cost**: Sum of all AWS costs across all months
- **Average monthly cost**: Total / number of months
- **Service count**:
  - ST: 38 services
  - MT: 2 services (ECS, S3)

#### B. Cost and Usage Graph (Stacked Bar Chart)
**X-axis**: Month (Apr 2025 - Sep 2025)
**Y-axis**: Costs ($)

**Services (ST view - all 10 displayed)**:
1. Glue
2. Elastic Container Service
3. Relational Database Service
4. OpenSearch Service
5. CloudWatch
6. S3
7. EC2-Instances
8. Kinesis
9. VPC
10. Others

**Services (MT view - only 2 displayed)**:
1. Elastic Container Service (Compute)
2. S3 (Storage)

**Chart Type**: Stacked bars with unique colors per service

#### C. Cost Trends (Line Chart)
- **X-axis**: Month
- **Y-axis**: Total Cost ($)
- **Data**: Aggregated monthly totals (filtered by tenant type)

#### D. Cost Table (Pivoted Format)
**Columns**:
- Month (rows)
- Each service type as a column
- Total Costs (rightmost column)

**Filtering**: Show only MT-relevant services when MT is selected

## Tab 3: DBx Costs

### Components

#### A. Summary Header (KPIs)
- **Total**: Sum of all DBx costs
- **Average**: Total / number of months
- **Service count**:
  - ST: 15 services
  - MT: 4 services (JOBS, ALL_PURPOSE, SQL, STORAGE)

#### B. Usage Cost by Month (Stacked Bar Chart)
**X-axis**: Month (last 12 months, format: YYYY-MM)
**Y-axis**: Usage (in USD)

**Services (ST view - all 15 displayed)**:
1. ALL_PURPOSE
2. MODEL_SERVING
3. JOBS
4. VECTOR_SEARCH
5. SQL
6. APPS
7. INTERACTIVE
8. NETWORKING
9. PREDICTIVE_OPTIMIZATION
10. STORAGE
11. DLT
12. ONLINE_TABLES
13. AGENT_EVALUATION
14. DEFAULT_STORAGE
15. ALL_ANYWAY

**Services (MT view - only 4 displayed)**:
1. JOBS (Compute)
2. ALL_PURPOSE (Compute)
3. SQL (Compute)
4. STORAGE (Storage)

**Chart Type**: Stacked bars with unique colors per service

#### C. Cost Trends (Line Chart)
- **X-axis**: Month
- **Y-axis**: Total Cost ($)
- **Data**: Aggregated monthly totals (filtered by tenant type)

#### D. Cost Table (Pivoted Format)
**Columns**:
- Month (rows)
- Each service type as a column
- Total Costs (rightmost column)

**Filtering**: Show only MT-relevant services when MT is selected

## Multi-Tenant (MT) vs Single-Tenant (ST) Business Rules

### MT Customer Guidance
**Data Processing Fees** (pass-through costs):
- **Compute**: ECS Processing Cost
- **Storage**: S3 (Datalake), Athena Storage
- **Access**: Athena Data Access Cost

**Platform Fees** (NOT displayed in MT view):
- ECS Data Apps Cost
- ECS Connectors Cost
- Data Apps Streaming Cost
- EC2 Cost
- Databricks Cost (except JOBS, ALL_PURPOSE, SQL, STORAGE)
- Snowflake Cost

### ST Customer Guidance
- Display ALL services and costs
- No filtering applied

## Data Filtering Logic

### AWS Services
**MT Filter**: Keep only `['Elastic Container Service', 'S3']`
**ST Filter**: Show all services

### DBx Services
**MT Filter**: Keep only `['JOBS', 'ALL_PURPOSE', 'SQL', 'STORAGE']`
**ST Filter**: Show all 15 services

### Implementation
- Filter data arrays before rendering charts
- Conditionally render Bar components in charts
- Filter table columns based on tenant type
- Recalculate all aggregations (totals, averages, counts) using filtered data

## Styling Requirements

### Color Scheme
- **Background**: Dark gradient (similar to Apache Superset)
- **Cards**: Dark background with subtle borders
- **Text**: Light text on dark background
- **Charts**: Unique color per service (consistent across all charts)

### Chart Colors (Examples)
- Purple: `#7B68EE`
- Pink: `#C75B7A`
- Blue: `#5DADE2`, `#3498DB`
- Orange: `#E67E22`
- Green: `#16A085`, `#27AE60`
- Red: `#922B21`, `#E74C3C`
- Brown: `#A0826D`, `#8B4513`
- Gray: `#696969`, `#34495E`

### Responsive Design
- All charts use `ResponsiveContainer` from Recharts
- Proper spacing with Ant Design Grid (Row/Col with gutter)
- Horizontal scrolling for wide tables

## Component Structure

```
src/
├── App.js (main app with tenantType state)
├── components/
│   ├── DashboardHeader.js (header with toggle)
│   ├── DashboardHeader.css
│   ├── DashboardContent.js (tabbed navigation)
│   ├── CostSummary.js (Tab 1)
│   ├── AWSCosts.js (Tab 2)
│   ├── AWSCosts.css
│   ├── DBxCosts.js (Tab 3)
│   ├── DBxCosts.css
│   ├── TDPCostsTable.js (TDP costs table component)
│   └── TDPCostsTable.css
```

## State Management
- **App.js**: Manages `tenantType` state ('ST' or 'MT')
- **Props flow**: App → DashboardHeader (for toggle) and DashboardContent → all tab components
- **Default**: ST (Single-Tenant)

## Sample Data Requirements
- **AWS**: 6 months of data (Apr 2025 - Sep 2025)
- **DBx**: 13 months of data (Dec 2024 - Dec 2025)
- **TDP Table**: 3 months of data (Mar, Apr, May 2025)
- All costs in USD
- Realistic values with variation across months

## Data Specifications

### TDP Costs Table - Complete Column List

#### Columns Shown in BOTH ST and MT Views

**Month Column** (Fixed Left):
- Month (e.g., "May 2025", "Apr 2025", "Mar 2025")

**Data Ingestion Metrics**:
- Data Ingested (RAW) (GB)
- Data Ingested (RAW) (TB)
- Data Ingested YTD (RAW) (GB)
- Data Ingested YTD (RAW) (TB)
- Files Ingested (RAW) (Count)
- Files Ingested YTD (RAW) (Count)
- Average File Size (RAW) (MB)

**Storage Metrics**:
- Files Stored [Datalake] (Count)
- Data Stored [Datalake] (GB)
- Data Stored [Datalake] (TB)
- Storage Cost [Datalake] (USD)
- Data Stored [Athena] (GB)
- Storage Cost [Athena] (USD)

**Cost Metrics (Shown in Both)**:
- ECS Processing Cost (USD) - **Compute/Data Processing Fee**
- Athena Data Access Cost (USD) - **Access/Data Processing Fee**

**Total Column** (Fixed Right):
- Total Monthly Cost (USD)

#### Columns Shown ONLY in ST View (Excluded from MT)

**Platform Fee Costs** (NOT pass-through for MT customers):
- ECS Data Apps Cost (USD)
- ECS Connectors Cost (USD)
- Data Apps Streaming Cost (USD)
- EC2 Cost (USD)
- Databricks Cost (USD)
- Snowflake Cost (USD)

**Summary**:
- **ST View**: 24 total columns (Month + 22 data columns + Total)
- **MT View**: 18 total columns (Month + 16 data columns + Total)
- **Difference**: 6 platform fee columns excluded in MT view

### AWS Costs Table - Service Breakdown

#### ST View - All Services (10 services)
| Service Name | Category | Shown in MT? |
|--------------|----------|--------------|
| Glue | Data Processing | ❌ No |
| Elastic Container Service | Compute | ✅ Yes |
| Relational Database Service | Database | ❌ No |
| OpenSearch Service | Search/Analytics | ❌ No |
| CloudWatch | Monitoring | ❌ No |
| S3 | Storage | ✅ Yes |
| EC2-Instances | Compute | ❌ No |
| Kinesis | Streaming | ❌ No |
| VPC | Networking | ❌ No |
| Others | Miscellaneous | ❌ No |

#### MT View - Filtered Services (2 services only)
| Service Name | Category | Reason |
|--------------|----------|--------|
| Elastic Container Service | Compute | Data Processing Fee (ECS) |
| S3 | Storage | Data Processing Fee (Storage) |

**Table Structure**:
- **Rows**: Months (Apr 2025 - Sep 2025)
- **Columns**:
  - ST: Month + 10 service columns + Total Costs = 12 columns
  - MT: Month + 2 service columns + Total Costs = 4 columns

### DBx Costs Table - Service Breakdown

#### ST View - All Services (15 services)
| Service Type | Category | Shown in MT? |
|--------------|----------|--------------|
| ALL_PURPOSE | Compute | ✅ Yes |
| MODEL_SERVING | ML/AI | ❌ No |
| JOBS | Compute | ✅ Yes |
| VECTOR_SEARCH | Search | ❌ No |
| SQL | Compute/Analytics | ✅ Yes |
| APPS | Applications | ❌ No |
| INTERACTIVE | Compute | ❌ No |
| NETWORKING | Networking | ❌ No |
| PREDICTIVE_OPTIMIZATION | Optimization | ❌ No |
| STORAGE | Storage | ✅ Yes |
| DLT | Data Pipeline | ❌ No |
| ONLINE_TABLES | Database | ❌ No |
| AGENT_EVALUATION | ML/AI | ❌ No |
| DEFAULT_STORAGE | Storage | ❌ No |
| ALL_ANYWAY | Miscellaneous | ❌ No |

#### MT View - Filtered Services (4 services only)
| Service Type | Category | Reason |
|--------------|----------|--------|
| JOBS | Compute | Data Processing Fee (Compute) |
| ALL_PURPOSE | Compute | Data Processing Fee (Compute) |
| SQL | Compute/Analytics | Data Processing Fee (Compute) |
| STORAGE | Storage | Data Processing Fee (Storage) |

**Table Structure**:
- **Rows**: Months (12 months, format YYYY-MM)
- **Columns**:
  - ST: Month + 15 service columns + Total Costs = 17 columns
  - MT: Month + 4 service columns + Total Costs = 6 columns

### Data Filtering Summary by Tenant Type

#### Single-Tenant (ST) - Show Everything
- **TDP Table**: 24 columns (all metrics and costs)
- **AWS Table**: 12 columns (10 services + month + total)
- **DBx Table**: 17 columns (15 services + month + total)
- **AWS Chart**: 10 stacked bars per month
- **DBx Chart**: 15 stacked bars per month
- **Total Service Count**: 53 (38 AWS + 15 DBx)

#### Multi-Tenant (MT) - Show Only Data Processing Fees
- **TDP Table**: 18 columns (exclude 6 platform fee costs)
- **AWS Table**: 4 columns (2 services + month + total)
- **DBx Table**: 6 columns (4 services + month + total)
- **AWS Chart**: 2 stacked bars per month
- **DBx Chart**: 4 stacked bars per month
- **Total Service Count**: 6 (2 AWS + 4 DBx)

### Cost Categories Explained

#### Data Processing Fees (Pass-through for MT)
**Compute**:
- AWS: Elastic Container Service (ECS Processing)
- DBx: JOBS, ALL_PURPOSE, SQL

**Storage**:
- AWS: S3 (Datalake Storage)
- Athena Storage

**Access**:
- Athena Data Access Cost

#### Platform Fees (NOT shown in MT view)
**Application Services**:
- ECS Data Apps Cost
- ECS Connectors Cost
- Data Apps Streaming Cost

**Infrastructure**:
- EC2 Cost

**Third-Party Platforms**:
- Databricks Cost (except JOBS, ALL_PURPOSE, SQL, STORAGE)
- Snowflake Cost

**Other DBx Services**:
- MODEL_SERVING, VECTOR_SEARCH, APPS, INTERACTIVE, NETWORKING, PREDICTIVE_OPTIMIZATION, DLT, ONLINE_TABLES, AGENT_EVALUATION, DEFAULT_STORAGE, ALL_ANYWAY

## Testing Scenarios
1. Toggle between ST and MT - verify all charts/tables update
2. Verify MT view shows only allowed services
3. Verify totals and averages recalculate correctly
4. Verify table column filtering works
5. Verify all charts render without errors
6. Test responsive behavior at different screen sizes

