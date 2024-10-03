"use client";

import { Switch } from "@/components/ui/switch";
import React from "react";

interface TwoFactorAuthProps {
  is2FAEnabled: boolean;
  onToggle: () => void;
}

export const TwoFactorAuth: React.FC<
  TwoFactorAuthProps
> = ({ is2FAEnabled, onToggle }) => {
  return (
    <section className="space-y-4 pb-8 border-b border-inputBorder">
      <h2 className="text-2xl font-semibold">
        Two-Factor Authentication
      </h2>
      <p className="text-textGray">
        Add an extra layer of security to your account
      </p>
      <div className="flex items-center space-x-2">
        <Switch
          checked={is2FAEnabled}
          onCheckedChange={onToggle}
          className={`${
            is2FAEnabled
              ? "data-[state=checked]:bg-primaryColor"
              : "data-[state=unchecked]:bg-inputBg"
          }`}
        />
        <span>{is2FAEnabled ? "Enabled" : "Disabled"}</span>
      </div>
    </section>
  );
};
