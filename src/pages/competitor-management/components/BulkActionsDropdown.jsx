import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsDropdown = ({ selectedCompetitors, onBulkAction }) => {
  const [isOpen, setIsOpen] = useState(false);

  const bulkActions = [
    {
      id: 'pause',
      label: 'Pause Tracking',
      icon: 'Pause',
      description: 'Temporarily stop monitoring selected competitors'
    },
    {
      id: 'resume',
      label: 'Resume Tracking',
      icon: 'Play',
      description: 'Resume monitoring for selected competitors'
    },
    {
      id: 'scan',
      label: 'Force Scan',
      icon: 'RefreshCw',
      description: 'Immediately scan selected competitors for changes'
    },
    {
      id: 'export',
      label: 'Export Data',
      icon: 'Download',
      description: 'Download competitor data and changes'
    },
    {
      id: 'group',
      label: 'Add to Group',
      icon: 'FolderPlus',
      description: 'Organize competitors into groups'
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: 'Trash2',
      description: 'Permanently remove selected competitors',
      destructive: true
    }
  ];

  const handleAction = (actionId) => {
    onBulkAction(actionId, selectedCompetitors);
    setIsOpen(false);
  };

  if (selectedCompetitors.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="min-w-[140px]"
      >
        <Icon name="MoreHorizontal" size={16} className="mr-2" />
        Bulk Actions
        <Icon name="ChevronDown" size={16} className="ml-2" />
      </Button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-[1010]"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-1 w-64 bg-popover border border-border rounded-lg shadow-modal z-[1020]">
            <div className="p-2 border-b border-border">
              <div className="text-sm font-medium text-popover-foreground">
                {selectedCompetitors.length} competitor{selectedCompetitors.length !== 1 ? 's' : ''} selected
              </div>
            </div>
            
            <div className="p-1">
              {bulkActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleAction(action.id)}
                  className={`
                    w-full text-left px-3 py-2 rounded-md text-sm transition-colors
                    ${action.destructive 
                      ? 'text-error hover:bg-error/10' :'text-popover-foreground hover:bg-muted'
                    }
                  `}
                >
                  <div className="flex items-start space-x-3">
                    <Icon 
                      name={action.icon} 
                      size={16} 
                      className={`mt-0.5 flex-shrink-0 ${action.destructive ? 'text-error' : ''}`} 
                    />
                    <div>
                      <div className="font-medium">{action.label}</div>
                      <div className={`text-xs ${action.destructive ? 'text-error/70' : 'text-muted-foreground'}`}>
                        {action.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BulkActionsDropdown;