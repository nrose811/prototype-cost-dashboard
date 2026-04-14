import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const DateRangePicker = ({ dateRange, onDateRangeChange }) => {
  const handleChange = (dates) => {
    if (dates && dates[0] && dates[1]) {
      onDateRangeChange([
        dates[0].format('YYYY-MM'),
        dates[1].format('YYYY-MM'),
      ]);
    }
  };

  const value = dateRange
    ? [dayjs(dateRange[0], 'YYYY-MM'), dayjs(dateRange[1], 'YYYY-MM')]
    : null;

  return (
    <div className="filter-group">
      <div className="filter-label">Date Range</div>
      <RangePicker
        picker="month"
        value={value}
        onChange={handleChange}
        format="MMM YYYY"
        style={{ width: '100%' }}
        size="small"
        allowClear={false}
      />
    </div>
  );
};

export default DateRangePicker;
