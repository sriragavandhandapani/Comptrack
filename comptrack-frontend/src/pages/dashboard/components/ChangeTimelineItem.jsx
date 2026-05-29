import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ChangeTimelineItem = ({ change, onViewDetails, onShare }) => {
  const getChangeTypeColor = (type) => {
    switch (type) {
      case 'UI': return 'bg-accent text-accent-foreground';
      case 'Pricing': return 'bg-warning text-warning-foreground';
      case 'Features': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'text-error';
      case 'Medium': return 'text-warning';
      case 'Low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <Image 
            src={change.companyLogo} 
            alt={`${change.companyName} logo`}
            className="w-10 h-10 rounded-lg object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <h4 className="text-sm font-medium text-foreground">{change.companyName}</h4>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getChangeTypeColor(change.type)}`}>
                {change.type}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{formatTimeAgo(change.timestamp)}</span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{change.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icon name="AlertTriangle" size={14} className={getImpactColor(change.impact)} />
                <span className={`text-xs font-medium ${getImpactColor(change.impact)}`}>
                  {change.impact} Impact
                </span>
              </div>
              {change.hasScreenshot && (
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Icon name="Image" size={14} />
                  <span className="text-xs">Screenshot</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="xs"
                iconName="Share"
                iconSize={14}
                onClick={() => onShare(change)}
              >
                Share
              </Button>
              <Button
                variant="outline"
                size="xs"
                onClick={() => onViewDetails(change)}
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeTimelineItem;