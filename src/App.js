import React from 'react';
import { Layout } from 'antd';
import './App.css';
import DashboardHeader from './components/DashboardHeader';
import DashboardContent from './components/DashboardContent';

const { Header, Content } = Layout;

function App() {
  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <DashboardHeader />
      </Header>
      <Content className="app-content">
        <DashboardContent />
      </Content>
    </Layout>
  );
}

export default App;
