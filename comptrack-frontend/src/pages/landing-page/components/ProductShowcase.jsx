import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductShowcase = () => {
  const [activeTab, setActiveTab] = useState('slack');

  const tabs = [
    { id: 'slack', label: 'Slack Integration', icon: 'MessageSquare' },
    { id: 'notion', label: 'Notion Reports', icon: 'FileText' },
    { id: 'dashboard', label: 'Dashboard View', icon: 'LayoutDashboard' }
  ];

  const renderSlackMockup = () => (
    <div className="bg-slate-900 rounded-lg p-6 text-white font-mono text-sm">
      <div className="flex items-center mb-4">
        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
        <span className="ml-4 text-slate-400">#competitor-intel</span>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <Icon name="Bot" size={16} color="white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-semibold">Competitor Tracker</span>
              <span className="text-xs bg-primary px-2 py-1 rounded">BOT</span>
              <span className="text-slate-400 text-xs">Today at 9:15 AM</span>
            </div>
            <div className="bg-slate-800 border-l-4 border-warning p-3 rounded">
              <div className="flex items-center mb-2">
                <Icon name="AlertTriangle" size={16} className="text-warning mr-2" />
                <span className="font-semibold text-warning">High Impact Change Detected</span>
              </div>
              <p className="mb-2">
                <strong>Figma</strong> just launched their AI design assistant feature
              </p>
              <div className="text-slate-300 text-xs space-y-1">
                <p>• New "AI Generate" button in toolbar</p>
                <p>• Supports text-to-design prompts</p>
                <p>• Available in Pro and Enterprise plans</p>
              </div>
              <div className="flex items-center mt-3 space-x-4">
                <Button variant="outline" size="xs">
                  View Details
                </Button>
                <Button variant="ghost" size="xs">
                  Mark as Reviewed
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotionMockup = () => (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground">Weekly Competitor Report</h3>
        <div className="text-sm text-muted-foreground">July 15-21, 2025</div>
      </div>
      
      <div className="space-y-6">
        <div className="border-l-4 border-error pl-4">
          <h4 className="font-semibold text-foreground mb-2">🚨 High Impact Changes</h4>
          <div className="space-y-2 text-sm">
            <p><strong>Figma:</strong> Launched AI design assistant with text-to-design capabilities</p>
            <p><strong>Canva:</strong> Introduced real-time collaboration for Enterprise users</p>
          </div>
        </div>
        
        <div className="border-l-4 border-warning pl-4">
          <h4 className="font-semibold text-foreground mb-2">⚠️ Medium Impact Changes</h4>
          <div className="space-y-2 text-sm">
            <p><strong>Notion:</strong> Updated pricing structure for team plans</p>
            <p><strong>Airtable:</strong> Enhanced automation workflows</p>
          </div>
        </div>
        
        <div className="border-l-4 border-success pl-4">
          <h4 className="font-semibold text-foreground mb-2">📊 Key Insights</h4>
          <div className="text-sm space-y-1">
            <p>• AI features are becoming standard across design tools</p>
            <p>• Pricing competition intensifying in collaboration space</p>
            <p>• Enterprise features driving premium tier adoption</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboardMockup = () => (
    <div className="bg-slate-50 rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Competitors</p>
              <p className="text-2xl font-bold text-foreground">12</p>
            </div>
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} className="text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Changes This Week</p>
              <p className="text-2xl font-bold text-foreground">47</p>
            </div>
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-success" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">High Impact</p>
              <p className="text-2xl font-bold text-foreground">8</p>
            </div>
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-error" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-border p-4">
        <h4 className="font-semibold text-foreground mb-3">Recent Activity</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-error rounded-full"></div>
            <span className="text-sm text-foreground">Figma launched AI design assistant</span>
            <span className="text-xs text-muted-foreground ml-auto">2h ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-warning rounded-full"></div>
            <span className="text-sm text-foreground">Notion updated team pricing</span>
            <span className="text-xs text-muted-foreground ml-auto">5h ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-sm text-foreground">Linear shipped API updates</span>
            <span className="text-xs text-muted-foreground ml-auto">1d ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            See it in action
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get competitor intelligence delivered exactly where your team works. 
            Choose from Slack notifications, Notion reports, or our comprehensive dashboard.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row justify-center mb-8">
          <div className="inline-flex bg-muted rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                  ${activeTab === tab.id 
                    ? 'bg-white text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <Icon name={tab.icon} size={16} className="mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'slack' && renderSlackMockup()}
          {activeTab === 'notion' && renderNotionMockup()}
          {activeTab === 'dashboard' && renderDashboardMockup()}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;