import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QuickAddCompetitorCard = ({ onAddCompetitor }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    type: 'website'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.website.trim()) return;
    
    setIsLoading(true);
    try {
      await onAddCompetitor(formData);
      setFormData({ name: '', website: '', type: 'website' });
      setIsExpanded(false);
    } catch (error) {
      console.error('Error adding competitor:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isExpanded) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Plus" size={24} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Quick Add Competitor</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Start tracking a new competitor in seconds
          </p>
          <Button 
            variant="default" 
            fullWidth
            onClick={() => setIsExpanded(true)}
          >
            Add Competitor
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Add New Competitor</h3>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsExpanded(false)}
        >
          <Icon name="X" size={16} />
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Company Name"
          type="text"
          placeholder="e.g., Acme Corp"
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
        
        <div className="flex items-center space-x-2 pt-2">
          <Button
            type="submit"
            variant="default"
            loading={isLoading}
            disabled={!formData.name.trim() || !formData.website.trim()}
            className="flex-1"
          >
            Add Competitor
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsExpanded(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QuickAddCompetitorCard;