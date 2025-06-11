
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur">
            <CardContent className="p-8 text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              
              <div className="space-y-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  Voucher Claimed!
                </h1>
                <p className="text-gray-600 leading-relaxed">
                  Your {mockData.voucherValue} voucher has been successfully claimed. 
                  Check your email for confirmation and instructions on how to use your voucher.
                </p>
              </div>
              
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <p className="text-sm text-emerald-800 font-medium">
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Claim Your Voucher</h1>
          <p className="text-lg text-emerald-700 font-medium">
            Welcome, {mockData.clientName} Customer!
          </p>
        </div>

        {/* Main Card */}
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur">
          <CardHeader className="text-center pb-4">
            {/* Voucher Value Display */}
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <Gift className="w-8 h-8 text-emerald-600" />
              </div>
              
              <div className="space-y-2">
                <div className="text-4xl font-bold text-emerald-600">
                  {mockData.voucherValue}
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  Voucher
                </div>
              </div>
              
              <p className="text-sm text-gray-600 leading-relaxed">
                Complete your profile to claim your voucher and receive future rewards directly in your wallet
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 p-6">
            {/* Phone Number Display */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
              <div className="p-3 bg-gray-50 rounded-md border">
                <span className="text-gray-900 font-medium">{mockData.phoneNumber}</span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={handleEmailChange}
                  className={`h-12 ${emailError ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-emerald-500'}`}
                  disabled={isLoading}
                />
                {emailError && (
                  <p className="text-sm text-red-600 mt-1">{emailError}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg transition-colors duration-200"
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
            <div className="flex items-center justify-center space-x-2 pt-4 border-t border-gray-100">
              <Shield className="w-4 h-4 text-gray-500" />
              <p className="text-xs text-gray-500">
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
