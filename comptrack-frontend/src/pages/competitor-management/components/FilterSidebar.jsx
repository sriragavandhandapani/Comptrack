import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const FilterSidebar = ({ isOpen, onClose, filters, onFiltersChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const statusOptions = [
    { value: 'active', label: 'Active', count: 12 },
    { value: 'paused', label: 'Paused', count: 3 },
    { value: 'error', label: 'Error', count: 1 }
  ];

  const industryOptions = [
    { value: 'saas', label: 'SaaS & Software', count: 8 },
    { value: 'ecommerce', label: 'E-commerce', count: 4 },
    { value: 'fintech', label: 'FinTech', count: 2 },
    { value: 'healthcare', label: 'Healthcare', count: 1 },
    { value: 'education', label: 'Education', count: 1 }
  ];

  const activityOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'older', label: 'Older' }
  ];

  const changeFrequencyOptions = [
    { value: 'high', label: 'High (10+ changes/week)' },
    { value: 'medium', label: 'Medium (3-10 changes/week)' },
    { value: 'low', label: 'Low (&lt;3 changes/week)' }
  ];

  const handleFilterChange = (category, value, checked) => {
    setLocalFilters(prev => ({
      ...prev,
      [category]: checked 
        ? [...(prev[category] || []), value]
        : (prev[category] || []).filter(item => item !== value)
    }));
  };

  const handleSelectChange = (category, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const clearFilters = () => {
    const clearedFilters = {
      status: [],
      industry: [],
      lastActivity: '',
      changeFrequency: ''
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return (localFilters.status?.length || 0) + 
           (localFilters.industry?.length || 0) + 
           (localFilters.lastActivity ? 1 : 0) + 
           (localFilters.changeFrequency ? 1 : 0);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[1020] lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-16 left-64 h-[calc(100vh-4rem)] w-80 bg-card border-r border-border z-[1020] lg:z-[1000]
        transform transition-transform duration-300 ease-in-out lg:relative lg:top-0 lg:left-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <Icon name="Filter" size={20} />
              <h3 className="font-semibold text-foreground">Filters</h3>
              {getActiveFilterCount() > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  {getActiveFilterCount()}
                </span>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Filters Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Status Filter */}
            <div>
              <h4 className="font-medium text-foreground mb-3">Status</h4>
              <div className="space-y-2">
                {statusOptions.map((option) => (
                  <div key={option.value} className="flex items-center justify-between">
                    <Checkbox
                      label={option.label}
                      checked={localFilters.status?.includes(option.value) || false}
                      onChange={(e) => handleFilterChange('status', option.value, e.target.checked)}
                    />
                    <span className="text-xs text-muted-foreground">{option.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Industry Filter */}
            <div>
              <h4 className="font-medium text-foreground mb-3">Industry</h4>
              <div className="space-y-2">
                {industryOptions.map((option) => (
                  <div key={option.value} className="flex items-center justify-between">
                    <Checkbox
                      label={option.label}
                      checked={localFilters.industry?.includes(option.value) || false}
                      onChange={(e) => handleFilterChange('industry', option.value, e.target.checked)}
                    />
                    <span className="text-xs text-muted-foreground">{option.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Last Activity Filter */}
            <div>
              <Select
                label="Last Activity"
                placeholder="Select time range"
                options={activityOptions}
                value={localFilters.lastActivity || ''}
                onChange={(value) => handleSelectChange('lastActivity', value)}
                clearable
              />
            </div>

            {/* Change Frequency Filter */}
            <div>
              <Select
                label="Change Frequency"
                placeholder="Select frequency"
                options={changeFrequencyOptions}
                value={localFilters.changeFrequency || ''}
                onChange={(value) => handleSelectChange('changeFrequency', value)}
                clearable
              />
            </div>

            {/* Quick Filters */}
            <div>
              <h4 className="font-medium text-foreground mb-3">Quick Filters</h4>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  className="justify-start"
                  onClick={() => handleSelectChange('lastActivity', 'today')}
                >
                  <Icon name="Clock" size={16} className="mr-2" />
                  Active Today
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  className="justify-start"
                  onClick={() => handleFilterChange('status', 'error', true)}
                >
                  <Icon name="AlertTriangle" size={16} className="mr-2" />
                  Needs Attention
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  className="justify-start"
                  onClick={() => handleSelectChange('changeFrequency', 'high')}
                >
                  <Icon name="TrendingUp" size={16} className="mr-2" />
                  High Activity
                </Button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border space-y-2">
            <Button
              onClick={applyFilters}
              fullWidth
              disabled={getActiveFilterCount() === 0}
            >
              Apply Filters
            </Button>
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              onClick={clearFilters}
              disabled={getActiveFilterCount() === 0}
            >
              Clear All
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;