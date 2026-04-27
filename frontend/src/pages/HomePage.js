import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CoreTechnologies from "@/components/CoreTechnologies";
import PartnershipModels from "@/components/PartnershipModels";
import TrackRecord from "@/components/TrackRecord";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white" data-testid="home-page">
      <Navbar />
      <HeroSection />
      <CoreTechnologies />
      <PartnershipModels />
      <TrackRecord />
      <ContactForm />
      <Footer />
    </div>
  );
}
