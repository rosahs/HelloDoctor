import MobileMessageDetail from "@/components/protected/messaging/MobileMessageDetail";

export default function DoctorChatDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <MobileMessageDetail
      userType="doctor"
      chatId={params.id}
    />
  );
}
