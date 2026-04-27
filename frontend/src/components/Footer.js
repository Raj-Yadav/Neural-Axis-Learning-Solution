import { Zap, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-16 bg-na-navy text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-na-mint" />
              <span className="font-heading font-bold text-lg tracking-tight">Neural Axis</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-md">
              Industry Integration Partner for Advanced AI & Data Science. 
              Empowering universities with cutting-edge curriculum, faculty development, 
              and student bootcamps since 2018.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-4">Quick Links</h4>
            <div className="space-y-2.5">
              <a href="#technologies" className="block text-sm text-white/60 hover:text-white transition-colors" data-testid="footer-technologies">Technologies</a>
              <a href="#solutions" className="block text-sm text-white/60 hover:text-white transition-colors" data-testid="footer-solutions">Solutions</a>
              <a href="#projects" className="block text-sm text-white/60 hover:text-white transition-colors" data-testid="footer-projects">Projects</a>
              <a href="#about" className="block text-sm text-white/60 hover:text-white transition-colors" data-testid="footer-about">About</a>
              <a href="#contact" className="block text-sm text-white/60 hover:text-white transition-colors" data-testid="footer-contact">Contact</a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <a
                href="mailto:raj.yadav9312@gmail.com"
                className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors"
                data-testid="footer-email"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                raj.yadav9312@gmail.com
              </a>
              <a
                href="tel:+919265802045"
                className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors"
                data-testid="footer-phone"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                +91 9265 802 045
              </a>
              <div className="flex items-center gap-2.5 text-sm text-white/60">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                Gujarat, India
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Neural Axis. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Industry Integration Partner for Advanced AI & Data Science
          </p>
        </div>
      </div>
    </footer>
  );
}
