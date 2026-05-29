import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportScheduleCard = ({ reports, onViewAll }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ready': return 'text-success';
      case 'processing': return 'text-warning';
      case 'scheduled': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ready': return 'CheckCircle';
      case 'processing': return 'Clock';
      case 'scheduled': return 'Calendar';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Upcoming Reports</h3>
        <Button variant="ghost" size="sm" onClick={onViewAll}>
          View All
        </Button>
      </div>
      
      <div className="space-y-3">
        {reports.map((report) => (
          <div key={report.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon 
                name={getStatusIcon(report.status)} 
                size={16} 
                className={getStatusColor(report.status)} 
              />
              <div>
                <p className="text-sm font-medium text-foreground">{report.title}</p>
                <p className="text-xs text-muted-foreground">{formatDate(report.dueDate)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-xs font-medium capitalize ${getStatusColor(report.status)}`}>
                {report.status}
              </p>
              {report.competitorCount && (
                <p className="text-xs text-muted-foreground">{report.competitorCount} competitors</p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {reports.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Calendar" size={32} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No upcoming reports</p>
        </div>
      )}
    </div>
  );
};

export default ReportScheduleCard;