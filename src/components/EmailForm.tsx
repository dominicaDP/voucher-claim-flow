
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface EmailFormProps {
  onSuccess: (email: string) => void;
}

const EmailForm: React.FC<EmailFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const { toast } = useToast();

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
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      onSuccess(email);
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

  return (
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
  );
};

export default EmailForm;
