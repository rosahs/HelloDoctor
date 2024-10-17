import MobileMessageDetail from "@/components/protected/messaging/MobileMessageDetail";
import { currentUser } from "@/lib/auth";

export default async function DoctorChatDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  return (
    <MobileMessageDetail
      userType="doctor"
      chatId={params.id}
    />
  );
}
