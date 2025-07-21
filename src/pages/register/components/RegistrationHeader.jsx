import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const RegistrationHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Icon name="TrendingUp" size={24} color="white" />
          </div>
          <span className="text-2xl font-bold text-foreground">
            Competitor Tracker
          </span>
        </div>
      </div>

      {/* Header Content */}
      <div className="space-y-2 mb-6">
        <h1 className="text-3xl font-bold text-foreground">
          Create Your Account
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Join thousands of Product Managers who never miss a competitor move
        </p>
      </div>

      {/* Login Link */}
      <div className="text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link 
          to="/login" 
          className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
        >
          Sign in here
        </Link>
      </div>
    </div>
  );
};

export default RegistrationHeader;