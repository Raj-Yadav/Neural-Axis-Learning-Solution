import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BootcampBannerInline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-6 lg:px-8 py-10"
      data-testid="bootcamp-banner-inline"
    >
      <Link to="/courses/agentic-ai" className="block">
        <div className="relative rounded-2xl bg-gradient-to-r from-na-navy via-[#122850] to-na-navy p-8 sm:p-10 overflow-hidden group hover:shadow-lg transition-shadow duration-300">
          {/* Glow effects */}
          <div className="absolute top-0 right-0 w-[40%] h-full bg-[radial-gradient(circle_at_80%_30%,rgba(74,222,128,0.15)_0%,transparent_60%)] pointer-events-none" />
          <div className="absolute bottom-0 left-[20%] w-[30%] h-[60%] bg-[radial-gradient(circle,rgba(96,165,250,0.1)_0%,transparent_60%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <Rocket className="w-6 h-6 text-na-mint" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-na-mint">New Bootcamp</span>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-na-mint opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-na-mint"></span>
                  </span>
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-medium text-white tracking-tight mb-1">
                  28-Day Agentic AI Engineer Bootcamp
                </h3>
                <p className="text-sm text-white/50">
                  From zero to deploying production AI agents on AWS. LangChain · LangGraph · CrewAI · FastAPI · Docker
                </p>
              </div>
            </div>
            <Button className="bg-na-mint text-na-navy hover:bg-na-mint/90 rounded-full px-6 py-5 text-sm font-semibold flex-shrink-0 group-hover:scale-105 transition-transform" data-testid="bootcamp-banner-cta">
              View Program <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function BootcampBannerCompact() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-6 lg:px-8 py-6"
      data-testid="bootcamp-banner-compact"
    >
      <Link to="/courses/agentic-ai" className="block">
        <div className="flex items-center justify-between gap-4 rounded-xl bg-na-navy/5 border border-na-navy/10 px-6 py-4 hover:bg-na-navy/8 transition-colors group">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-na-navy" />
            <div>
              <p className="text-sm font-medium text-na-text">
                <span className="text-na-navy font-semibold">28-Day Agentic AI Bootcamp</span> — Build & deploy production AI agents
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-na-navy flex items-center gap-1 group-hover:gap-2 transition-all whitespace-nowrap">
            Learn More <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
