import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SlackConfiguration from './components/SlackConfiguration';
import NotionConfiguration from './components/NotionConfiguration';
import IntegrationStatus from './components/IntegrationStatus';
import APIKeyManagement from './components/APIKeyManagement';

const IntegrationSettings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [integrations, setIntegrations] = useState([
    {
      name: 'Slack',
      status: 'connected',
      description: 'Real-time notifications',
      lastActivity: '2 min ago',
      messageCount: '247',
      errorMessage: null
    },
    {
      name: 'Notion',
      status: 'connected',
      description: 'Automated documentation',
      lastActivity: '15 min ago',
      messageCount: '89',
      errorMessage: null
    }
  ]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'slack', label: 'Slack', icon: 'MessageSquare' },
    { id: 'notion', label: 'Notion', icon: 'FileText' },
    { id: 'api-keys', label: 'API Keys', icon: 'Key' }
  ];

  const handleConnect = (service) => {
    setIntegrations(prev => prev.map(integration => 
      integration.name.toLowerCase() === service 
        ? { ...integration, status: 'connected' }
        : integration
    ));
  };

  const handleDisconnect = (service) => {
    setIntegrations(prev => prev.map(integration => 
      integration.name.toLowerCase() === service 
        ? { ...integration, status: 'disconnected' }
        : integration
    ));
  };

  const handleRefresh = () => {
    // Simulate refresh
    console.log('Refreshing integration status...');
  };

  const getIntegrationStatus = (service) => {
    const integration = integrations.find(i => i.name.toLowerCase() === service);
    return integration ? integration.status === 'connected' : false;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <IntegrationStatus 
            integrations={integrations}
            onRefresh={handleRefresh}
          />
        );
      case 'slack':
        return (
          <SlackConfiguration
            isConnected={getIntegrationStatus('slack')}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
          />
        );
      case 'notion':
        return (
          <NotionConfiguration
            isConnected={getIntegrationStatus('notion')}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
          />
        );
      case 'api-keys':
        return <APIKeyManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <main className="lg:ml-64 pt-16">
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Integration Settings</h1>
                <p className="text-muted-foreground mt-2">
                  Configure Slack and Notion integrations for automated competitive intelligence delivery
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Icon name="Menu" size={20} />
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                      transition-colors duration-200
                      ${activeTab === tab.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                      }
                    `}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default IntegrationSettings;