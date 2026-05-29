import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportTimeline = ({ 
  selectedWeek, 
  onWeekChange, 
  availableWeeks, 
  onExportAll,
  onGenerateReport 
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const getCurrentWeekIndex = () => {
    return availableWeeks.findIndex(week => week.id === selectedWeek);
  };

  const canGoNext = () => {
    return getCurrentWeekIndex() < availableWeeks.length - 1;
  };

  const canGoPrevious = () => {
    return getCurrentWeekIndex() > 0;
  };

  const handleNext = () => {
    if (canGoNext()) {
      const currentIndex = getCurrentWeekIndex();
      onWeekChange(availableWeeks[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    if (canGoPrevious()) {
      const currentIndex = getCurrentWeekIndex();
      onWeekChange(availableWeeks[currentIndex - 1].id);
    }
  };

  const selectedWeekData = availableWeeks.find(week => week.id === selectedWeek);

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Timeline Navigation */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              disabled={!canGoPrevious()}
              className="h-8 w-8"
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="min-w-[200px] justify-between"
              >
                <span className="font-medium">
                  {selectedWeekData ? selectedWeekData.label : 'Select Week'}
                </span>
                <Icon name="Calendar" size={16} />
              </Button>

              {/* Week Selector Dropdown */}
              {showDatePicker && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-modal z-[1010] max-h-64 overflow-y-auto">
                  <div className="p-2">
                    <div className="text-xs font-medium text-muted-foreground p-2 border-b border-border">
                      Available Reports
                    </div>
                    {availableWeeks.map((week) => (
                      <button
                        key={week.id}
                        onClick={() => {
                          onWeekChange(week.id);
                          setShowDatePicker(false);
                        }}
                        className={`w-full text-left p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200 ${
                          week.id === selectedWeek ? 'bg-primary/10 text-primary' : 'text-foreground'
                        }`}
                      >
                        <div className="font-medium text-sm">{week.label}</div>
                        <div className="text-xs text-muted-foreground">{week.dateRange}</div>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {week.changesCount} changes
                          </span>
                          <div className={`px-2 py-0.5 rounded text-xs ${
                            week.status === 'completed' ? 'bg-success/10 text-success' :
                            week.status === 'processing'? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
                          }`}>
                            {week.status}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              disabled={!canGoNext()}
              className="h-8 w-8"
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>

          {/* Week Info */}
          {selectedWeekData && (
            <div className="hidden md:flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={14} />
                <span>{selectedWeekData.dateRange}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Activity" size={14} />
                <span>{selectedWeekData.changesCount} changes</span>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onGenerateReport}
          >
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Generate New
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onExportAll}
          >
            <Icon name="Download" size={16} className="mr-2" />
            Export All
          </Button>

          <div className="relative group">
            <Button
              variant="ghost"
              size="icon"
            >
              <Icon name="Share2" size={16} />
            </Button>
            
            {/* Share Dropdown */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-modal z-[1010] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="p-2">
                <button className="w-full text-left p-2 rounded hover:bg-muted/50 transition-colors duration-200 flex items-center space-x-2">
                  <Icon name="MessageSquare" size={14} />
                  <span className="text-sm">Share to Slack</span>
                </button>
                <button className="w-full text-left p-2 rounded hover:bg-muted/50 transition-colors duration-200 flex items-center space-x-2">
                  <Icon name="FileText" size={14} />
                  <span className="text-sm">Send to Notion</span>
                </button>
                <button className="w-full text-left p-2 rounded hover:bg-muted/50 transition-colors duration-200 flex items-center space-x-2">
                  <Icon name="Mail" size={14} />
                  <span className="text-sm">Email Report</span>
                </button>
                <button className="w-full text-left p-2 rounded hover:bg-muted/50 transition-colors duration-200 flex items-center space-x-2">
                  <Icon name="Link" size={14} />
                  <span className="text-sm">Copy Link</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Week Info */}
      {selectedWeekData && (
        <div className="md:hidden flex items-center justify-between mt-3 pt-3 border-t border-border text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={14} />
            <span>{selectedWeekData.dateRange}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Activity" size={14} />
            <span>{selectedWeekData.changesCount} changes</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportTimeline;