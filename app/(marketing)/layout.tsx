import { Footer } from "@/components/web/footer";
import Navbar from "@/components/web/Navbar";
import "./portfolio.css";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="portfolio">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
