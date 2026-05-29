import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationBenefits = () => {
  const benefits = [
    {
      icon: 'Eye',
      title: 'Automated Monitoring',
      description: 'Track competitor websites, GitHub repos, and pricing pages 24/7'
    },
    {
      icon: 'FileText',
      title: 'Weekly Intelligence Reports',
      description: 'Get comprehensive summaries delivered to your inbox every week'
    },
    {
      icon: 'Zap',
      title: 'Real-time Alerts',
      description: 'Instant notifications for major feature releases and pricing changes'
    },
    {
      icon: 'Users',
      title: 'Team Collaboration',
      description: 'Share insights and collaborate with your product team seamlessly'
    }
  ];

  return (
    <div className="hidden lg:flex lg:flex-col lg:justify-center lg:px-12 xl:px-16">
      <div className="max-w-md">
        <h2 className="text-3xl font-bold text-white mb-4">
          Never Miss a Competitor Move
        </h2>
        <p className="text-lg text-white/80 mb-8">
          Stay ahead of the competition with automated monitoring and intelligent reporting
        </p>
        
        <div className="space-y-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <Icon name={benefit.icon} size={20} color="white" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">
                  {benefit.title}
                </h3>
                <p className="text-sm text-white/70">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} color="white" />
              <span className="text-sm text-white/80">Enterprise Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={16} color="white" />
              <span className="text-sm text-white/80">SOC 2 Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationBenefits;