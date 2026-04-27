import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 bg-na-navy text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-na-mint" />
            <span className="font-heading font-bold text-lg tracking-tight">Neural Axis</span>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-white/60">
            <a href="#technologies" className="hover:text-white transition-colors" data-testid="footer-technologies">Technologies</a>
            <a href="#solutions" className="hover:text-white transition-colors" data-testid="footer-solutions">Solutions</a>
            <a href="#about" className="hover:text-white transition-colors" data-testid="footer-about">About</a>
            <a href="#contact" className="hover:text-white transition-colors" data-testid="footer-contact">Contact</a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} Neural Axis. All rights reserved.
          </p>
          <p className="text-sm text-white/40">
            Industry Integration Partner for Advanced AI & Data Science
          </p>
        </div>
      </div>
    </footer>
  );
}
