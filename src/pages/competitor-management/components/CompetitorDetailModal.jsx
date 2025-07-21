import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CompetitorDetailModal = ({ competitor, isOpen, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [editData, setEditData] = useState(competitor || {});
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'urls', label: 'URLs', icon: 'Link' },
    { id: 'github', label: 'GitHub', icon: 'Github' },
    { id: 'settings', label: 'Settings', icon: 'Settings' },
    { id: 'changes', label: 'Recent Changes', icon: 'History' }
  ];

  const sensitivityOptions = [
    { value: 'low', label: 'Low - Major changes only' },
    { value: 'medium', label: 'Medium - Moderate sensitivity' },
    { value: 'high', label: 'High - Detect minor changes' }
  ];

  const scanFrequencyOptions = [
    { value: '1', label: 'Every hour' },
    { value: '6', label: 'Every 6 hours' },
    { value: '12', label: 'Every 12 hours' },
    { value: '24', label: 'Daily' }
  ];

  const mockChanges = [
    {
      id: 1,
      type: 'feature',
      title: 'New AI-powered analytics dashboard launched',
      description: 'Added comprehensive analytics with machine learning insights for user behavior tracking.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      impact: 'high',
      url: 'https://example.com/features'
    },
    {
      id: 2,
      type: 'pricing',
      title: 'Pricing update for Enterprise plan',
      description: 'Enterprise plan price increased from $99/month to $129/month. Added new features to justify the increase.',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      impact: 'medium',
      url: 'https://example.com/pricing'
    },
    {
      id: 3,
      type: 'ui',
      title: 'Homepage redesign with new branding',
      description: 'Complete homepage overhaul with updated color scheme, typography, and layout structure.',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      impact: 'low',
      url: 'https://example.com'
    }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSave(editData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving competitor:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const getChangeTypeColor = (type) => {
    switch (type) {
      case 'feature':
        return 'bg-success text-success-foreground';
      case 'pricing':
        return 'bg-warning text-warning-foreground';
      case 'ui':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  if (!isOpen || !competitor) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[1030] flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              <Image
                src={competitor.logo}
                alt={`${competitor.name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{competitor.name}</h2>
              <p className="text-sm text-muted-foreground">{competitor.industry}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Icon name="Edit" size={16} className="mr-2" />
                Edit
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} loading={isSaving}>
                  Save Changes
                </Button>
              </>
            )}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex space-x-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon} size={16} className="mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="h-[calc(90vh-200px)] overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Status and Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Status</div>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                    competitor.status === 'active' ? 'bg-success text-success-foreground' :
                    competitor.status === 'paused' ? 'bg-warning text-warning-foreground' :
                    'bg-error text-error-foreground'
                  }`}>
                    <Icon name={
                      competitor.status === 'active' ? 'CheckCircle' :
                      competitor.status === 'paused' ? 'Pause' : 'AlertCircle'
                    } size={12} className="mr-1" />
                    {competitor.status.charAt(0).toUpperCase() + competitor.status.slice(1)}
                  </div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Total Changes</div>
                  <div className="text-2xl font-bold text-foreground mt-1">{competitor.changesCount}</div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Tracked URLs</div>
                  <div className="text-2xl font-bold text-foreground mt-1">{competitor.trackedUrls}</div>
                </div>
              </div>

              {/* Basic Information */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {isEditing ? (
                    <>
                      <Input
                        label="Company Name"
                        value={editData.name || ''}
                        onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                      />
                      <Input
                        label="Website"
                        value={editData.website || ''}
                        onChange={(e) => setEditData(prev => ({ ...prev, website: e.target.value }))}
                      />
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">Company Name</label>
                        <p className="text-foreground">{competitor.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">Website</label>
                        <a href={competitor.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {competitor.website}
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Description</h3>
                {isEditing ? (
                  <textarea
                    value={editData.description || ''}
                    onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    rows={3}
                  />
                ) : (
                  <p className="text-muted-foreground">
                    {competitor.description || 'No description available'}
                  </p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'urls' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Tracked URLs</h3>
                {isEditing && (
                  <Button size="sm">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Add URL
                  </Button>
                )}
              </div>
              
              <div className="space-y-3">
                {(competitor.urls || ['https://example.com', 'https://example.com/pricing', 'https://example.com/features']).map((url, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="Link" size={16} className="text-muted-foreground" />
                      <div>
                        <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {url}
                        </a>
                        <p className="text-xs text-muted-foreground">Last scanned: 2 hours ago</p>
                      </div>
                    </div>
                    {isEditing && (
                      <Button variant="ghost" size="icon">
                        <Icon name="Trash2" size={16} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'github' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">GitHub Repositories</h3>
                {isEditing && (
                  <Button size="sm">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Add Repository
                  </Button>
                )}
              </div>
              
              <div className="space-y-3">
                {(competitor.githubRepos || ['competitor/main-app', 'competitor/mobile-app']).map((repo, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="Github" size={16} className="text-muted-foreground" />
                      <div>
                        <a href={`https://github.com/${repo}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {repo}
                        </a>
                        <p className="text-xs text-muted-foreground">Last release: v2.1.0 (3 days ago)</p>
                      </div>
                    </div>
                    {isEditing && (
                      <Button variant="ghost" size="icon">
                        <Icon name="Trash2" size={16} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-4">Tracking Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Scan Frequency"
                    options={scanFrequencyOptions}
                    value="6"
                    disabled={!isEditing}
                  />
                  <Select
                    label="Change Sensitivity"
                    options={sensitivityOptions}
                    value="medium"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div>
                <Input
                  label="Alert Keywords"
                  placeholder="pricing, feature, launch, update"
                  description="Comma-separated keywords for priority alerts"
                  disabled={!isEditing}
                />
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-4">Notification Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive email alerts for changes</p>
                    </div>
                    <div className="w-12 h-6 bg-primary rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Slack Notifications</p>
                      <p className="text-sm text-muted-foreground">Send alerts to Slack channel</p>
                    </div>
                    <div className="w-12 h-6 bg-muted rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'changes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Recent Changes</h3>
                <Button variant="outline" size="sm">
                  <Icon name="RefreshCw" size={16} className="mr-2" />
                  Scan Now
                </Button>
              </div>
              
              <div className="space-y-4">
                {mockChanges.map((change) => (
                  <div key={change.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getChangeTypeColor(change.type)}`}>
                          {change.type.toUpperCase()}
                        </span>
                        <span className={`text-xs font-medium ${getImpactColor(change.impact)}`}>
                          {change.impact.toUpperCase()} IMPACT
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(change.timestamp)}
                      </span>
                    </div>
                    
                    <h4 className="font-medium text-foreground mb-2">{change.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{change.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <a href={change.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                        {change.url}
                      </a>
                      <Button variant="ghost" size="sm">
                        <Icon name="ExternalLink" size={14} className="mr-1" />
                        View Diff
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompetitorDetailModal;