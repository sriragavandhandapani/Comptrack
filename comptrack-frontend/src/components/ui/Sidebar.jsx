import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Overview and metrics'
    },
    {
      label: 'Competitors',
      path: '/competitor-management',
      icon: 'Users',
      tooltip: 'Manage tracked competitors'
    },
    {
      label: 'Reports',
      path: '/weekly-reports',
      icon: 'FileText',
      tooltip: 'Weekly intelligence reports'
    },
    {
      label: 'Integrations',
      path: '/integration-settings',
      icon: 'Puzzle',
      tooltip: 'Slack and Notion settings'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 768) {
      onToggle();
    }
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[1020] lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-card border-r border-border z-[1020] lg:z-[1000]
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const isActive = isActivePath(item.path);
                return (
                  <div
                    key={item.path}
                    className="relative"
                    onMouseEnter={() => setHoveredItem(item.path)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="default"
                      fullWidth
                      className={`
                        justify-start h-11 px-3 transition-all duration-200
                        ${isActive 
                          ? 'bg-primary text-primary-foreground shadow-sm' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }
                      `}
                      onClick={() => handleNavigation(item.path)}
                    >
                      <Icon 
                        name={item.icon} 
                        size={20} 
                        className="mr-3 flex-shrink-0" 
                      />
                      <span className="font-medium">{item.label}</span>
                    </Button>

                    {/* Tooltip */}
                    {hoveredItem === item.path && (
                      <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-popover border border-border rounded text-xs text-popover-foreground shadow-modal whitespace-nowrap z-[1015] hidden lg:block">
                        {item.tooltip}
                        <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-border" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="text-xs text-muted-foreground text-center">
              <p>Competitor Feature Tracker</p>
              <p className="mt-1">v2.1.0</p>
            </div>
          </div>
        </div>

        {/* Mobile Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 lg:hidden"
          onClick={onToggle}
        >
          <Icon name="X" size={20} />
        </Button>
      </aside>
    </>
  );
};

export default Sidebar;