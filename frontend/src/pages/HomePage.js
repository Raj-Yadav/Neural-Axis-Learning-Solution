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
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { BootcampBannerInline, BootcampBannerCompact } from "@/components/BootcampBanner";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white" data-testid="home-page">
      <Navbar />
      <HeroSection />
      <CoreTechnologies />
      {/* Bootcamp Banner - after Technologies */}
      <BootcampBannerInline />
      <PartnershipModels />
      <ProjectPortfolio />
      {/* Bootcamp Banner Compact - after Projects */}
      <BootcampBannerCompact />
      <PastCourses />
      <Testimonials />
      <TrackRecord />
      {/* Bootcamp Banner - after Track Record */}
      <BootcampBannerInline />
      <FAQ />
      <BookingSection />
      <ContactForm />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
