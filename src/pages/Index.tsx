
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle, Loader2, Gift, Shield } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');
  const { toast } = useToast();

  // Mock data for prototype
  const mockData = {
    clientName: "ABC Rewards",
    voucherValue: "R75",
    phoneNumber: "+27 123 456 789"
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (value && !validateEmail(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setEmailError('Email address is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      toast({
        title: "Voucher Claimed Successfully!",
        description: "Check your email for confirmation details.",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
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
                  Your {mockData.voucherValue} voucher has been successfully claimed. 
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
            {/* Voucher Value Display */}
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-brand-purple/10 rounded-full flex items-center justify-center">
                <Gift className="w-8 h-8 text-brand-purple" />
              </div>
              
              <div className="space-y-2">
                <div className="text-4xl font-bold text-brand-purple">
                  {mockData.voucherValue}
                </div>
                <div className="text-lg font-semibold text-brand-dark-blue">
                  Voucher
                </div>
              </div>
              
              <p className="text-sm text-brand-dark-blue/70 leading-relaxed">
                Complete your profile to claim your voucher and receive future rewards directly in your wallet
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 p-6">
            {/* Phone Number Display */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-brand-dark-blue">Phone Number</Label>
              <div className="p-3 bg-gray-50 rounded-md border border-brand-dark-blue/20">
                <span className="text-brand-dark-blue font-medium">{mockData.phoneNumber}</span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-brand-dark-blue">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={handleEmailChange}
                  className={`h-12 ${emailError ? 'border-red-500 focus:border-red-500' : 'border-brand-dark-blue/30 focus:border-brand-purple'}`}
                  disabled={isLoading}
                />
                {emailError && (
                  <p className="text-sm text-red-600 mt-1">{emailError}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-brand-purple hover:bg-brand-purple/90 text-brand-white font-semibold text-lg transition-colors duration-200"
                disabled={isLoading || !!emailError || !email}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Claiming Voucher...
                  </>
                ) : (
                  'Claim My Voucher'
                )}
              </Button>
            </form>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-2 pt-4 border-t border-brand-dark-blue/10">
              <Shield className="w-4 h-4 text-brand-dark-blue/60" />
              <p className="text-xs text-brand-dark-blue/60">
                Your email will only be used for voucher delivery and rewards
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
