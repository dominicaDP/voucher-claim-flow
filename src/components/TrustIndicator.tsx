
import React from 'react';
import { Shield } from 'lucide-react';

const TrustIndicator: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-2 pt-4 border-t border-brand-dark-blue/10">
      <Shield className="w-4 h-4 text-brand-dark-blue/60" />
      <p className="text-xs text-brand-dark-blue/60">
        Your email will only be used for voucher delivery and rewards
      </p>
    </div>
  );
};

export default TrustIndicator;
