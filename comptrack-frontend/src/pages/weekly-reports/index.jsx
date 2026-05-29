import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ReportCard from './components/ReportCard';
import ReportFilters from './components/ReportFilters';
import ReportTimeline from './components/ReportTimeline';
import DiffViewer from './components/DiffViewer';
import SubscriptionSettings from './components/SubscriptionSettings';

const WeeklyReports = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState('week-2025-03');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompetitor, setSelectedCompetitor] = useState('all');
  const [selectedChangeType, setSelectedChangeType] = useState('all');
  const [selectedImpact, setSelectedImpact] = useState('all');
  const [diffViewerOpen, setDiffViewerOpen] = useState(false);
  const [selectedDiff, setSelectedDiff] = useState(null);
  const [subscriptionSettingsOpen, setSubscriptionSettingsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock data for available weeks
  const availableWeeks = [
    {
      id: 'week-2025-03',
      label: 'Week of Jan 13, 2025',
      dateRange: 'Jan 13 - Jan 19, 2025',
      changesCount: 47,
      status: 'completed'
    },
    {
      id: 'week-2025-02',
      label: 'Week of Jan 6, 2025',
      dateRange: 'Jan 6 - Jan 12, 2025',
      changesCount: 32,
      status: 'completed'
    },
    {
      id: 'week-2025-01',
      label: 'Week of Dec 30, 2024',
      dateRange: 'Dec 30, 2024 - Jan 5, 2025',
      changesCount: 28,
      status: 'completed'
    },
    {
      id: 'week-2024-52',
      label: 'Week of Dec 23, 2024',
      dateRange: 'Dec 23 - Dec 29, 2024',
      changesCount: 15,
      status: 'completed'
    },
    {
      id: 'week-2024-51',
      label: 'Week of Dec 16, 2024',
      dateRange: 'Dec 16 - Dec 22, 2024',
      changesCount: 41,
      status: 'completed'
    }
  ];

  // Mock competitors data
  const competitors = [
    { id: 'figma', name: 'Figma' },
    { id: 'sketch', name: 'Sketch' },
    { id: 'adobe-xd', name: 'Adobe XD' },
    { id: 'invision', name: 'InVision' },
    { id: 'framer', name: 'Framer' }
  ];

  // Mock reports data
  const mockReports = [
    {
      id: 'report-2025-03',
      weekId: 'week-2025-03',
      weekStart: 'Jan 13, 2025',
      dateRange: 'Jan 13 - Jan 19, 2025',
      status: 'completed',
      metrics: {
        totalChanges: 47,
        highImpact: 8,
        newFeatures: 12,
        pricingChanges: 3
      },
      executiveSummary: `This week showed significant competitive activity with Figma launching their new AI-powered design assistant and Sketch introducing collaborative commenting features. Adobe XD made substantial pricing adjustments to their enterprise plans, while InVision continued their platform modernization efforts. The market is clearly moving towards AI integration and enhanced collaboration capabilities.`,
      competitorBreakdown: [
        {
          id: 'figma',
          name: 'Figma',
          changesCount: 18,
          changeTypes: ['features', 'ui']
        },
        {
          id: 'sketch',
          name: 'Sketch',
          changesCount: 12,
          changeTypes: ['features', 'ui']
        },
        {
          id: 'adobe-xd',
          name: 'Adobe XD',
          changesCount: 9,
          changeTypes: ['pricing', 'ui']
        },
        {
          id: 'invision',
          name: 'InVision',
          changesCount: 8,
          changeTypes: ['ui', 'features']
        }
      ],
      keyChanges: [
        {
          id: 'change-1',
          competitor: 'Figma',
          type: 'features',
          impact: 'high',
          date: 'Jan 15, 2025',
          description: 'Launched AI Design Assistant with automated layout suggestions and component generation capabilities'
        },
        {
          id: 'change-2',
          competitor: 'Adobe XD',
          type: 'pricing',
          impact: 'high',
          date: 'Jan 14, 2025',
          description: 'Reduced enterprise plan pricing by 25% and introduced new team collaboration features'
        },
        {
          id: 'change-3',
          competitor: 'Sketch',
          type: 'features',
          impact: 'medium',
          date: 'Jan 16, 2025',
          description: 'Added real-time collaborative commenting and annotation system for design reviews'
        },
        {
          id: 'change-4',
          competitor: 'InVision',
          type: 'ui',
          impact: 'medium',
          date: 'Jan 17, 2025',
          description: 'Redesigned dashboard with improved project organization and faster loading times'
        }
      ]
    },
    {
      id: 'report-2025-02',
      weekId: 'week-2025-02',
      weekStart: 'Jan 6, 2025',
      dateRange: 'Jan 6 - Jan 12, 2025',
      status: 'completed',
      metrics: {
        totalChanges: 32,
        highImpact: 5,
        newFeatures: 8,
        pricingChanges: 1
      },
      executiveSummary: `A quieter week following the holiday period, but still notable activity from key competitors. Figma continued their AI integration rollout, while Sketch focused on performance improvements. Adobe XD introduced new prototyping capabilities, and InVision made progress on their platform consolidation efforts.`,
      competitorBreakdown: [
        {
          id: 'figma',
          name: 'Figma',
          changesCount: 14,
          changeTypes: ['features', 'ui']
        },
        {
          id: 'adobe-xd',
          name: 'Adobe XD',
          changesCount: 10,
          changeTypes: ['features']
        },
        {
          id: 'sketch',
          name: 'Sketch',
          changesCount: 5,
          changeTypes: ['ui']
        },
        {
          id: 'invision',
          name: 'InVision',
          changesCount: 3,
          changeTypes: ['ui']
        }
      ],
      keyChanges: [
        {
          id: 'change-5',
          competitor: 'Figma',
          type: 'features',
          impact: 'high',
          date: 'Jan 8, 2025',
          description: 'Extended AI capabilities to include automated accessibility checking and color contrast validation'
        },
        {
          id: 'change-6',
          competitor: 'Adobe XD',
          type: 'features',
          impact: 'medium',
          date: 'Jan 10, 2025',
          description: 'Introduced advanced micro-interaction prototyping with timeline-based animation controls'
        }
      ]
    }
  ];

  // Mock diff data
  const mockDiffData = {
    id: 'diff-1',
    competitor: 'Figma',
    changeType: 'ui',
    impact: 'high',
    date: 'Jan 15, 2025',
    beforeDate: 'Jan 14, 2025',
    afterDate: 'Jan 15, 2025',
    detectedDate: 'Jan 15, 2025 at 3:24 PM',
    summary: 'Figma introduced a new AI-powered design assistant panel with automated layout suggestions and component generation capabilities.',
    beforeImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop',
    beforeFeatures: [
      'Standard toolbar layout',
      'Manual component creation',
      'Basic design suggestions',
      'Traditional layer panel'
    ],
    afterFeatures: [
      'AI assistant panel integrated',
      'Automated component generation',
      'Smart layout suggestions',
      'Enhanced layer organization',
      'Real-time design feedback'
    ],
    beforeContent: `Standard Figma interface with traditional design tools\nManual component creation workflow\nBasic design assistance features`,
    afterContent: `New AI-powered design assistant panel\nAutomated component generation capabilities\nSmart layout and design suggestions\nEnhanced user experience with contextual help`
  };

  // Mock subscription settings
  const [subscriptionSettings, setSubscriptionSettings] = useState({
    frequency: 'weekly',
    deliveryDay: 'monday',
    deliveryTime: '09:00',
    emailEnabled: true,
    slackEnabled: true,
    notionEnabled: false,
    includeHighImpact: true,
    includeMediumImpact: true,
    includeLowImpact: false,
    competitors: [],
    customEmail: ''
  });

  // Get current report data
  const currentReport = mockReports.find(report => report.weekId === selectedWeek);
  const filteredReports = mockReports.filter(report => {
    if (!currentReport) return false;
    
    // Apply search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        report.executiveSummary.toLowerCase().includes(searchLower) ||
        report.competitorBreakdown.some(comp => comp.name.toLowerCase().includes(searchLower)) ||
        report.keyChanges.some(change => 
          change.description.toLowerCase().includes(searchLower) ||
          change.competitor.toLowerCase().includes(searchLower)
        );
      if (!matchesSearch) return false;
    }

    // Apply competitor filter
    if (selectedCompetitor !== 'all') {
      const hasCompetitor = report.competitorBreakdown.some(comp => comp.id === selectedCompetitor);
      if (!hasCompetitor) return false;
    }

    // Apply change type filter
    if (selectedChangeType !== 'all') {
      const hasChangeType = report.keyChanges.some(change => change.type === selectedChangeType);
      if (!hasChangeType) return false;
    }

    // Apply impact filter
    if (selectedImpact !== 'all') {
      const hasImpact = report.keyChanges.some(change => change.impact === selectedImpact);
      if (!hasImpact) return false;
    }

    return report.weekId === selectedWeek;
  });

  const handleViewDetails = (changeId) => {
    setSelectedDiff(mockDiffData);
    setDiffViewerOpen(true);
  };

  const handleExport = (reportId) => {
    console.log('Exporting report:', reportId);
    // Mock export functionality
  };

  const handleExportAll = () => {
    console.log('Exporting all reports');
    // Mock export all functionality
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    // Mock report generation
    setTimeout(() => {
      setIsGenerating(false);
      console.log('New report generated');
    }, 3000);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCompetitor('all');
    setSelectedChangeType('all');
    setSelectedImpact('all');
  };

  const handleSaveSubscriptionSettings = (newSettings) => {
    setSubscriptionSettings(newSettings);
    console.log('Subscription settings saved:', newSettings);
  };

  useEffect(() => {
    document.title = 'Weekly Reports - Competitor Feature Tracker';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <main className="lg:ml-64 pt-16">
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Weekly Reports</h1>
                <p className="text-muted-foreground">
                  Comprehensive competitive intelligence summaries and historical analysis
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setSubscriptionSettingsOpen(true)}
                >
                  <Icon name="Settings" size={16} className="mr-2" />
                  Subscription
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                  loading={isGenerating}
                >
                  <Icon name="RefreshCw" size={16} className="mr-2" />
                  {isGenerating ? 'Generating...' : 'Generate Report'}
                </Button>
              </div>
            </div>
          </div>

          {/* Timeline Navigation */}
          <ReportTimeline
            selectedWeek={selectedWeek}
            onWeekChange={setSelectedWeek}
            availableWeeks={availableWeeks}
            onExportAll={handleExportAll}
            onGenerateReport={handleGenerateReport}
          />

          {/* Filters */}
          <ReportFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCompetitor={selectedCompetitor}
            onCompetitorChange={setSelectedCompetitor}
            selectedChangeType={selectedChangeType}
            onChangeTypeChange={setSelectedChangeType}
            selectedImpact={selectedImpact}
            onImpactChange={setSelectedImpact}
            onClearFilters={handleClearFilters}
            competitors={competitors}
          />

          {/* Reports Content */}
          <div className="space-y-6">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onViewDetails={handleViewDetails}
                  onExport={handleExport}
                />
              ))
            ) : currentReport ? (
              <div className="text-center py-12">
                <Icon name="Filter" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No matching reports</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters to see more results
                </p>
                <Button variant="outline" onClick={handleClearFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No report available</h3>
                <p className="text-muted-foreground mb-4">
                  No report has been generated for the selected week yet
                </p>
                <Button onClick={handleGenerateReport} disabled={isGenerating}>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Generate Report
                </Button>
              </div>
            )}
          </div>

          {/* Generation Status */}
          {isGenerating && (
            <div className="fixed bottom-6 right-6 bg-card border border-border rounded-lg shadow-modal p-4 z-[1020]">
              <div className="flex items-center space-x-3">
                <div className="animate-spin">
                  <Icon name="RefreshCw" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm text-foreground">Generating Report</div>
                  <div className="text-xs text-muted-foreground">
                    Analyzing competitor changes...
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <DiffViewer
        isOpen={diffViewerOpen}
        onClose={() => setDiffViewerOpen(false)}
        diffData={selectedDiff}
      />

      <SubscriptionSettings
        isOpen={subscriptionSettingsOpen}
        onClose={() => setSubscriptionSettingsOpen(false)}
        currentSettings={subscriptionSettings}
        onSave={handleSaveSubscriptionSettings}
      />
    </div>
  );
};

export default WeeklyReports;