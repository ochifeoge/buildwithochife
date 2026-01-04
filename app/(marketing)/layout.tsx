import { Footer } from "@/components/web/footer";
import Navbar from "@/components/web/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="px-4">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
