import MobileMessageDetail from "@/components/protected/messaging/MobileMessageDetail";

export default function PatientChatDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <MobileMessageDetail
      userType="patient"
      chatId={params.id}
    />
  );
}
