import MobileMessageList from "@/components/protected/messaging/MobileMessageList";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function PatientChatsPage() {
  const user = await currentUser();

  if (!user || !user?.id) {
    redirect("/login");
  }

  return (
    <MobileMessageList
      userType="patient"
      currentUserId={user.id}
    />
  );
}
