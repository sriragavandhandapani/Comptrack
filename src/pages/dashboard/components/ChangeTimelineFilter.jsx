import React from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ChangeTimelineFilter = ({ 
  activeFilter, 
  onFilterChange, 
  timeRange, 
  onTimeRangeChange,
  sortBy,
  onSortChange 
}) => {
  const filterOptions = [
    { value: 'all', label: 'All Changes' },
    { value: 'UI', label: 'UI Changes' },
    { value: 'Pricing', label: 'Pricing Updates' },
    { value: 'Features', label: 'New Features' }
  ];

  const timeRangeOptions = [
    { value: '24h', label: 'Last 24 hours' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: 'all', label: 'All time' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest first' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'impact', label: 'High impact first' }
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div className="flex flex-wrap items-center gap-2">
        {filterOptions.map((filter) => (
          <Button
            key={filter.value}
            variant={activeFilter === filter.value ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(filter.value)}
          >
            {filter.label}
          </Button>
        ))}
      </div>
      
      <div className="flex items-center gap-3">
        <Select
          options={timeRangeOptions}
          value={timeRange}
          onChange={onTimeRangeChange}
          className="w-40"
        />
        
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={onSortChange}
          className="w-40"
        />
      </div>
    </div>
  );
};

export default ChangeTimelineFilter;