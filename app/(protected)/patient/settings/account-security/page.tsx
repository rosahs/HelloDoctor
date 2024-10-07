import { TwoFactorAuth } from "@/components/protected/settings/accountSecurity/TwoFactorAuth";
import { EmailChangeForm } from "@/components/protected/settings/accountSecurity/EmailChangeForm";
import { PasswordChangeForm } from "@/components/protected/settings/accountSecurity/PasswordChangeForm";

const PatientAccountSecurityPage = () => {
  return (
    <div className="space-y-8 p-6 bg-bgLight text-textDark">
      <TwoFactorAuth />
      <EmailChangeForm />
      <PasswordChangeForm />
    </div>
  );
};

export default PatientAccountSecurityPage;
