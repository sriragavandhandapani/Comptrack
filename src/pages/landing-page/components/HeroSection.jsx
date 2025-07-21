import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';


const HeroSection = () => {
  const navigate = useNavigate();

  const handleStartTrial = () => {
    navigate('/register');
  };

  const handleWatchDemo = () => {
    console.log('Opening demo video...');
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Icon name="Zap" size={16} className="mr-2" />
              AI-Powered Competitor Intelligence
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Never miss a{' '}
              <span className="text-primary relative">
                move
                <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 100 12" fill="none">
                  <path d="M2 10C20 2 40 2 60 6C80 10 90 4 98 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              Automatically track competitor product updates, pricing changes, and feature releases. Get AI-powered weekly summaries delivered to your Slack and Notion workspace.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button 
                variant="default" 
                size="lg"
                onClick={handleStartTrial}
                iconName="ArrowRight"
                iconPosition="right"
                className="text-lg px-8 py-4"
              >
                Start Free Trial
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleWatchDemo}
                iconName="Play"
                iconPosition="left"
                className="text-lg px-8 py-4"
              >
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Icon name="Shield" size={16} className="mr-2 text-success" />
                SOC 2 Compliant
              </div>
              <div className="flex items-center">
                <Icon name="Clock" size={16} className="mr-2 text-success" />
                14-day free trial
              </div>
              <div className="flex items-center">
                <Icon name="CreditCard" size={16} className="mr-2 text-success" />
                No credit card required
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 border border-border">
              {/* Mock Dashboard */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Competitor Updates</h3>
                  <div className="flex items-center text-sm text-success">
                    <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                    Live tracking
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border-l-4 border-primary">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="Sparkles" size={16} color="white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Figma launched AI design assistant</p>
                      <p className="text-xs text-muted-foreground">2 hours ago • High impact</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg border-l-4 border-warning">
                    <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center">
                      <Icon name="DollarSign" size={16} color="white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Notion updated pricing tiers</p>
                      <p className="text-xs text-muted-foreground">5 hours ago • Medium impact</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border-l-4 border-success">
                    <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                      <Icon name="Code" size={16} color="white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Linear shipped new API endpoints</p>
                      <p className="text-xs text-muted-foreground">1 day ago • Low impact</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-medium shadow-lg">
              <div className="flex items-center">
                <Icon name="Bell" size={14} className="mr-1" />
                Real-time alerts
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-success text-success-foreground px-3 py-2 rounded-lg text-sm font-medium shadow-lg">
              <div className="flex items-center">
                <Icon name="TrendingUp" size={14} className="mr-1" />
                AI Analysis
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;