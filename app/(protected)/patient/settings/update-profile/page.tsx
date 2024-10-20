import UserProfileEditForm from "@/components/protected/settings/editProfile/EditProfile";
import { currentUser } from "@/lib/auth";

async function DoctorEditProfilePage() {
  const user = await currentUser();

  // If `user` is undefined, show a loading indicator or a message
  if (!user) {
    return <p>Loading...</p>; // or redirect, show error, etc.
  }

  return (
    <div>
      <UserProfileEditForm isPatient={true} user={user} />
    </div>
  );
}

export default DoctorEditProfilePage;