import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportCard = ({ report, onViewDetails, onExport }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getImpactColor = (impact) => {
    switch (impact.toLowerCase()) {
      case 'high':
        return 'text-error bg-error/10';
      case 'medium':
        return 'text-warning bg-warning/10';
      case 'low':
        return 'text-success bg-success/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getChangeTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'ui':
        return 'Palette';
      case 'pricing':
        return 'DollarSign';
      case 'features':
        return 'Zap';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-foreground">
                Week of {report.weekStart}
              </h3>
              <p className="text-sm text-muted-foreground">
                {report.dateRange}
              </p>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              report.status === 'completed' ? 'bg-success/10 text-success' : 
              report.status === 'processing'? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
            }`}>
              {report.status === 'completed' ? 'Complete' : 
               report.status === 'processing' ? 'Processing' : 'Draft'}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onExport(report.id)}
            >
              <Icon name="Download" size={16} className="mr-2" />
              Export
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Icon 
                name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                size={20} 
              />
            </Button>
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {report.metrics.totalChanges}
            </div>
            <div className="text-xs text-muted-foreground">Total Changes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-error">
              {report.metrics.highImpact}
            </div>
            <div className="text-xs text-muted-foreground">High Impact</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">
              {report.metrics.newFeatures}
            </div>
            <div className="text-xs text-muted-foreground">New Features</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">
              {report.metrics.pricingChanges}
            </div>
            <div className="text-xs text-muted-foreground">Pricing Updates</div>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-6 space-y-6">
          {/* Executive Summary */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Executive Summary</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {report.executiveSummary}
            </p>
          </div>

          {/* Competitor Breakdown */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Competitor Activity</h4>
            <div className="space-y-3">
              {report.competitorBreakdown.map((competitor) => (
                <div key={competitor.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {competitor.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-sm text-foreground">
                        {competitor.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {competitor.changesCount} changes detected
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {competitor.changeTypes.map((type) => (
                      <div
                        key={type}
                        className="flex items-center space-x-1 px-2 py-1 bg-background rounded text-xs"
                      >
                        <Icon 
                          name={getChangeTypeIcon(type)} 
                          size={12} 
                          className="text-muted-foreground" 
                        />
                        <span className="text-muted-foreground capitalize">{type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Changes */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Key Changes</h4>
            <div className="space-y-3">
              {report.keyChanges.map((change) => (
                <div key={change.id} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(change.impact)}`}>
                    {change.impact}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon 
                        name={getChangeTypeIcon(change.type)} 
                        size={14} 
                        className="text-muted-foreground" 
                      />
                      <span className="text-sm font-medium text-foreground">
                        {change.competitor}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {change.date}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {change.description}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(change.id)}
                  >
                    <Icon name="ExternalLink" size={14} />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Integration Previews */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Slack Preview */}
            <div>
              <h4 className="font-medium text-foreground mb-3 flex items-center">
                <Icon name="MessageSquare" size={16} className="mr-2" />
                Slack Summary
              </h4>
              <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-accent">
                <div className="text-xs text-muted-foreground mb-2">
                  #competitive-intel
                </div>
                <div className="text-sm text-foreground">
                  📊 Weekly Competitor Report - {report.weekStart}
                  \n\n🔥 {report.metrics.highImpact} high-impact changes detected
                  \n💡 {report.metrics.newFeatures} new features launched
                  \n💰 {report.metrics.pricingChanges} pricing updates
                  \n\nTop competitor: {report.competitorBreakdown[0]?.name} ({report.competitorBreakdown[0]?.changesCount} changes)
                </div>
              </div>
            </div>

            {/* Notion Preview */}
            <div>
              <h4 className="font-medium text-foreground mb-3 flex items-center">
                <Icon name="FileText" size={16} className="mr-2" />
                Notion Summary
              </h4>
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="text-sm font-medium text-foreground mb-2">
                  Competitive Intelligence - {report.weekStart}
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>📈 Market Activity: {report.metrics.totalChanges} total changes</div>
                  <div>🎯 Priority Items: {report.metrics.highImpact} high-impact updates</div>
                  <div>🚀 Innovation Tracker: {report.metrics.newFeatures} new features</div>
                  <div>💼 Pricing Intelligence: {report.metrics.pricingChanges} updates</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportCard;