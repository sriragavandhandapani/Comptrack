import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IntegrationStatusCard = ({ integrations, onConfigure }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'error': return 'text-error';
      case 'warning': return 'text-warning';
      case 'disconnected': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return 'CheckCircle';
      case 'error': return 'XCircle';
      case 'warning': return 'AlertTriangle';
      case 'disconnected': return 'Circle';
      default: return 'Circle';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'connected': return 'Connected';
      case 'error': return 'Error';
      case 'warning': return 'Issues';
      case 'disconnected': return 'Not Connected';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Integration Health</h3>
        <Button variant="ghost" size="sm" onClick={onConfigure}>
          Configure
        </Button>
      </div>
      
      <div className="space-y-4">
        {integrations.map((integration) => (
          <div key={integration.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                <Icon name={integration.icon} size={16} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{integration.name}</p>
                <p className="text-xs text-muted-foreground">{integration.description}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon 
                name={getStatusIcon(integration.status)} 
                size={16} 
                className={getStatusColor(integration.status)} 
              />
              <span className={`text-xs font-medium ${getStatusColor(integration.status)}`}>
                {getStatusText(integration.status)}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last sync: 2 minutes ago</span>
          <span>Next sync: in 28 minutes</span>
        </div>
      </div>
    </div>
  );
};

export default IntegrationStatusCard;