import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 backdrop-blur-xl border-b border-[rgba(15,23,42,0.08)] shadow-sm"
          : "bg-transparent"
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
        </div>

        <div className="hidden md:block">
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
  );
}
