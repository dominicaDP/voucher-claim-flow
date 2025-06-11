
import React from 'react';
import { Label } from "@/components/ui/label";

interface PhoneDisplayProps {
  phoneNumber: string;
}

const PhoneDisplay: React.FC<PhoneDisplayProps> = ({ phoneNumber }) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-brand-dark-blue">Phone Number</Label>
      <div className="p-3 bg-gray-50 rounded-md border border-brand-dark-blue/20">
        <span className="text-brand-dark-blue font-medium">{phoneNumber}</span>
      </div>
    </div>
  );
};

export default PhoneDisplay;
