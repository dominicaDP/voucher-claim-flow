import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import VoucherDisplay from '@/components/VoucherDisplay';
import PhoneDisplay from '@/components/PhoneDisplay';
import EmailForm from '@/components/EmailForm';
import TrustIndicator from '@/components/TrustIndicator';
import SuccessScreen from '@/components/SuccessScreen';

const Index = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  // Mock data for prototype
  const mockData = {
    clientName: "ABC Membership",
    voucherValue: "R75",
    phoneNumber: "+27 123 456 789"
  };

  const handleEmailSuccess = (email: string) => {
    setSubmittedEmail(email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <SuccessScreen 
        email={submittedEmail} 
        voucherValue={mockData.voucherValue} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark-blue to-brand-purple flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <img 
            src="/lovable-uploads/fefa5222-74b6-456f-8be5-853150d647e0.png" 
            alt="Dress Your Tech Logo" 
            className="mx-auto h-16 w-auto mb-6"
          />
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-brand-white">Claim Your Voucher</h1>
          <p className="text-lg text-brand-white/80 font-medium">
            Welcome, {mockData.clientName} Customer!
          </p>
        </div>

        {/* Main Card */}
        <Card className="border-0 shadow-2xl bg-brand-white backdrop-blur">
          <CardHeader className="text-center pb-4">
            <VoucherDisplay 
              value={mockData.voucherValue} 
              clientName={mockData.clientName} 
            />
          </CardHeader>

          <CardContent className="space-y-6 p-6">
            <PhoneDisplay phoneNumber={mockData.phoneNumber} />
            <EmailForm onSuccess={handleEmailSuccess} />
            <TrustIndicator />
          </CardContent>
        </Card>

        {/* Opt-out Link */}
        <div className="text-center">
          <a 
            href="#" 
            className="text-sm text-brand-white/60 hover:text-brand-white/80 underline transition-colors"
            onClick={(e) => {
              e.preventDefault();
              // Handle opt-out logic here
              console.log('User opted out of communication and voucher receipt');
            }}
          >
            Don't want to receive this voucher or future communications? Opt out here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
