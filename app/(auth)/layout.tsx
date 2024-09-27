function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-svh flex items-center justify-center">
      {children}
    </div>
  );
}

export default AuthLayout;
