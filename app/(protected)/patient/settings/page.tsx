import { auth } from "@/auth";

async function PatientSettingsPage() {
  const session = await auth();

  return <div>{JSON.stringify(session)}</div>;
}

export default PatientSettingsPage;
