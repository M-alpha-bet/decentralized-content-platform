import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import FeedsSection from "@/components/FeedsSection";
import TopCreatorSection from "@/components/TopCreatorSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeedsSection />
      <TopCreatorSection />
      <Footer />
    </>
  );
}
