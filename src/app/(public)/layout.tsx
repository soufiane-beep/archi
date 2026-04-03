import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
