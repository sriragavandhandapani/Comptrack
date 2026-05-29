import React, { useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductShowcase from './components/ProductShowcase';
import TrustSignals from './components/TrustSignals';
import FeatureHighlights from './components/FeatureHighlights';
import PricingPreview from './components/PricingPreview';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

const LandingPage = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = 'Competitor Tracker - Never Miss a Move';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'AI-powered competitor intelligence platform for product managers. Track competitor updates, get insights delivered to Slack & Notion. Start free trial today.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection />
        <ProductShowcase />
        <TrustSignals />
        
        <div id="features">
          <FeatureHighlights />
        </div>
        
        <div id="pricing">
          <PricingPreview />
        </div>
        
        <CallToAction />
      </main>
      
      <div id="about">
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;