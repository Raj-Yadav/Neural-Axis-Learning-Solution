import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

export default function HeroSection() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center overflow-hidden gradient-spot-mint gradient-spot-blue"
      data-testid="hero-section"
      aria-label="Hero - Neural Axis AI Training for Universities"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-10"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-na-text-sec mb-4 block">
              Industry Integration Partner
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl tracking-tighter font-medium text-na-text leading-[1.1] mb-6">
              Advanced AI &<br />
              Data Science for<br />
              <span className="text-na-navy">Your Institution</span>
            </h1>
            <p className="text-base leading-relaxed text-na-text-sec max-w-lg mb-8">
              Empowering universities with industry-grade AI curriculum, faculty development, 
              and student bootcamps. Bridge the gap between academic theory and real-world 
              deployment.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => scrollTo("contact")}
                className="bg-na-navy text-white hover:bg-na-navy/90 rounded-full px-8 py-6 text-sm font-medium"
                data-testid="hero-cta-partner"
              >
                Partner With Us
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollTo("contact")}
                className="rounded-full px-8 py-6 text-sm font-medium border-[rgba(15,23,42,0.15)] text-na-text hover:bg-na-mint-bg hover:text-na-text"
                data-testid="hero-cta-workshop"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book a Free Workshop
              </Button>
            </div>

            {/* Social Proof Strip */}
            <div className="mt-12 pt-8 border-t border-[rgba(15,23,42,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-na-text-sec/60 mb-4">
                Trusted by leading organizations
              </p>
              <div className="flex flex-wrap items-center gap-6">
                {["IBM", "TCS", "Wipro", "Capgemini", "NASSCOM"].map((name) => (
                  <span key={name} className="text-sm font-heading font-medium text-na-text/30 tracking-tight" data-testid={`hero-client-${name.toLowerCase()}`}>
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative z-10 hidden lg:block"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <img
                  src="https://static.prod-images.emergentagent.com/jobs/232eb2ab-127e-45ab-8692-12dac3629dce/images/242e462092d50a98848b5bb4fc69ca72f938a71543969c178390d7acf9d2d9f7.png"
                  alt="Pastel gradient"
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
              <div className="relative bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-8 shadow-lg">
                <img
                  src="https://static.prod-images.emergentagent.com/jobs/232eb2ab-127e-45ab-8692-12dac3629dce/images/3141701577f08b896de2f9cfffbc7bfc985a7f3fcb6f78c24ffe4243babdd145.png"
                  alt="Abstract AI visualization representing neural networks and data flow"
                  loading="lazy"
                  className="w-full h-auto rounded-xl"
                  data-testid="hero-image"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
