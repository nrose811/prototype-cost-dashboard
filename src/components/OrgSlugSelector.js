import React from 'react';
import { Select } from 'antd';
import { stCustomers, mtCustomers, chCustomers } from './mockData';

const CUSTOMER_MAP = { ST: stCustomers, MT: mtCustomers, CH: chCustomers };

const OrgSlugSelector = ({ tenantType, selectedCustomer, selectedOrgSlug, onOrgSlugChange }) => {
  const customers = CUSTOMER_MAP[tenantType] || stCustomers;
  const customer = customers.find(c => c.id === selectedCustomer);
  const slugs = customer?.orgSlugs || [];

  const options = slugs.map(slug => ({
    value: slug,
    label: slug,
  }));

  return (
    <div className="filter-group">
      <div className="filter-label">Org Slug</div>
      <Select
        value={selectedOrgSlug}
        onChange={onOrgSlugChange}
        options={options}
        showSearch
        optionFilterProp="label"
        style={{ width: '100%' }}
        size="small"
      />
    </div>
  );
};

export default OrgSlugSelector;
