
import React from 'react';
import { Gift } from 'lucide-react';

interface VoucherDisplayProps {
  value: string;
  clientName: string;
}

const VoucherDisplay: React.FC<VoucherDisplayProps> = ({ value, clientName }) => {
  return (
    <div className="space-y-4">
      <div className="mx-auto w-16 h-16 bg-brand-purple/10 rounded-full flex items-center justify-center">
        <Gift className="w-8 h-8 text-brand-purple" />
      </div>
      
      <div className="space-y-2">
        <div className="text-4xl font-bold text-brand-purple">
          {value}
        </div>
        <div className="text-lg font-semibold text-brand-dark-blue">
          Voucher
        </div>
      </div>
      
      <p className="text-sm text-brand-dark-blue/70 leading-relaxed">
        Complete your profile to claim your voucher and receive future rewards directly in your wallet
      </p>
    </div>
  );
};

export default VoucherDisplay;
