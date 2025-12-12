import React, { useState } from 'react';
import { Layout } from 'antd';
import './App.css';
import DashboardHeader from './components/DashboardHeader';
import DashboardContent from './components/DashboardContent';

const { Header, Content } = Layout;

function App() {
  const [tenantType, setTenantType] = useState('ST'); // 'ST' for Single-Tenant, 'MT' for Multi-Tenant

  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <DashboardHeader tenantType={tenantType} setTenantType={setTenantType} />
      </Header>
      <Content className="app-content">
        <DashboardContent tenantType={tenantType} />
      </Content>
    </Layout>
  );
}

export default App;
