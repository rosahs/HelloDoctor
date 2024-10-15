import Settings from "@/components/protected/settings/settings";
import { currentUser } from "@/lib/auth";

const PatientSettings = async () => {
  const user = await currentUser();

  const patientLinks = [
    {
      href: "/patient/settings/update-profile",
      label: "Update Profile",
    },
    {
      href: "/patient/settings/change-location",
      label: "Change Location",
    },
    {
      href: "/patient/settings/delete-account",
      label: "Delete Account",
    },
  ];

  // Conditionally insert "Account Security" before "Delete Account"
  if (!user?.isOAuth) {
    patientLinks.splice(2, 0, {
      href: "/patient/settings/account-security",
      label: "Account Security",
    });
  }

  return <Settings links={patientLinks} />;
};

export default PatientSettings;
