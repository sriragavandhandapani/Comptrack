import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const SubscriptionSettings = ({ isOpen, onClose, currentSettings, onSave }) => {
  const [settings, setSettings] = useState(currentSettings || {
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

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  const frequencyOptions = [
    { value: 'daily', label: 'Daily', description: 'Get updates every day' },
    { value: 'weekly', label: 'Weekly', description: 'Get updates once per week' },
    { value: 'biweekly', label: 'Bi-weekly', description: 'Get updates every two weeks' },
    { value: 'monthly', label: 'Monthly', description: 'Get updates once per month' }
  ];

  const dayOptions = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
  ];

  const competitors = [
    { id: 'figma', name: 'Figma' },
    { id: 'sketch', name: 'Sketch' },
    { id: 'adobe-xd', name: 'Adobe XD' },
    { id: 'invision', name: 'InVision' },
    { id: 'framer', name: 'Framer' }
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-[1030] flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Subscription Settings
            </h3>
            <p className="text-sm text-muted-foreground">
              Configure your report delivery preferences
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* Delivery Frequency */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Delivery Frequency</h4>
            <div className="space-y-3">
              {frequencyOptions.map((option) => (
                <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="frequency"
                    value={option.value}
                    checked={settings.frequency === option.value}
                    onChange={(e) => setSettings({ ...settings, frequency: e.target.value })}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-sm text-foreground">{option.label}</div>
                    <div className="text-xs text-muted-foreground">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Delivery Schedule */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Delivery Schedule</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Day of Week
                </label>
                <select
                  value={settings.deliveryDay}
                  onChange={(e) => setSettings({ ...settings, deliveryDay: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {dayOptions.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Input
                  label="Time"
                  type="time"
                  value={settings.deliveryTime}
                  onChange={(e) => setSettings({ ...settings, deliveryTime: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Delivery Channels */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Delivery Channels</h4>
            <div className="space-y-3">
              <Checkbox
                label="Email Notifications"
                checked={settings.emailEnabled}
                onChange={(e) => setSettings({ ...settings, emailEnabled: e.target.checked })}
              />
              <Checkbox
                label="Slack Integration"
                checked={settings.slackEnabled}
                onChange={(e) => setSettings({ ...settings, slackEnabled: e.target.checked })}
              />
              <Checkbox
                label="Notion Integration"
                checked={settings.notionEnabled}
                onChange={(e) => setSettings({ ...settings, notionEnabled: e.target.checked })}
              />
            </div>

            {settings.emailEnabled && (
              <div className="mt-4">
                <Input
                  label="Custom Email (Optional)"
                  type="email"
                  placeholder="custom@company.com"
                  description="Leave empty to use your account email"
                  value={settings.customEmail}
                  onChange={(e) => setSettings({ ...settings, customEmail: e.target.value })}
                />
              </div>
            )}
          </div>

          {/* Impact Levels */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Include Impact Levels</h4>
            <div className="space-y-3">
              <Checkbox
                label="High Impact Changes"
                description="Critical updates that require immediate attention"
                checked={settings.includeHighImpact}
                onChange={(e) => setSettings({ ...settings, includeHighImpact: e.target.checked })}
              />
              <Checkbox
                label="Medium Impact Changes"
                description="Important updates worth monitoring"
                checked={settings.includeMediumImpact}
                onChange={(e) => setSettings({ ...settings, includeMediumImpact: e.target.checked })}
              />
              <Checkbox
                label="Low Impact Changes"
                description="Minor updates and cosmetic changes"
                checked={settings.includeLowImpact}
                onChange={(e) => setSettings({ ...settings, includeLowImpact: e.target.checked })}
              />
            </div>
          </div>

          {/* Competitor Selection */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Competitor Focus</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Select specific competitors to include in reports (leave empty for all)
            </p>
            <div className="space-y-2">
              {competitors.map((competitor) => (
                <Checkbox
                  key={competitor.id}
                  label={competitor.name}
                  checked={settings.competitors.includes(competitor.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSettings({
                        ...settings,
                        competitors: [...settings.competitors, competitor.id]
                      });
                    } else {
                      setSettings({
                        ...settings,
                        competitors: settings.competitors.filter(id => id !== competitor.id)
                      });
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              Changes will take effect from the next scheduled report
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Icon name="Save" size={16} className="mr-2" />
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSettings;