import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CallToAction = () => {
  const navigate = useNavigate();

  const handleStartTrial = () => {
    navigate('/register');
  };

  const handleScheduleDemo = () => {
    console.log('Opening demo scheduler...');
  };

  const benefits = [
    { icon: 'Clock', text: '14-day free trial' },
    { icon: 'CreditCard', text: 'No credit card required' },
    { icon: 'Users', text: 'Setup in under 5 minutes' },
    { icon: 'Shield', text: 'Cancel anytime' }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-accent relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main CTA Content */}
          <div className="mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to stay ahead of your competition?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Join thousands of product managers who never miss a competitor move. 
              Start your free trial today and see the difference AI-powered intelligence makes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                variant="secondary"
                size="lg"
                onClick={handleStartTrial}
                iconName="ArrowRight"
                iconPosition="right"
                className="text-lg px-8 py-4 bg-white text-primary hover:bg-slate-50"
              >
                Start Free Trial
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={handleScheduleDemo}
                iconName="Calendar"
                iconPosition="left"
                className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10"
              >
                Schedule Demo
              </Button>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                    <Icon name={benefit.icon} size={24} className="text-white" />
                  </div>
                  <span className="text-primary-foreground/90 text-sm font-medium">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Proof */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-primary-foreground/80">
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-3">
                  <div className="w-8 h-8 bg-white rounded-full border-2 border-primary"></div>
                  <div className="w-8 h-8 bg-slate-200 rounded-full border-2 border-primary"></div>
                  <div className="w-8 h-8 bg-slate-300 rounded-full border-2 border-primary"></div>
                </div>
                <span className="text-sm">500+ teams already tracking</span>
              </div>
              
              <div className="flex items-center">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-yellow-300 fill-current" />
                  ))}
                </div>
                <span className="text-sm">4.9/5 customer rating</span>
              </div>
              
              <div className="flex items-center">
                <Icon name="TrendingUp" size={16} className="mr-2" />
                <span className="text-sm">10,000+ changes tracked daily</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;