import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const APIKeyManagement = () => {
  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      name: 'Slack Webhook',
      service: 'Slack',
      key: 'xoxb-1234567890-1234567890-abcdefghijklmnopqrstuvwx',
      masked: true,
      created: '2025-01-15',
      lastUsed: '2025-01-21',
      status: 'active'
    },
    {
      id: 2,
      name: 'Notion Integration',
      service: 'Notion',
      key: 'secret_abcdefghijklmnopqrstuvwxyz123456789',
      masked: true,
      created: '2025-01-10',
      lastUsed: '2025-01-21',
      status: 'active'
    }
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const maskKey = (key) => {
    if (key.length <= 8) return key;
    return key.substring(0, 4) + '•'.repeat(key.length - 8) + key.substring(key.length - 4);
  };

  const toggleKeyVisibility = (id) => {
    setApiKeys(keys => keys.map(key => 
      key.id === id ? { ...key, masked: !key.masked } : key
    ));
  };

  const regenerateKey = async (id) => {
    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newKey = 'new_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setApiKeys(keys => keys.map(key => 
      key.id === id ? { 
        ...key, 
        key: newKey, 
        created: new Date().toISOString().split('T')[0],
        masked: true 
      } : key
    ));
    setIsGenerating(false);
    alert('API key regenerated successfully');
  };

  const copyToClipboard = (key) => {
    navigator.clipboard.writeText(key);
    alert('API key copied to clipboard');
  };

  const deleteKey = (id) => {
    if (confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      setApiKeys(keys => keys.filter(key => key.id !== id));
    }
  };

  const generateNewKey = async () => {
    if (!newKeyName || !selectedService) {
      alert('Please provide a name and select a service');
      return;
    }

    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newKey = {
      id: Date.now(),
      name: newKeyName,
      service: selectedService,
      key: 'new_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      masked: true,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      status: 'active'
    };

    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    setSelectedService('');
    setIsGenerating(false);
    alert('New API key generated successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">API Key Management</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your integration API keys and authentication tokens
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={20} className="text-success" />
            <span className="text-sm font-medium text-success">Secure</span>
          </div>
        </div>

        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warning">Security Notice</p>
              <p className="text-sm text-warning/80 mt-1">
                Keep your API keys secure and never share them publicly. 
                Regenerate keys immediately if you suspect they've been compromised.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Existing API Keys */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">Active API Keys</h4>
        
        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    apiKey.service === 'Slack' ? 'bg-[#4A154B]' : 'bg-black'
                  }`}>
                    <Icon 
                      name={apiKey.service === 'Slack' ? 'MessageSquare' : 'FileText'} 
                      size={16} 
                      color="white" 
                    />
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground">{apiKey.name}</h5>
                    <p className="text-sm text-muted-foreground">{apiKey.service} Integration</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    apiKey.status === 'active' ?'bg-success/10 text-success' :'bg-muted/10 text-muted-foreground'
                  }`}>
                    {apiKey.status}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-muted/30 rounded border p-2 font-mono text-sm">
                    {apiKey.masked ? maskKey(apiKey.key) : apiKey.key}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleKeyVisibility(apiKey.id)}
                  >
                    <Icon name={apiKey.masked ? 'Eye' : 'EyeOff'} size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(apiKey.key)}
                  >
                    <Icon name="Copy" size={16} />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Created:</span>
                    <span className="ml-2 text-foreground">{apiKey.created}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Used:</span>
                    <span className="ml-2 text-foreground">{apiKey.lastUsed}</span>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => regenerateKey(apiKey.id)}
                    loading={isGenerating}
                  >
                    <Icon name="RefreshCw" size={14} className="mr-2" />
                    Regenerate
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteKey(apiKey.id)}
                    className="text-error hover:text-error hover:bg-error/10"
                  >
                    <Icon name="Trash2" size={14} className="mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generate New Key */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">Generate New API Key</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            label="Key Name"
            type="text"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            placeholder="e.g., Production Slack Integration"
          />
          
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Service</label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select a service</option>
              <option value="Slack">Slack</option>
              <option value="Notion">Notion</option>
              <option value="Custom">Custom Integration</option>
            </select>
          </div>
        </div>

        <Button
          variant="default"
          onClick={generateNewKey}
          loading={isGenerating}
          disabled={!newKeyName || !selectedService}
        >
          <Icon name="Plus" size={16} className="mr-2" />
          Generate API Key
        </Button>
      </div>
    </div>
  );
};

export default APIKeyManagement;