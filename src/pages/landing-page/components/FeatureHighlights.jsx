import React from 'react';
import Icon from '../../../components/AppIcon';

const FeatureHighlights = () => {
  const features = [
    {
      icon: 'Bot',
      title: 'Automated Tracking',
      description: 'Our AI continuously monitors competitor websites, GitHub repositories, and pricing pages 24/7, so you never miss important updates.',
      highlights: [
        'Real-time change detection',
        'Multi-source monitoring',
        'Smart filtering algorithms',
        'Zero manual effort required'
      ]
    },
    {
      icon: 'Brain',
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning analyzes changes and provides impact scoring, helping you focus on what matters most to your product strategy.',
      highlights: [
        'Intelligent impact scoring',
        'Change categorization',
        'Trend identification',
        'Strategic recommendations'
      ]
    },
    {
      icon: 'Zap',
      title: 'Seamless Integrations',
      description: 'Get insights delivered directly to your existing workflow through Slack notifications and beautifully formatted Notion reports.',
      highlights: [
        'Slack real-time alerts',
        'Notion weekly summaries',
        'Custom notification rules',
        'Team collaboration features'
      ]
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Changes Tracked Daily', icon: 'Activity' },
    { number: '500+', label: 'Product Teams', icon: 'Users' },
    { number: '99.9%', label: 'Accuracy Rate', icon: 'Target' },
    { number: '2min', label: 'Average Alert Time', icon: 'Clock' }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <Icon name="Sparkles" size={16} className="mr-2" />
            Core Features
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Everything you need to stay ahead
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From automated monitoring to intelligent analysis, we've built the complete solution 
            for competitive intelligence that actually works.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-card border border-border rounded-2xl p-8 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon name={feature.icon} size={32} className="text-primary" />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                <ul className="space-y-3">
                  {feature.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <Icon name="Check" size={16} className="text-success mr-3 flex-shrink-0" />
                      <span className="text-foreground">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Trusted by teams worldwide
            </h3>
            <p className="text-primary-foreground/80 text-lg">
              Join thousands of product managers who rely on our platform
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name={stat.icon} size={24} className="text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-primary-foreground/80 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;