"use client";

import React, { useState } from "react";
import { TwoFactorAuth } from "@/components/protected/settings/accountSecurity/TwoFactorAuth";
import { EmailChangeForm } from "@/components/protected/settings/accountSecurity/EmailChangeForm";
import { PasswordChangeForm } from "@/components/protected/settings/accountSecurity/PasswordChangeForm";

const AccountSecurityPage = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handle2FAToggle = () => {
    setIs2FAEnabled(!is2FAEnabled);
    // TODO: IMPLEMENT 2FA TOGGLE LOGIC HERE
  };

  const handleEmailChange = (data) => {
    console.log("Email change submitted:", data);
    // TODO: IMPLEMENT EMAIL CHANGE LOGIC HERE
  };

  const handlePasswordChange = (data) => {
    console.log("Password change submitted:", data);
    // TODO: IMPLEMENT PASSWORD CHANGE LOGIC HERE
  };

  return (
    <div className="space-y-8 p-6 bg-bgLight text-textDark">
      <TwoFactorAuth
        is2FAEnabled={is2FAEnabled}
        onToggle={handle2FAToggle}
      />
      <EmailChangeForm onSubmit={handleEmailChange} />
      <PasswordChangeForm onSubmit={handlePasswordChange} />
    </div>
  );
};

export default AccountSecurityPage;
