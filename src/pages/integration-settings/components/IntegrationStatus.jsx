import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IntegrationStatus = ({ integrations, onRefresh }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'error': return 'text-error';
      case 'disconnected': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'connected': return 'bg-success/10 border-success/20';
      case 'error': return 'bg-error/10 border-error/20';
      case 'disconnected': return 'bg-muted/10 border-muted/20';
      default: return 'bg-muted/10 border-muted/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return 'CheckCircle';
      case 'error': return 'AlertCircle';
      case 'disconnected': return 'Circle';
      default: return 'Circle';
    }
  };

  const recentActivity = [
    {
      id: 1,
      integration: 'Slack',
      action: 'Message sent to #competitive-intel',
      timestamp: '2 minutes ago',
      status: 'success'
    },
    {
      id: 2,
      integration: 'Notion',
      action: 'Page created: "Figma AI Assistant Analysis"',
      timestamp: '15 minutes ago',
      status: 'success'
    },
    {
      id: 3,
      integration: 'Slack',
      action: 'Daily digest delivered',
      timestamp: '2 hours ago',
      status: 'success'
    },
    {
      id: 4,
      integration: 'Notion',
      action: 'Database updated with 3 new entries',
      timestamp: '4 hours ago',
      status: 'success'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Integration Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Integration Status</h3>
          <Button variant="outline" size="sm" onClick={onRefresh}>
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className={`border rounded-lg p-4 ${getStatusBg(integration.status)}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    integration.name === 'Slack' ? 'bg-[#4A154B]' : 'bg-black'
                  }`}>
                    <Icon 
                      name={integration.name === 'Slack' ? 'MessageSquare' : 'FileText'} 
                      size={16} 
                      color="white" 
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{integration.name}</h4>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  </div>
                </div>
                <Icon 
                  name={getStatusIcon(integration.status)} 
                  size={20} 
                  className={getStatusColor(integration.status)} 
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <span className={`font-medium capitalize ${getStatusColor(integration.status)}`}>
                    {integration.status}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Activity:</span>
                  <span className="text-foreground">{integration.lastActivity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Messages Sent:</span>
                  <span className="text-foreground">{integration.messageCount}</span>
                </div>
              </div>

              {integration.status === 'error' && (
                <div className="mt-3 p-2 bg-error/10 border border-error/20 rounded text-sm text-error">
                  <Icon name="AlertTriangle" size={14} className="inline mr-1" />
                  {integration.errorMessage}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
        
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                activity.integration === 'Slack' ? 'bg-[#4A154B]' : 'bg-black'
              }`}>
                <Icon 
                  name={activity.integration === 'Slack' ? 'MessageSquare' : 'FileText'} 
                  size={14} 
                  color="white" 
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
              </div>
              <Icon name="CheckCircle" size={16} className="text-success" />
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <Button variant="ghost" size="sm">
            View All Activity
            <Icon name="ArrowRight" size={14} className="ml-2" />
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Send" size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">247</p>
              <p className="text-sm text-muted-foreground">Messages Sent</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">89</p>
              <p className="text-sm text-muted-foreground">Pages Created</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">99.8%</p>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationStatus;