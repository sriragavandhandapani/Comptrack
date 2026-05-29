import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SlackConfiguration = ({ isConnected, onConnect, onDisconnect }) => {
  const [webhookUrl, setWebhookUrl] = useState('https://hooks.slack.com/services/T1234567890/B1234567890/abcdefghijklmnopqrstuvwx');
  const [selectedWorkspace, setSelectedWorkspace] = useState('acme-corp');
  const [selectedChannel, setSelectedChannel] = useState('#competitive-intel');
  const [messageFormat, setMessageFormat] = useState('detailed');
  const [frequency, setFrequency] = useState('immediate');
  const [impactFilter, setImpactFilter] = useState(['high', 'medium']);
  const [customKeywords, setCustomKeywords] = useState('pricing, feature, launch, update');
  const [isTestingMessage, setIsTestingMessage] = useState(false);

  const workspaceOptions = [
    { value: 'acme-corp', label: 'Acme Corp Workspace' },
    { value: 'product-team', label: 'Product Team Workspace' },
    { value: 'marketing-hub', label: 'Marketing Hub Workspace' }
  ];

  const channelOptions = [
    { value: '#competitive-intel', label: '#competitive-intel' },
    { value: '#product-updates', label: '#product-updates' },
    { value: '#general', label: '#general' },
    { value: '#alerts', label: '#alerts' }
  ];

  const formatOptions = [
    { value: 'detailed', label: 'Detailed Format' },
    { value: 'summary', label: 'Summary Format' },
    { value: 'minimal', label: 'Minimal Format' }
  ];

  const frequencyOptions = [
    { value: 'immediate', label: 'Immediate Alerts' },
    { value: 'daily', label: 'Daily Digest' },
    { value: 'weekly', label: 'Weekly Summary' }
  ];

  const handleTestMessage = async () => {
    setIsTestingMessage(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsTestingMessage(false);
    alert('Test message sent successfully to ' + selectedChannel);
  };

  const handleConnect = () => {
    onConnect('slack');
  };

  const handleDisconnect = () => {
    onDisconnect('slack');
  };

  const sampleMessage = `🎯 **Competitor Update Detected**

**Competitor:** Figma
**Change Type:** New Feature
**Impact Level:** High
**Detected:** ${new Date().toLocaleDateString()}

**Summary:**
Figma has launched a new AI-powered design assistant that automatically suggests layout improvements and generates design variations.

**Key Changes:**
• New "AI Assistant" panel in the design interface
• Automatic layout optimization suggestions
• Design variation generator with 5+ style options
• Integration with existing component libraries

**Impact Analysis:**
This feature directly competes with our upcoming design automation tools. Recommend accelerating our AI roadmap timeline.

**View Details:** [Link to full report]
**Competitor Profile:** [Link to Figma tracking]`;

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#4A154B] rounded-lg flex items-center justify-center">
              <Icon name="MessageSquare" size={20} color="white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Slack Integration</h3>
              <p className="text-sm text-muted-foreground">
                {isConnected ? 'Connected and active' : 'Not connected'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-success' : 'bg-muted-foreground'}`} />
            <span className={`text-sm font-medium ${isConnected ? 'text-success' : 'text-muted-foreground'}`}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>

        {isConnected && (
          <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-4">
            <div className="flex items-start space-x-3">
              <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
              <div>
                <p className="text-sm font-medium text-success">Integration Active</p>
                <p className="text-sm text-success/80 mt-1">
                  Last message sent: Today at 2:45 PM to {selectedChannel}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex space-x-3">
          {!isConnected ? (
            <Button variant="default" onClick={handleConnect}>
              <Icon name="Link" size={16} className="mr-2" />
              Connect Slack
            </Button>
          ) : (
            <Button variant="outline" onClick={handleDisconnect}>
              <Icon name="Unlink" size={16} className="mr-2" />
              Disconnect
            </Button>
          )}
          {isConnected && (
            <Button 
              variant="secondary" 
              onClick={handleTestMessage}
              loading={isTestingMessage}
            >
              <Icon name="Send" size={16} className="mr-2" />
              Send Test Message
            </Button>
          )}
        </div>
      </div>

      {/* Configuration Form */}
      {isConnected && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Settings Panel */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="text-lg font-semibold text-foreground mb-4">Connection Settings</h4>
              
              <div className="space-y-4">
                <Select
                  label="Workspace"
                  options={workspaceOptions}
                  value={selectedWorkspace}
                  onChange={setSelectedWorkspace}
                />

                <Select
                  label="Channel"
                  options={channelOptions}
                  value={selectedChannel}
                  onChange={setSelectedChannel}
                  searchable
                />

                <Input
                  label="Webhook URL"
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  description="Your Slack webhook URL for sending messages"
                />
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="text-lg font-semibold text-foreground mb-4">Message Configuration</h4>
              
              <div className="space-y-4">
                <Select
                  label="Message Format"
                  options={formatOptions}
                  value={messageFormat}
                  onChange={setMessageFormat}
                />

                <Select
                  label="Notification Frequency"
                  options={frequencyOptions}
                  value={frequency}
                  onChange={setFrequency}
                />

                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    Impact Level Filter
                  </label>
                  <div className="space-y-2">
                    <Checkbox
                      label="High Impact Changes"
                      checked={impactFilter.includes('high')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setImpactFilter([...impactFilter, 'high']);
                        } else {
                          setImpactFilter(impactFilter.filter(level => level !== 'high'));
                        }
                      }}
                    />
                    <Checkbox
                      label="Medium Impact Changes"
                      checked={impactFilter.includes('medium')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setImpactFilter([...impactFilter, 'medium']);
                        } else {
                          setImpactFilter(impactFilter.filter(level => level !== 'medium'));
                        }
                      }}
                    />
                    <Checkbox
                      label="Low Impact Changes"
                      checked={impactFilter.includes('low')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setImpactFilter([...impactFilter, 'low']);
                        } else {
                          setImpactFilter(impactFilter.filter(level => level !== 'low'));
                        }
                      }}
                    />
                  </div>
                </div>

                <Input
                  label="Custom Alert Keywords"
                  type="text"
                  value={customKeywords}
                  onChange={(e) => setCustomKeywords(e.target.value)}
                  description="Comma-separated keywords to trigger alerts"
                  placeholder="pricing, feature, launch, update"
                />
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="text-lg font-semibold text-foreground mb-4">Message Preview</h4>
              
              <div className="bg-[#1a1d29] rounded-lg p-4 border border-gray-700">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-6 h-6 bg-[#4A154B] rounded flex items-center justify-center">
                    <Icon name="Bot" size={12} color="white" />
                  </div>
                  <span className="text-white text-sm font-medium">Competitor Tracker</span>
                  <span className="text-gray-400 text-xs">APP</span>
                  <span className="text-gray-400 text-xs">Today at 2:45 PM</span>
                </div>
                
                <div className="bg-[#2f3349] rounded-lg p-4 border-l-4 border-[#4A154B]">
                  <pre className="text-gray-200 text-xs whitespace-pre-wrap font-mono leading-relaxed">
                    {sampleMessage}
                  </pre>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  This preview shows how your messages will appear in Slack. 
                  The format will adjust based on your selected message format setting.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlackConfiguration;