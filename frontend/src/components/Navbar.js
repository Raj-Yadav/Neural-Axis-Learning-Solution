import { useState, useEffect } from "react";
import { Menu, X, Zap, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const navLinks = [
    { label: "Technologies", id: "technologies" },
    { label: "Solutions", id: "solutions" },
    { label: "Projects", id: "projects" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-na-navy text-white text-xs py-2 hidden sm:block" data-testid="top-contact-bar">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:+919265802045" className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors" data-testid="top-phone">
              <Phone className="w-3 h-3" />
              +91 9265 802 045
            </a>
            <a href="mailto:raj.yadav9312@gmail.com" className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors" data-testid="top-email">
              <Mail className="w-3 h-3" />
              raj.yadav9312@gmail.com
            </a>
          </div>
          <Link
            to="/courses/generative-ai"
            className="text-na-mint font-medium hover:text-white transition-colors"
            data-testid="top-course-link"
          >
            New: Generative AI & Agentic AI Bootcamp — Enroll Now →
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/70 backdrop-blur-xl border-b border-[rgba(15,23,42,0.08)] shadow-sm"
            : "bg-white border-b border-[rgba(15,23,42,0.04)]"
        }`}
        data-testid="navbar"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollTo("hero")}
            data-testid="navbar-logo"
          >
            <Zap className="w-5 h-5 text-na-navy" />
            <span className="font-heading font-bold text-lg tracking-tight text-na-text">
              Neural Axis
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm text-na-text-sec hover:text-na-text transition-colors duration-200"
                data-testid={`nav-${link.id}`}
              >
                {link.label}
              </button>
            ))}
            <Link
              to="/courses/generative-ai"
              className="text-sm text-na-navy font-medium hover:text-na-navy/70 transition-colors"
              data-testid="nav-courses"
            >
              Courses
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+919265802045" className="text-sm text-na-text-sec hover:text-na-text flex items-center gap-1.5" data-testid="nav-phone">
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">+91 9265 802 045</span>
            </a>
            <Button
              onClick={() => scrollTo("contact")}
              className="bg-na-navy text-white hover:bg-na-navy/90 rounded-full px-6 text-sm"
              data-testid="nav-cta-button"
            >
              Book Consultation
            </Button>
          </div>

          <button
            className="md:hidden text-na-text"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="mobile-menu-toggle"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-[rgba(15,23,42,0.08)] px-6 pb-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="block w-full text-left py-2.5 text-sm text-na-text-sec hover:text-na-text"
                data-testid={`mobile-nav-${link.id}`}
              >
                {link.label}
              </button>
            ))}
            <Link
              to="/courses/generative-ai"
              className="block py-2.5 text-sm text-na-navy font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Current Course
            </Link>
            <div className="flex items-center gap-4 pt-2 border-t border-[rgba(15,23,42,0.06)]">
              <a href="tel:+919265802045" className="text-sm text-na-text-sec flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" /> +91 9265 802 045
              </a>
            </div>
            <Button
              onClick={() => scrollTo("contact")}
              className="bg-na-navy text-white hover:bg-na-navy/90 rounded-full w-full mt-2 text-sm"
              data-testid="mobile-nav-cta"
            >
              Book Consultation
            </Button>
          </div>
        )}
      </nav>
    </>
  );
}
