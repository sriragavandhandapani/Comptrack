import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ReportFilters = ({ 
  searchQuery, 
  onSearchChange, 
  selectedCompetitor, 
  onCompetitorChange,
  selectedChangeType,
  onChangeTypeChange,
  selectedImpact,
  onImpactChange,
  onClearFilters,
  competitors 
}) => {
  const changeTypes = [
    { value: 'all', label: 'All Changes' },
    { value: 'ui', label: 'UI Updates' },
    { value: 'pricing', label: 'Pricing Changes' },
    { value: 'features', label: 'New Features' }
  ];

  const impactLevels = [
    { value: 'all', label: 'All Impact Levels' },
    { value: 'high', label: 'High Impact' },
    { value: 'medium', label: 'Medium Impact' },
    { value: 'low', label: 'Low Impact' }
  ];

  const hasActiveFilters = searchQuery || 
    selectedCompetitor !== 'all' || 
    selectedChangeType !== 'all' || 
    selectedImpact !== 'all';

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="search"
              placeholder="Search reports, competitors, or changes..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Competitor Filter */}
          <select
            value={selectedCompetitor}
            onChange={(e) => onCompetitorChange(e.target.value)}
            className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Competitors</option>
            {competitors.map((competitor) => (
              <option key={competitor.id} value={competitor.id}>
                {competitor.name}
              </option>
            ))}
          </select>

          {/* Change Type Filter */}
          <select
            value={selectedChangeType}
            onChange={(e) => onChangeTypeChange(e.target.value)}
            className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {changeTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          {/* Impact Filter */}
          <select
            value={selectedImpact}
            onChange={(e) => onImpactChange(e.target.value)}
            className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {impactLevels.map((impact) => (
              <option key={impact.value} value={impact.value}>
                {impact.label}
              </option>
            ))}
          </select>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={16} className="mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground">Active filters:</span>
          
          {searchQuery && (
            <div className="flex items-center gap-1 px-2 py-1 bg-accent/10 text-accent rounded text-xs">
              <Icon name="Search" size={12} />
              <span>"{searchQuery}"</span>
            </div>
          )}
          
          {selectedCompetitor !== 'all' && (
            <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded text-xs">
              <Icon name="Building" size={12} />
              <span>{competitors.find(c => c.id === selectedCompetitor)?.name}</span>
            </div>
          )}
          
          {selectedChangeType !== 'all' && (
            <div className="flex items-center gap-1 px-2 py-1 bg-secondary/10 text-secondary rounded text-xs">
              <Icon name="Tag" size={12} />
              <span>{changeTypes.find(t => t.value === selectedChangeType)?.label}</span>
            </div>
          )}
          
          {selectedImpact !== 'all' && (
            <div className="flex items-center gap-1 px-2 py-1 bg-warning/10 text-warning rounded text-xs">
              <Icon name="AlertTriangle" size={12} />
              <span>{impactLevels.find(i => i.value === selectedImpact)?.label}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportFilters;