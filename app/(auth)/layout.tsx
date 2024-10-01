import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="h-svh flex items-center justify-center">
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
    </div>
  );
}
