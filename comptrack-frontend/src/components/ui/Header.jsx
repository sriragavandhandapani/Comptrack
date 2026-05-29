import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';


const Header = () => {
  const location = useLocation();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, title: 'New competitor activity detected', time: '2 min ago', type: 'info' },
    { id: 2, title: 'Weekly report ready for review', time: '1 hour ago', type: 'success' },
    { id: 3, title: 'Integration sync completed', time: '3 hours ago', type: 'success' }
  ]);
  
  const searchRef = useRef(null);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchExpanded(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const unreadCount = notifications.filter(n => n.type === 'info').length;

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-card border-b border-border h-16">
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              Competitor Tracker
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8" ref={searchRef}>
          <div className="relative">
            {/* Desktop Search */}
            <div className="hidden md:block">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <Icon 
                    name="Search" 
                    size={20} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                  />
                  <input
                    type="text"
                    placeholder="Search competitors, reports, or changes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                  />
                </div>
              </form>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden">
              {isSearchExpanded ? (
                <form onSubmit={handleSearchSubmit} className="absolute right-0 top-0 w-64 z-10">
                  <div className="relative">
                    <Icon 
                      name="Search" 
                      size={20} 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                    />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-10 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring shadow-modal"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setIsSearchExpanded(false)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <Icon name="X" size={16} className="text-muted-foreground" />
                    </button>
                  </div>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchExpanded(true)}
                >
                  <Icon name="Search" size={20} />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNotificationClick}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>

            {isNotificationOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-modal z-[1010]">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium text-popover-foreground">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors duration-200">
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'success' ? 'bg-success' : 
                          notification.type === 'info' ? 'bg-accent' : 'bg-muted-foreground'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm text-popover-foreground">{notification.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <Button variant="ghost" size="sm" fullWidth>
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleProfileClick}
              className="rounded-full"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
            </Button>

            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-modal z-[1010]">
                <div className="p-4 border-b border-border">
                  <p className="font-medium text-popover-foreground">John Smith</p>
                  <p className="text-sm text-muted-foreground">john.smith@company.com</p>
                </div>
                <div className="p-2">
                  <Button variant="ghost" size="sm" fullWidth className="justify-start">
                    <Icon name="User" size={16} className="mr-2" />
                    Profile Settings
                  </Button>
                  <Button variant="ghost" size="sm" fullWidth className="justify-start">
                    <Icon name="Settings" size={16} className="mr-2" />
                    Account Settings
                  </Button>
                  <Button variant="ghost" size="sm" fullWidth className="justify-start">
                    <Icon name="CreditCard" size={16} className="mr-2" />
                    Subscription
                  </Button>
                  <div className="border-t border-border my-2" />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    fullWidth 
                    className="justify-start text-error hover:text-error hover:bg-error/10"
                    onClick={handleLogout}
                  >
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;