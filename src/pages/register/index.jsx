import React from 'react';
import { Link } from 'react-router-dom';
import RegistrationHeader from './components/RegistrationHeader';
import SocialRegistration from './components/SocialRegistration';
import RegistrationForm from './components/RegistrationForm';
import RegistrationBenefits from './components/RegistrationBenefits';
import Icon from '../../components/AppIcon';

const Register = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="relative z-10 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/landing-page" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">
                Competitor Tracker
              </span>
            </Link>

            {/* Login Link */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Already have an account?
              </span>
              <Link 
                to="/login"
                className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Left Side - Registration Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="w-full max-w-md">
            <RegistrationHeader />
            <div className="bg-card border border-border rounded-xl shadow-sm p-8">
              <SocialRegistration />
              <RegistrationForm />
            </div>
            
            {/* Footer Links */}
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <Link 
                  to="/terms" 
                  className="hover:text-foreground transition-colors duration-200"
                >
                  Terms of Service
                </Link>
                <Link 
                  to="/privacy" 
                  className="hover:text-foreground transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
                <Link 
                  to="/support" 
                  className="hover:text-foreground transition-colors duration-200"
                >
                  Support
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Benefits Section */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary/80">
            <div className="absolute inset-0 bg-black/20" />
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </div>
          <div className="relative h-full flex items-center">
            <RegistrationBenefits />
          </div>
        </div>
      </div>

      {/* Mobile Benefits Section */}
      <div className="lg:hidden bg-muted/30 py-16 px-4">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            Why Choose Competitor Tracker?
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Eye" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Automated Monitoring
                </h3>
                <p className="text-sm text-muted-foreground">
                  Track competitor websites, GitHub repos, and pricing pages 24/7
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="FileText" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Weekly Intelligence Reports
                </h3>
                <p className="text-sm text-muted-foreground">
                  Get comprehensive summaries delivered to your inbox every week
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Real-time Alerts
                </h3>
                <p className="text-sm text-muted-foreground">
                  Instant notifications for major feature releases and pricing changes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;