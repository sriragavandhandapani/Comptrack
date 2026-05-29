import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const companyLogos = [
    { name: 'Stripe', logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop' },
    { name: 'Shopify', logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop' },
    { name: 'Notion', logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop' },
    { name: 'Linear', logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop' },
    { name: 'Figma', logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop' },
    { name: 'Vercel', logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop' }
  ];

  const testimonials = [
    {
      id: 1,
      content: "Competitor Tracker has transformed how we stay ahead of the market. The AI-powered insights save us hours of manual research every week.",
      author: "Sarah Chen",
      role: "Head of Product",
      company: "TechFlow",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=48&h=48&fit=crop&crop=face"
    },
    {
      id: 2,
      content: "The Slack integration is a game-changer. Our entire team stays informed about competitor moves without leaving our workflow.",
      author: "Marcus Rodriguez",
      role: "Product Manager",
      company: "DataViz Pro",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face"
    },
    {
      id: 3,
      content: "Finally, a tool that actually understands what matters. The impact scoring helps us prioritize which changes to act on immediately.",
      author: "Emily Watson",
      role: "VP of Strategy",
      company: "CloudSync",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face"
    }
  ];

  const securityBadges = [
    { icon: 'Shield', label: 'SOC 2 Type II', description: 'Certified' },
    { icon: 'Lock', label: 'GDPR', description: 'Compliant' },
    { icon: 'Key', label: 'ISO 27001', description: 'Certified' },
    { icon: 'CheckCircle', label: '99.9%', description: 'Uptime SLA' }
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        {/* Company Logos */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-muted-foreground mb-8 uppercase tracking-wider">
            Trusted by product teams at
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-60">
            {companyLogos.map((company, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="bg-white px-6 py-3 rounded-lg border border-border shadow-sm">
                  <span className="text-lg font-semibold text-foreground">{company.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Loved by product teams
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our customers say about staying ahead of the competition
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-xl border border-border shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image 
                      src={testimonial.avatar} 
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Badges */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-8">
            Enterprise-grade security & reliability
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {securityBadges.map((badge, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-border shadow-sm">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name={badge.icon} size={24} className="text-success" />
                </div>
                <div className="font-semibold text-foreground mb-1">{badge.label}</div>
                <div className="text-sm text-muted-foreground">{badge.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;