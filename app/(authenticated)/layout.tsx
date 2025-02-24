import AuthenticatedNavbar from "@/app/components/authenticatedNavbar";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AuthenticatedNavbar />
      <div className="pt-5">{children}</div>
    </div>
  );
}
