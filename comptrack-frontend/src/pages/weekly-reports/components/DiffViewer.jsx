import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DiffViewer = ({ isOpen, onClose, diffData }) => {
  const [viewMode, setViewMode] = useState('side-by-side'); // 'side-by-side' or 'unified'

  if (!isOpen || !diffData) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-[1030] flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Change Comparison
              </h3>
              <p className="text-sm text-muted-foreground">
                {diffData.competitor} • {diffData.changeType} • {diffData.date}
              </p>
            </div>
            <div className={`px-2 py-1 rounded text-xs font-medium ${
              diffData.impact === 'high' ? 'bg-error/10 text-error' :
              diffData.impact === 'medium'? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
            }`}>
              {diffData.impact} Impact
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === 'side-by-side' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('side-by-side')}
                className="h-8 px-3"
              >
                <Icon name="Columns" size={14} className="mr-1" />
                Side by Side
              </Button>
              <Button
                variant={viewMode === 'unified' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('unified')}
                className="h-8 px-3"
              >
                <Icon name="AlignLeft" size={14} className="mr-1" />
                Unified
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {viewMode === 'side-by-side' ? (
            <div className="grid grid-cols-2 h-full">
              {/* Before */}
              <div className="border-r border-border">
                <div className="p-3 bg-error/5 border-b border-border">
                  <div className="flex items-center space-x-2">
                    <Icon name="Minus" size={16} className="text-error" />
                    <span className="text-sm font-medium text-foreground">Before</span>
                    <span className="text-xs text-muted-foreground">
                      {diffData.beforeDate}
                    </span>
                  </div>
                </div>
                <div className="p-4 h-full overflow-auto">
                  {diffData.changeType === 'ui' ? (
                    <div className="space-y-4">
                      <img 
                        src={diffData.beforeImage} 
                        alt="Before state"
                        className="w-full border border-border rounded-lg"
                      />
                      <div className="text-sm text-muted-foreground">
                        <div className="font-medium mb-2">Previous Design:</div>
                        <ul className="space-y-1 text-xs">
                          {diffData.beforeFeatures.map((feature, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="text-error">-</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : diffData.changeType === 'pricing' ? (
                    <div className="space-y-4">
                      <div className="bg-error/5 border border-error/20 rounded-lg p-4">
                        <div className="text-2xl font-bold text-error mb-2">
                          ${diffData.beforePrice}/month
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Previous pricing structure
                        </div>
                      </div>
                      <div className="space-y-2">
                        {diffData.beforePricingFeatures.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <Icon name="X" size={14} className="text-error" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-sm text-muted-foreground">
                        <div className="font-medium mb-2">Previous Features:</div>
                        <div className="space-y-2">
                          {diffData.beforeContent.split('\n').map((line, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <span className="text-error">-</span>
                              <span>{line}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* After */}
              <div>
                <div className="p-3 bg-success/5 border-b border-border">
                  <div className="flex items-center space-x-2">
                    <Icon name="Plus" size={16} className="text-success" />
                    <span className="text-sm font-medium text-foreground">After</span>
                    <span className="text-xs text-muted-foreground">
                      {diffData.afterDate}
                    </span>
                  </div>
                </div>
                <div className="p-4 h-full overflow-auto">
                  {diffData.changeType === 'ui' ? (
                    <div className="space-y-4">
                      <img 
                        src={diffData.afterImage} 
                        alt="After state"
                        className="w-full border border-border rounded-lg"
                      />
                      <div className="text-sm text-muted-foreground">
                        <div className="font-medium mb-2">New Design:</div>
                        <ul className="space-y-1 text-xs">
                          {diffData.afterFeatures.map((feature, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="text-success">+</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : diffData.changeType === 'pricing' ? (
                    <div className="space-y-4">
                      <div className="bg-success/5 border border-success/20 rounded-lg p-4">
                        <div className="text-2xl font-bold text-success mb-2">
                          ${diffData.afterPrice}/month
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Updated pricing structure
                        </div>
                      </div>
                      <div className="space-y-2">
                        {diffData.afterPricingFeatures.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <Icon name="Check" size={14} className="text-success" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-sm text-muted-foreground">
                        <div className="font-medium mb-2">New Features:</div>
                        <div className="space-y-2">
                          {diffData.afterContent.split('\n').map((line, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <span className="text-success">+</span>
                              <span>{line}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full overflow-auto">
              <div className="p-4 space-y-4">
                {diffData.changeType === 'ui' ? (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-foreground mb-2 flex items-center">
                          <Icon name="Minus" size={14} className="text-error mr-2" />
                          Before
                        </div>
                        <img 
                          src={diffData.beforeImage} 
                          alt="Before state"
                          className="w-full border border-border rounded-lg"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground mb-2 flex items-center">
                          <Icon name="Plus" size={14} className="text-success mr-2" />
                          After
                        </div>
                        <img 
                          src={diffData.afterImage} 
                          alt="After state"
                          className="w-full border border-border rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-foreground">Changes Summary:</div>
                      <div className="text-sm text-muted-foreground">
                        {diffData.summary}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-sm font-medium text-foreground">
                      Change Summary:
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {diffData.summary}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              Detected on {diffData.detectedDate} • Impact: {diffData.impact}
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Icon name="ExternalLink" size={14} className="mr-2" />
                View Source
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Download" size={14} className="mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiffViewer;