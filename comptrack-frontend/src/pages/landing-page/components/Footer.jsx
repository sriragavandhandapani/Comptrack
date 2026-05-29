import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Integrations', href: '/integration-settings' },
        { label: 'API Documentation', href: '#' },
        { label: 'Changelog', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#about' },
        { label: 'Careers', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Press Kit', href: '#' },
        { label: 'Contact', href: '#' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Help Center', href: '#' },
        { label: 'Community', href: '#' },
        { label: 'Guides', href: '#' },
        { label: 'Webinars', href: '#' },
        { label: 'Status Page', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Cookie Policy', href: '#' },
        { label: 'GDPR', href: '#' },
        { label: 'Security', href: '#' }
      ]
    }
  ];

  const socialLinks = [
    { icon: 'Twitter', href: '#', label: 'Twitter' },
    { icon: 'Linkedin', href: '#', label: 'LinkedIn' },
    { icon: 'Github', href: '#', label: 'GitHub' },
    { icon: 'Youtube', href: '#', label: 'YouTube' }
  ];

  const handleLinkClick = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href.startsWith('/')) {
      navigate(href);
    } else {
      window.open(href, '_blank', 'noopener noreferrer');
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription submitted');
  };

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={20} color="white" />
              </div>
              <span className="text-xl font-bold">Competitor Tracker</span>
            </div>
            
            <p className="text-slate-300 mb-6 leading-relaxed">
              Never miss a competitor move. Get AI-powered insights delivered to your team's workflow with automated tracking and intelligent analysis.
            </p>

            {/* Newsletter Signup */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Stay updated</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <Button variant="default" type="submit">
                  Subscribe
                </Button>
              </form>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <button
                  key={social.icon}
                  onClick={() => handleLinkClick(social.href)}
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors duration-200"
                  aria-label={social.label}
                >
                  <Icon name={social.icon} size={20} className="text-slate-300" />
                </button>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="text-slate-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-sm">
              © {currentYear} Competitor Tracker. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2 text-slate-400">
                <Icon name="Shield" size={16} className="text-success" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Icon name="Lock" size={16} className="text-success" />
                <span>GDPR Ready</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;