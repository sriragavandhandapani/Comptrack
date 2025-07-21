import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddCompetitorModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    industry: '',
    description: '',
    urls: [''],
    githubRepos: [''],
    keywords: ''
  });
  const [currentTab, setCurrentTab] = useState('basic');
  const [isLoading, setIsLoading] = useState(false);

  const industryOptions = [
    { value: 'saas', label: 'SaaS & Software' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'fintech', label: 'FinTech' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'marketing', label: 'Marketing & Advertising' },
    { value: 'other', label: 'Other' }
  ];

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: 'Info' },
    { id: 'urls', label: 'URLs', icon: 'Link' },
    { id: 'github', label: 'GitHub', icon: 'Github' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newCompetitor = {
        id: Date.now(),
        ...formData,
        status: 'active',
        lastScan: new Date(),
        changesCount: 0,
        trackedUrls: formData.urls.filter(url => url.trim()).length,
        recentChanges: [],
        logo: `https://api.dicebear.com/7.x/initials/svg?seed=${formData.name}`
      };
      
      onAdd(newCompetitor);
      onClose();
      
      // Reset form
      setFormData({
        name: '',
        website: '',
        industry: '',
        description: '',
        urls: [''],
        githubRepos: [''],
        keywords: ''
      });
      setCurrentTab('basic');
    } catch (error) {
      console.error('Error adding competitor:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[1030] flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Add New Competitor</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex space-x-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  currentTab === tab.id
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
        <form onSubmit={handleSubmit} className="flex flex-col h-[calc(90vh-140px)]">
          <div className="flex-1 overflow-y-auto p-6">
            {currentTab === 'basic' && (
              <div className="space-y-4">
                <Input
                  label="Company Name"
                  type="text"
                  placeholder="Enter competitor name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
                
                <Input
                  label="Website URL"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  required
                />
                
                <Select
                  label="Industry"
                  placeholder="Select industry"
                  options={industryOptions}
                  value={formData.industry}
                  onChange={(value) => handleInputChange('industry', value)}
                  required
                />
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Brief description of the competitor"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {currentTab === 'urls' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    URLs to Track
                  </label>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add specific pages to monitor for changes (pricing, features, etc.)
                  </p>
                  
                  {formData.urls.map((url, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <Input
                        type="url"
                        placeholder="https://example.com/pricing"
                        value={url}
                        onChange={(e) => handleArrayChange('urls', index, e.target.value)}
                        className="flex-1"
                      />
                      {formData.urls.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeArrayItem('urls', index)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem('urls')}
                    className="mt-2"
                  >
                    <Icon name="Plus" size={16} className="mr-2" />
                    Add URL
                  </Button>
                </div>
              </div>
            )}

            {currentTab === 'github' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    GitHub Repositories
                  </label>
                  <p className="text-sm text-muted-foreground mb-4">
                    Monitor public repositories for new releases and changes
                  </p>
                  
                  {formData.githubRepos.map((repo, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <Input
                        type="text"
                        placeholder="username/repository"
                        value={repo}
                        onChange={(e) => handleArrayChange('githubRepos', index, e.target.value)}
                        className="flex-1"
                      />
                      {formData.githubRepos.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeArrayItem('githubRepos', index)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem('githubRepos')}
                    className="mt-2"
                  >
                    <Icon name="Plus" size={16} className="mr-2" />
                    Add Repository
                  </Button>
                </div>
              </div>
            )}

            {currentTab === 'settings' && (
              <div className="space-y-4">
                <Input
                  label="Alert Keywords"
                  type="text"
                  placeholder="pricing, feature, launch, update (comma separated)"
                  value={formData.keywords}
                  onChange={(e) => handleInputChange('keywords', e.target.value)}
                  description="Get notified when these keywords appear in changes"
                />
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Default Settings</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Scan frequency: Every 6 hours</li>
                    <li>• Change sensitivity: Medium</li>
                    <li>• Notifications: Enabled</li>
                    <li>• Auto-categorization: Enabled</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-2">
                    These can be customized after adding the competitor
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-border">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <div className="flex space-x-2">
              {currentTab !== 'basic' && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const currentIndex = tabs.findIndex(tab => tab.id === currentTab);
                    if (currentIndex > 0) {
                      setCurrentTab(tabs[currentIndex - 1].id);
                    }
                  }}
                >
                  Previous
                </Button>
              )}
              {currentTab !== 'settings' ? (
                <Button
                  type="button"
                  onClick={() => {
                    const currentIndex = tabs.findIndex(tab => tab.id === currentTab);
                    if (currentIndex < tabs.length - 1) {
                      setCurrentTab(tabs[currentIndex + 1].id);
                    }
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button type="submit" loading={isLoading}>
                  Add Competitor
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCompetitorModal;