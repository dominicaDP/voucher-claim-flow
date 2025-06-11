
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from 'lucide-react';

interface SuccessScreenProps {
  email: string;
  voucherValue: string;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ email, voucherValue }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark-blue to-brand-purple flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Card className="border-0 shadow-2xl bg-brand-white backdrop-blur">
          <CardContent className="p-8 text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-brand-purple/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-brand-purple" />
            </div>
            
            <div className="space-y-3">
              <h1 className="text-2xl font-bold text-brand-dark-blue">
                Voucher Claimed!
              </h1>
              <p className="text-brand-dark-blue/70 leading-relaxed">
                Your {voucherValue} voucher has been successfully claimed. 
                Check your email for confirmation and instructions on how to use your voucher.
              </p>
            </div>
            
            <div className="p-4 bg-brand-purple/5 rounded-lg border border-brand-purple/20">
              <p className="text-sm text-brand-purple font-medium">
                Email sent to: {email}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuccessScreen;
