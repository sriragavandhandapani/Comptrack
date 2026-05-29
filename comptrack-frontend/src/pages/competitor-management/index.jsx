import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import CompetitorCard from './components/CompetitorCard';
import AddCompetitorModal from './components/AddCompetitorModal';
import FilterSidebar from './components/FilterSidebar';
import BulkActionsDropdown from './components/BulkActionsDropdown';
import CompetitorDetailModal from './components/CompetitorDetailModal';

const CompetitorManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedCompetitor, setSelectedCompetitor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCompetitors, setSelectedCompetitors] = useState([]);
  const [filters, setFilters] = useState({
    status: [],
    industry: [],
    lastActivity: '',
    changeFrequency: ''
  });

  // Mock data for competitors
  const [competitors, setCompetitors] = useState([
    {
      id: 1,
      name: 'TechCorp Solutions',
      industry: 'SaaS & Software',
      website: 'https://techcorp.com',
      logo: 'https://api.dicebear.com/7.x/initials/svg?seed=TechCorp',
      status: 'active',
      lastScan: new Date(Date.now() - 2 * 60 * 60 * 1000),
      changesCount: 23,
      trackedUrls: 5,
      description: 'Leading provider of enterprise software solutions with focus on automation and AI integration.',
      urls: ['https://techcorp.com', 'https://techcorp.com/pricing', 'https://techcorp.com/features'],
      githubRepos: ['techcorp/main-app', 'techcorp/api-service'],
      recentChanges: [
        { type: 'feature', description: 'New AI dashboard launched' },
        { type: 'pricing', description: 'Enterprise plan updated' }
      ]
    },
    {
      id: 2,
      name: 'DataFlow Analytics',
      industry: 'SaaS & Software',
      website: 'https://dataflow.io',
      logo: 'https://api.dicebear.com/7.x/initials/svg?seed=DataFlow',
      status: 'active',
      lastScan: new Date(Date.now() - 30 * 60 * 1000),
      changesCount: 18,
      trackedUrls: 4,
      description: 'Advanced analytics platform for data-driven decision making across enterprises.',
      urls: ['https://dataflow.io', 'https://dataflow.io/pricing'],
      githubRepos: ['dataflow/analytics-engine'],
      recentChanges: [
        { type: 'ui', description: 'Homepage redesign completed' }
      ]
    },
    {
      id: 3,
      name: 'CloudSync Pro',
      industry: 'SaaS & Software',
      website: 'https://cloudsync.pro',
      logo: 'https://api.dicebear.com/7.x/initials/svg?seed=CloudSync',
      status: 'paused',
      lastScan: new Date(Date.now() - 24 * 60 * 60 * 1000),
      changesCount: 12,
      trackedUrls: 3,
      description: 'Cloud synchronization and backup solutions for businesses of all sizes.',
      urls: ['https://cloudsync.pro'],
      githubRepos: [],
      recentChanges: []
    },
    {
      id: 4,
      name: 'MarketPlace Hub',
      industry: 'E-commerce',
      website: 'https://marketplace-hub.com',
      logo: 'https://api.dicebear.com/7.x/initials/svg?seed=MarketPlace',
      status: 'active',
      lastScan: new Date(Date.now() - 45 * 60 * 1000),
      changesCount: 31,
      trackedUrls: 7,
      description: 'Multi-vendor marketplace platform with integrated payment and logistics solutions.',
      urls: ['https://marketplace-hub.com', 'https://marketplace-hub.com/pricing', 'https://marketplace-hub.com/features'],
      githubRepos: ['marketplace/core', 'marketplace/mobile'],
      recentChanges: [
        { type: 'feature', description: 'New vendor dashboard' },
        { type: 'pricing', description: 'Commission structure updated' }
      ]
    },
    {
      id: 5,
      name: 'FinanceFlow',
      industry: 'FinTech',
      website: 'https://financeflow.app',
      logo: 'https://api.dicebear.com/7.x/initials/svg?seed=FinanceFlow',
      status: 'error',
      lastScan: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      changesCount: 8,
      trackedUrls: 2,
      description: 'Personal finance management app with AI-powered insights and budgeting tools.',
      urls: ['https://financeflow.app'],
      githubRepos: [],
      recentChanges: []
    },
    {
      id: 6,
      name: 'EduTech Platform',
      industry: 'Education',
      website: 'https://edutech-platform.com',
      logo: 'https://api.dicebear.com/7.x/initials/svg?seed=EduTech',
      status: 'active',
      lastScan: new Date(Date.now() - 1 * 60 * 60 * 1000),
      changesCount: 15,
      trackedUrls: 4,
      description: 'Online learning platform with interactive courses and certification programs.',
      urls: ['https://edutech-platform.com', 'https://edutech-platform.com/courses'],
      githubRepos: ['edutech/learning-platform'],
      recentChanges: [
        { type: 'feature', description: 'New course builder launched' }
      ]
    }
  ]);

  // Filter competitors based on search and filters
  const filteredCompetitors = competitors.filter(competitor => {
    // Search filter
    const matchesSearch = competitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         competitor.industry.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = filters.status.length === 0 || filters.status.includes(competitor.status);
    
    // Industry filter
    const matchesIndustry = filters.industry.length === 0 || filters.industry.includes(competitor.industry.toLowerCase().replace(/\s+/g, '').replace('&', ''));
    
    return matchesSearch && matchesStatus && matchesIndustry;
  });

  const handleCompetitorSelect = (competitorId, selected) => {
    setSelectedCompetitors(prev => 
      selected 
        ? [...prev, competitorId]
        : prev.filter(id => id !== competitorId)
    );
  };

  const handleSelectAll = () => {
    if (selectedCompetitors.length === filteredCompetitors.length) {
      setSelectedCompetitors([]);
    } else {
      setSelectedCompetitors(filteredCompetitors.map(c => c.id));
    }
  };

  const handleAddCompetitor = (newCompetitor) => {
    setCompetitors(prev => [...prev, newCompetitor]);
  };

  const handleEditCompetitor = (competitor) => {
    setSelectedCompetitor(competitor);
    setDetailModalOpen(true);
  };

  const handleViewChanges = (competitor) => {
    setSelectedCompetitor(competitor);
    setDetailModalOpen(true);
  };

  const handleToggleStatus = (competitor) => {
    setCompetitors(prev => prev.map(c => 
      c.id === competitor.id 
        ? { ...c, status: c.status === 'active' ? 'paused' : 'active' }
        : c
    ));
  };

  const handleDeleteCompetitor = (competitor) => {
    if (window.confirm(`Are you sure you want to delete ${competitor.name}?`)) {
      setCompetitors(prev => prev.filter(c => c.id !== competitor.id));
      setSelectedCompetitors(prev => prev.filter(id => id !== competitor.id));
    }
  };

  const handleBulkAction = (actionId, competitorIds) => {
    switch (actionId) {
      case 'pause':
        setCompetitors(prev => prev.map(c => 
          competitorIds.includes(c.id) ? { ...c, status: 'paused' } : c
        ));
        break;
      case 'resume':
        setCompetitors(prev => prev.map(c => 
          competitorIds.includes(c.id) ? { ...c, status: 'active' } : c
        ));
        break;
      case 'scan':
        setCompetitors(prev => prev.map(c => 
          competitorIds.includes(c.id) ? { ...c, lastScan: new Date() } : c
        ));
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${competitorIds.length} competitor(s)?`)) {
          setCompetitors(prev => prev.filter(c => !competitorIds.includes(c.id)));
          setSelectedCompetitors([]);
        }
        break;
      case 'export':
        console.log('Exporting competitors:', competitorIds);
        break;
      case 'group': console.log('Adding to group:', competitorIds);
        break;
    }
  };

  const handleSaveCompetitor = (updatedCompetitor) => {
    setCompetitors(prev => prev.map(c => 
      c.id === updatedCompetitor.id ? updatedCompetitor : c
    ));
    setDetailModalOpen(false);
    setSelectedCompetitor(null);
  };

  // Close modals on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setAddModalOpen(false);
        setDetailModalOpen(false);
        setFilterSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Competitor Management - Competitor Feature Tracker</title>
        <meta name="description" content="Manage and track all your competitors in one place. Add new competitors, configure tracking settings, and monitor changes." />
      </Helmet>

      <Header />
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-64'} pt-16`}>
        <div className="flex">
          {/* Main Content */}
          <div className={`flex-1 transition-all duration-300 ${filterSidebarOpen ? 'lg:mr-80' : ''}`}>
            <div className="p-6">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
                <span>Dashboard</span>
                <Icon name="ChevronRight" size={16} />
                <span className="text-foreground">Competitor Management</span>
              </nav>

              {/* Page Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Competitor Management</h1>
                  <p className="text-muted-foreground mt-1">
                    Track and monitor {competitors.length} competitors across different industries
                  </p>
                </div>
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                  <Button
                    variant="outline"
                    onClick={() => setFilterSidebarOpen(!filterSidebarOpen)}
                    className="lg:hidden"
                  >
                    <Icon name="Filter" size={16} className="mr-2" />
                    Filters
                  </Button>
                  <Button onClick={() => setAddModalOpen(true)}>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Add Competitor
                  </Button>
                </div>
              </div>

              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center space-x-4">
                  {/* Search */}
                  <div className="relative flex-1 sm:w-80">
                    <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search competitors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Bulk Actions */}
                  <BulkActionsDropdown
                    selectedCompetitors={selectedCompetitors}
                    onBulkAction={handleBulkAction}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  {/* Select All */}
                  {filteredCompetitors.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSelectAll}
                    >
                      <Icon name={selectedCompetitors.length === filteredCompetitors.length ? "CheckSquare" : "Square"} size={16} className="mr-2" />
                      {selectedCompetitors.length === filteredCompetitors.length ? 'Deselect All' : 'Select All'}
                    </Button>
                  )}

                  {/* View Toggle */}
                  <div className="flex items-center border border-border rounded-lg p-1">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                    >
                      <Icon name="Grid3X3" size={16} />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                    >
                      <Icon name="List" size={16} />
                    </Button>
                  </div>

                  {/* Filter Toggle */}
                  <Button
                    variant="outline"
                    onClick={() => setFilterSidebarOpen(!filterSidebarOpen)}
                    className="hidden lg:flex"
                  >
                    <Icon name="Filter" size={16} className="mr-2" />
                    Filters
                    {(filters.status.length + filters.industry.length + (filters.lastActivity ? 1 : 0) + (filters.changeFrequency ? 1 : 0)) > 0 && (
                      <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                        {filters.status.length + filters.industry.length + (filters.lastActivity ? 1 : 0) + (filters.changeFrequency ? 1 : 0)}
                      </span>
                    )}
                  </Button>
                </div>
              </div>

              {/* Results Summary */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredCompetitors.length} of {competitors.length} competitors
                  {selectedCompetitors.length > 0 && (
                    <span className="ml-2">
                      • {selectedCompetitors.length} selected
                    </span>
                  )}
                </p>
                
                {/* Quick Stats */}
                <div className="hidden sm:flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-muted-foreground">
                      {competitors.filter(c => c.status === 'active').length} Active
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span className="text-muted-foreground">
                      {competitors.filter(c => c.status === 'paused').length} Paused
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-error rounded-full"></div>
                    <span className="text-muted-foreground">
                      {competitors.filter(c => c.status === 'error').length} Error
                    </span>
                  </div>
                </div>
              </div>

              {/* Competitors Grid/List */}
              {filteredCompetitors.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No competitors found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery ? 'Try adjusting your search terms or filters' : 'Get started by adding your first competitor'}
                  </p>
                  {!searchQuery && (
                    <Button onClick={() => setAddModalOpen(true)}>
                      <Icon name="Plus" size={16} className="mr-2" />
                      Add Your First Competitor
                    </Button>
                  )}
                </div>
              ) : (
                <div className={
                  viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' :'space-y-4'
                }>
                  {filteredCompetitors.map((competitor) => (
                    <div key={competitor.id} className="relative">
                      {/* Selection Checkbox */}
                      <div className="absolute top-4 left-4 z-10">
                        <input
                          type="checkbox"
                          checked={selectedCompetitors.includes(competitor.id)}
                          onChange={(e) => handleCompetitorSelect(competitor.id, e.target.checked)}
                          className="w-4 h-4 text-primary bg-card border-border rounded focus:ring-primary focus:ring-2"
                        />
                      </div>
                      
                      <CompetitorCard
                        competitor={competitor}
                        onEdit={handleEditCompetitor}
                        onViewChanges={handleViewChanges}
                        onToggleStatus={handleToggleStatus}
                        onDelete={handleDeleteCompetitor}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Filter Sidebar */}
          <FilterSidebar
            isOpen={filterSidebarOpen}
            onClose={() => setFilterSidebarOpen(false)}
            filters={filters}
            onFiltersChange={setFilters}
          />
        </div>
      </main>

      {/* Modals */}
      <AddCompetitorModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddCompetitor}
      />

      <CompetitorDetailModal
        competitor={selectedCompetitor}
        isOpen={detailModalOpen}
        onClose={() => {
          setDetailModalOpen(false);
          setSelectedCompetitor(null);
        }}
        onSave={handleSaveCompetitor}
      />
    </div>
  );
};

export default CompetitorManagement;