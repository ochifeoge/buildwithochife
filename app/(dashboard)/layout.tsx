import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AccountSidebar from "@/components/web/Dashboardsidebar";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/securitycheck");
  }

  return (
    <div className="flex min-h-screen">
      <AccountSidebar />
      <main className="flex-1 p-6 bg-muted/30">{children}</main>
    </div>
  );
}
