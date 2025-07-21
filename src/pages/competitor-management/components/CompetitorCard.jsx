import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CompetitorCard = ({ competitor, onEdit, onViewChanges, onToggleStatus, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'paused':
        return 'bg-warning text-warning-foreground';
      case 'error':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return 'CheckCircle';
      case 'paused':
        return 'Pause';
      case 'error':
        return 'AlertCircle';
      default:
        return 'Clock';
    }
  };

  const formatLastScan = (timestamp) => {
    const now = new Date();
    const scanTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - scanTime) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-200 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
            <Image
              src={competitor.logo}
              alt={`${competitor.name} logo`}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg">{competitor.name}</h3>
            <p className="text-sm text-muted-foreground">{competitor.industry}</p>
          </div>
        </div>
        
        {/* Actions Menu */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <Icon name="MoreVertical" size={16} />
          </Button>
          
          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-modal z-10">
              <div className="p-1">
                <button
                  onClick={() => {
                    onEdit(competitor);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md flex items-center"
                >
                  <Icon name="Edit" size={16} className="mr-2" />
                  Edit Settings
                </button>
                <button
                  onClick={() => {
                    onViewChanges(competitor);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md flex items-center"
                >
                  <Icon name="History" size={16} className="mr-2" />
                  View Changes
                </button>
                <button
                  onClick={() => {
                    onToggleStatus(competitor);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md flex items-center"
                >
                  <Icon name={competitor.status === 'active' ? 'Pause' : 'Play'} size={16} className="mr-2" />
                  {competitor.status === 'active' ? 'Pause Tracking' : 'Resume Tracking'}
                </button>
                <div className="border-t border-border my-1" />
                <button
                  onClick={() => {
                    onDelete(competitor);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-error hover:bg-error/10 rounded-md flex items-center"
                >
                  <Icon name="Trash2" size={16} className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(competitor.status)}`}>
          <Icon name={getStatusIcon(competitor.status)} size={12} className="mr-1" />
          {competitor.status.charAt(0).toUpperCase() + competitor.status.slice(1)}
        </div>
        <div className="text-xs text-muted-foreground">
          Last scan: {formatLastScan(competitor.lastScan)}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{competitor.changesCount}</div>
          <div className="text-xs text-muted-foreground">Changes</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{competitor.trackedUrls}</div>
          <div className="text-xs text-muted-foreground">URLs</div>
        </div>
      </div>

      {/* Recent Changes */}
      {competitor.recentChanges && competitor.recentChanges.length > 0 && (
        <div className="border-t border-border pt-4">
          <div className="text-xs text-muted-foreground mb-2">Recent Changes</div>
          <div className="space-y-1">
            {competitor.recentChanges.slice(0, 2).map((change, index) => (
              <div key={index} className="flex items-center text-xs">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  change.type === 'feature' ? 'bg-success' :
                  change.type === 'pricing' ? 'bg-warning' : 'bg-accent'
                }`} />
                <span className="text-muted-foreground truncate">{change.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex space-x-2 mt-4 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewChanges(competitor)}
          className="flex-1"
        >
          <Icon name="TrendingUp" size={14} className="mr-1" />
          View Changes
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(competitor)}
        >
          <Icon name="Settings" size={14} />
        </Button>
      </div>
    </div>
  );
};

export default CompetitorCard;