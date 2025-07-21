import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MetricsCard from './components/MetricsCard';
import ChangeTimelineItem from './components/ChangeTimelineItem';
import ReportScheduleCard from './components/ReportScheduleCard';
import IntegrationStatusCard from './components/IntegrationStatusCard';
import QuickAddCompetitorCard from './components/QuickAddCompetitorCard';
import ChangeTimelineFilter from './components/ChangeTimelineFilter';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [timelineFilter, setTimelineFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data
  const metricsData = [
    {
      title: 'Competitors Tracked',
      value: '24',
      change: '+3',
      changeType: 'positive',
      icon: 'Users',
      iconColor: 'bg-primary'
    },
    {
      title: 'Changes This Week',
      value: '47',
      change: '+12',
      changeType: 'positive',
      icon: 'TrendingUp',
      iconColor: 'bg-success'
    },
    {
      title: 'Pending Alerts',
      value: '8',
      change: '-2',
      changeType: 'negative',
      icon: 'Bell',
      iconColor: 'bg-warning'
    },
    {
      title: 'Integration Status',
      value: '98%',
      change: '+1%',
      changeType: 'positive',
      icon: 'Zap',
      iconColor: 'bg-accent'
    }
  ];

  const recentChanges = [
    {
      id: 1,
      companyName: 'Figma',
      companyLogo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center',
      type: 'Features',
      impact: 'High',
      description: 'Launched new AI-powered design suggestions feature in the main editor toolbar with smart layout recommendations.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      hasScreenshot: true
    },
    {
      id: 2,
      companyName: 'Notion',
      companyLogo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center',
      type: 'Pricing',
      impact: 'Medium',
      description: 'Updated pricing structure for Pro plan, increased from $8 to $10 per user per month with additional storage.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      hasScreenshot: false
    },
    {
      id: 3,
      companyName: 'Slack',
      companyLogo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center',
      type: 'UI',
      impact: 'Low',
      description: 'Redesigned sidebar navigation with improved channel organization and new color scheme for better accessibility.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      hasScreenshot: true
    },
    {
      id: 4,
      companyName: 'Linear',
      companyLogo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center',
      type: 'Features',
      impact: 'High',
      description: 'Introduced advanced project templates with automated workflow setup and team collaboration tools.',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      hasScreenshot: true
    },
    {
      id: 5,
      companyName: 'Airtable',
      companyLogo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center',
      type: 'UI',
      impact: 'Medium',
      description: 'Updated dashboard interface with new grid view options and improved mobile responsiveness.',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      hasScreenshot: false
    }
  ];

  const upcomingReports = [
    {
      id: 1,
      title: 'Weekly Competitor Digest',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      status: 'ready',
      competitorCount: 24
    },
    {
      id: 2,
      title: 'Feature Analysis Report',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      status: 'processing',
      competitorCount: 12
    },
    {
      id: 3,
      title: 'Pricing Intelligence Summary',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'scheduled',
      competitorCount: 18
    }
  ];

  const integrationStatus = [
    {
      id: 1,
      name: 'Slack',
      description: 'Daily digest delivery',
      status: 'connected',
      icon: 'MessageSquare'
    },
    {
      id: 2,
      name: 'Notion',
      description: 'Report synchronization',
      status: 'connected',
      icon: 'FileText'
    },
    {
      id: 3,
      name: 'Email',
      description: 'Alert notifications',
      status: 'warning',
      icon: 'Mail'
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleViewDetails = (change) => {
    console.log('Viewing details for:', change);
    // Navigate to detailed view or open modal
  };

  const handleShare = (change) => {
    console.log('Sharing change:', change);
    // Open share modal or copy link
  };

  const handleAddCompetitor = async (competitorData) => {
    console.log('Adding competitor:', competitorData);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleViewAllReports = () => {
    navigate('/weekly-reports');
  };

  const handleConfigureIntegrations = () => {
    navigate('/integration-settings');
  };

  const filteredChanges = recentChanges.filter(change => {
    if (timelineFilter === 'all') return true;
    return change.type === timelineFilter;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="lg:ml-64 pt-16">
          <div className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Icon name="Loader2" size={32} className="text-primary animate-spin mx-auto mb-2" />
                <p className="text-muted-foreground">Loading dashboard...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-[1030] lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Icon name="Menu" size={20} />
      </Button>

      <main className="lg:ml-64 pt-16">
        <div className="p-6">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Monitor competitor activity and track market changes
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => navigate('/competitor-management')}
                >
                  Add Competitor
                </Button>
                <Button
                  variant="default"
                  iconName="FileText"
                  iconPosition="left"
                  onClick={() => navigate('/weekly-reports')}
                >
                  View Reports
                </Button>
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                changeType={metric.changeType}
                icon={metric.icon}
                iconColor={metric.iconColor}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Recent Changes Timeline - Left Column */}
            <div className="lg:col-span-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Recent Changes</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ExternalLink"
                    iconPosition="right"
                    onClick={() => navigate('/competitor-management')}
                  >
                    View All
                  </Button>
                </div>

                <ChangeTimelineFilter
                  activeFilter={timelineFilter}
                  onFilterChange={setTimelineFilter}
                  timeRange={timeRange}
                  onTimeRangeChange={setTimeRange}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />

                <div className="space-y-4">
                  {filteredChanges.length > 0 ? (
                    filteredChanges.map((change) => (
                      <ChangeTimelineItem
                        key={change.id}
                        change={change}
                        onViewDetails={handleViewDetails}
                        onShare={handleShare}
                      />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">No changes found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your filters or check back later for new updates.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Report Schedule */}
              <ReportScheduleCard
                reports={upcomingReports}
                onViewAll={handleViewAllReports}
              />

              {/* Integration Status */}
              <IntegrationStatusCard
                integrations={integrationStatus}
                onConfigure={handleConfigureIntegrations}
              />

              {/* Quick Add Competitor */}
              <QuickAddCompetitorCard
                onAddCompetitor={handleAddCompetitor}
              />
            </div>
          </div>

          {/* Quick Actions Footer */}
          <div className="mt-8 p-6 bg-muted/30 rounded-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-medium text-foreground">Need help getting started?</h3>
                <p className="text-sm text-muted-foreground">
                  Set up integrations or configure alerts to maximize your competitive intelligence.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Settings"
                  iconPosition="left"
                  onClick={() => navigate('/integration-settings')}
                >
                  Configure Alerts
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="Zap"
                  iconPosition="left"
                  onClick={() => navigate('/integration-settings')}
                >
                  Setup Integrations
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;