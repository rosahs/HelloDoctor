import { auth } from "@/auth";

async function DoctorsSettingsPage() {
  const session = await auth();

  return <div>{JSON.stringify(session)}</div>;
}

export default DoctorsSettingsPage;
