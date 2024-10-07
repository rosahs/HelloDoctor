"use client";

import { toggleTwoFactorAuth } from "@/actions/account-security/two-factor";
import { Switch } from "@/components/ui/switch";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

export const TwoFactorAuth = () => {
  const user = useCurrentUser();

  const { update } = useSession();

  const onToggle = async () => {
    try {
      const result = await toggleTwoFactorAuth();
      if (result.success) {
        await update({
          user: {
            ...user,
            isTwoFactorEnabled: user?.isTwoFactorEnabled,
          },
        });
      }
    } catch (error) {
      console.error("Failed to toggle 2FA:", error);
    }
  };

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
          checked={user?.isTwoFactorEnabled}
          onCheckedChange={onToggle}
          className={`${
            user?.isTwoFactorEnabled
              ? "data-[state=checked]:bg-primaryColor"
              : "data-[state=unchecked]:bg-inputBg"
          }`}
        />
        <span>
          {user?.isTwoFactorEnabled
            ? "Enabled"
            : "Disabled"}
        </span>
      </div>
    </section>
  );
};
