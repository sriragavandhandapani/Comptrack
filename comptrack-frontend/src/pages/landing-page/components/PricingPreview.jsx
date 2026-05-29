import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PricingPreview = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Starter',
      price: 49,
      period: 'month',
      description: 'Perfect for small teams getting started with competitor tracking',
      features: [
        'Track up to 5 competitors',
        'Weekly Slack notifications',
        'Basic change detection',
        'Email support',
        '14-day free trial'
      ],
      popular: false,
      cta: 'Start Free Trial'
    },
    {
      name: 'Professional',
      price: 149,
      period: 'month',
      description: 'Advanced features for growing product teams',
      features: [
        'Track up to 25 competitors',
        'Real-time Slack alerts',
        'Notion integration',
        'AI impact scoring',
        'Custom alert rules',
        'Priority support',
        '14-day free trial'
      ],
      popular: true,
      cta: 'Start Free Trial'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Tailored solution for large organizations',
      features: [
        'Unlimited competitors',
        'Custom integrations',
        'Advanced analytics',
        'Team collaboration',
        'SLA guarantee',
        'Dedicated success manager',
        'Custom onboarding'
      ],
      popular: false,
      cta: 'Contact Sales'
    }
  ];

  const handlePlanSelect = (plan) => {
    if (plan.name === 'Enterprise') {
      console.log('Opening contact sales...');
    } else {
      navigate('/register');
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-success/10 text-success rounded-full text-sm font-medium mb-6">
            <Icon name="DollarSign" size={16} className="mr-2" />
            Simple Pricing
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Choose your plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Start with a 14-day free trial. No credit card required. 
            Upgrade or downgrade at any time.
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-muted rounded-lg p-1">
            <button className="px-4 py-2 text-sm font-medium bg-white text-foreground rounded-md shadow-sm">
              Monthly
            </button>
            <button className="px-4 py-2 text-sm font-medium text-muted-foreground">
              Annual
              <span className="ml-2 text-xs bg-success text-success-foreground px-2 py-1 rounded">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`
                relative bg-white rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-lg
                ${plan.popular 
                  ? 'border-primary shadow-lg scale-105' 
                  : 'border-border hover:border-primary/50'
                }
              `}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <div className="mb-4">
                  {typeof plan.price === 'number' ? (
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                      <span className="text-muted-foreground ml-1">/{plan.period}</span>
                    </div>
                  ) : (
                    <div className="text-4xl font-bold text-foreground">{plan.price}</div>
                  )}
                </div>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Icon name="Check" size={16} className="text-success mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "default" : "outline"}
                size="lg"
                fullWidth
                onClick={() => handlePlanSelect(plan)}
                className="text-base"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* FAQ Preview */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Have questions about our pricing?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="ghost" iconName="MessageCircle" iconPosition="left">
              View FAQ
            </Button>
            <Button variant="ghost" iconName="Calendar" iconPosition="left">
              Schedule Demo
            </Button>
            <Button variant="ghost" iconName="Mail" iconPosition="left">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPreview;