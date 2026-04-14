import React from 'react';
import { Select } from 'antd';
import { stCustomers, mtCustomers } from './mockData';

const CustomerSelector = ({ tenantType, selectedCustomer, onCustomerChange }) => {
  const customers = tenantType === 'ST' ? stCustomers : mtCustomers;

  const options = customers.map(c => ({
    value: c.id,
    label: c.name,
  }));

  return (
    <div className="filter-group">
      <div className="filter-label">Client</div>
      <Select
        value={selectedCustomer}
        onChange={onCustomerChange}
        options={options}
        showSearch
        optionFilterProp="label"
        style={{ width: '100%' }}
        size="small"
      />
    </div>
  );
};

export default CustomerSelector;
