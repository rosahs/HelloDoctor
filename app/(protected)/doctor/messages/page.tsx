import MobileMessageList from "@/components/protected/messaging/MobileMessageList";
import { currentUser } from "@/lib/auth";

export default async function DoctorChatsPage() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  return <MobileMessageList userType="doctor" />;
}
