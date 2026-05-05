import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CoreTechnologies from "@/components/CoreTechnologies";
import PartnershipModels from "@/components/PartnershipModels";
import ProjectPortfolio from "@/components/ProjectPortfolio";
import PastCourses from "@/components/PastCourses";
import Testimonials from "@/components/Testimonials";
import TrackRecord from "@/components/TrackRecord";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white" data-testid="home-page">
      <Navbar />
      <HeroSection />
      <CoreTechnologies />
      <PartnershipModels />
      <ProjectPortfolio />
      <PastCourses />
      <Testimonials />
      <TrackRecord />
      <FAQ />
      <ContactForm />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
