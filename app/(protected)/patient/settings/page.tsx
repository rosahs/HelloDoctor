import Settings from "@/components/protected/settings";

const PatientSettings = () => {
  const patientLinks = [
    {
      href: "/patient/settings/edit-profile",
      label: "Edit Profile",
    },
    {
      href: "/patient/settings/change-location",
      label: "Change Location",
    },
    {
      href: "/patient/settings/account-security",
      label: "Account Security",
    },
    {
      href: "/patient/settings/delete-account",
      label: "Delete Account",
    },
  ];

  return <Settings links={patientLinks} />;
};

export default PatientSettings;
