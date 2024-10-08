import Settings from "@/components/protected/settings/settings";
import { currentUser } from "@/lib/auth";

const DoctorSettings = async () => {
  const user = await currentUser();
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
      href: "/doctor/settings/delete-account",
      label: "Delete Account",
    },
  ];

  // Conditionally insert "Account Security" before "Delete Account"
  if (!user?.isOAuth) {
    doctorLinks.splice(3, 0, {
      href: "/doctor/settings/account-security",
      label: "Account Security",
    });
  }

  return <Settings links={doctorLinks} />;
};

export default DoctorSettings;