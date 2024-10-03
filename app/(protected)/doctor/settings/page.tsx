import Settings from "@/components/private/settings";

const DoctorSettings = () => {
  const doctorLinks = [
    {
      href: "/doctor/settings/edit-profile",
      label: "Edit Profile",
    },
    {
      href: "/doctor/settings/edit-about-me",
      label: "Edit About Me",
    },
    {
      href: "/doctor/settings/change-location",
      label: "Change Location",
    },
    {
      href: "/doctor/settings/account-security",
      label: "Account Security",
    },
    {
      href: "/doctor/settings/delete-account",
      label: "Delete Account",
    },
  ];

  return <Settings links={doctorLinks} />;
};

export default DoctorSettings;
