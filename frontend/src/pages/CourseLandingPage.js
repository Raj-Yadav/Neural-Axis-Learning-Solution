import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, ArrowRight, Clock, Users, Calendar, CheckCircle2, Phone, Mail, BookOpen, Code2, Brain, Sparkles, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";

const syllabus = [
  {
    week: "Week 1-2",
    title: "Python & Machine Learning Foundations",
    topics: ["Python for Data Science", "NumPy, Pandas, Matplotlib", "Supervised & Unsupervised Learning", "Feature Engineering & Model Evaluation"],
  },
  {
    week: "Week 3-4",
    title: "Deep Learning & NLP",
    topics: ["Neural Networks with PyTorch", "CNNs & Image Classification", "RNNs & Transformers", "Text Classification & NER"],
  },
  {
    week: "Week 5-6",
    title: "Generative AI & LLMs",
    topics: ["OpenAI API & Prompt Engineering", "HuggingFace Models & Fine-tuning", "RAG Architecture with LangChain", "Vector Databases (ChromaDB)"],
  },
  {
    week: "Week 7-8",
    title: "Agentic AI & Deployment",
    topics: ["LangGraph State Machines", "CrewAI Multi-Agent Systems", "FastAPI & Docker Deployment", "Capstone Project Presentation"],
  },
];

const highlights = [
  "8-week intensive, hands-on program",
  "Deployable capstone project for portfolio",
  "Certificate of completion",
  "Post-bootcamp placement support",
  "Access to community & mentorship",
  "Industry-aligned curriculum",
];

export default function CourseLandingPage() {
  const scrollToEnroll = () => document.getElementById("enroll")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-white" data-testid="course-landing-page">
      {/* Sticky Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[rgba(15,23,42,0.08)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" data-testid="course-nav-logo">
            <Zap className="w-5 h-5 text-na-navy" />
            <span className="font-heading font-bold text-lg tracking-tight text-na-text">Neural Axis Learning Solution</span>
          </Link>
          <div className="flex items-center gap-4">
            <a href="tel:+919265802045" className="hidden sm:flex items-center gap-1.5 text-sm text-na-text-sec hover:text-na-text">
              <Phone className="w-3.5 h-3.5" /> +91 9265 802 045
            </a>
            <Button onClick={scrollToEnroll} className="bg-na-navy text-white hover:bg-na-navy/90 rounded-full px-6 text-sm" data-testid="course-nav-cta">
              Enroll Now
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 lg:py-28 relative overflow-hidden gradient-spot-mint gradient-spot-blue">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-na-mint-bg text-xs font-semibold text-na-navy mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Now Enrolling — Limited Seats
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl tracking-tighter font-medium text-na-text leading-[1.1] mb-6 max-w-4xl">
              Generative AI &<br />Agentic AI Bootcamp
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-na-text-sec max-w-2xl mb-8">
              An 8-week intensive program taking you from Python fundamentals to building 
              production-grade AI agents with LangChain, LangGraph, and CrewAI. 
              Culminates in a deployable capstone project.
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-10">
              <div className="flex items-center gap-2 text-sm text-na-text-sec">
                <Clock className="w-4 h-4 text-na-navy" /> 8 Weeks
              </div>
              <div className="flex items-center gap-2 text-sm text-na-text-sec">
                <Users className="w-4 h-4 text-na-navy" /> Batch Size: 30-50
              </div>
              <div className="flex items-center gap-2 text-sm text-na-text-sec">
                <Calendar className="w-4 h-4 text-na-navy" /> Next Batch: July 2026
              </div>
              <div className="flex items-center gap-2 text-sm text-na-text-sec">
                <BookOpen className="w-4 h-4 text-na-navy" /> Online + Offline
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button onClick={scrollToEnroll} className="bg-na-navy text-white hover:bg-na-navy/90 rounded-full px-8 py-6 text-sm font-medium" data-testid="course-hero-cta">
                Enroll Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <a href="tel:+919265802045">
                <Button variant="outline" className="rounded-full px-8 py-6 text-sm font-medium border-[rgba(15,23,42,0.15)]" data-testid="course-hero-call">
                  <Phone className="w-4 h-4 mr-2" /> Call for Details
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-20 lg:py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-na-text-sec mb-3 block">Course Overview</span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-tight font-medium text-na-text mb-6">
              What You&apos;ll Master
            </h2>
            <p className="text-base leading-relaxed text-na-text-sec max-w-3xl mb-12">
              This bootcamp covers the complete AI engineering stack — from foundational Python and ML 
              to cutting-edge Generative AI, RAG systems, and autonomous AI agents. Every module includes 
              hands-on labs and real-world projects.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
            {[
              { icon: Code2, label: "Python & ML" },
              { icon: Brain, label: "Deep Learning" },
              { icon: Sparkles, label: "Generative AI" },
              { icon: Workflow, label: "Agentic AI" },
            ].map((item) => (
              <div key={item.label} className="p-6 rounded-xl border border-[rgba(15,23,42,0.08)] bg-white text-center">
                <item.icon className="w-8 h-8 text-na-navy mx-auto mb-3" />
                <p className="text-sm font-medium text-na-text">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {highlights.map((h) => (
              <div key={h} className="flex items-center gap-3 p-4 rounded-lg bg-white border border-[rgba(15,23,42,0.06)]">
                <CheckCircle2 className="w-5 h-5 text-na-mint flex-shrink-0" />
                <span className="text-sm text-na-text">{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-na-text-sec mb-3 block">Syllabus</span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-tight font-medium text-na-text mb-12">
              Week-by-Week Breakdown
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {syllabus.map((module, i) => (
              <motion.div
                key={module.week}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-7 rounded-xl border border-[rgba(15,23,42,0.08)] bg-[#FAFAFA] hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300"
                data-testid={`syllabus-module-${i}`}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-na-mint mb-2 block">{module.week}</span>
                <h3 className="font-heading text-lg font-medium text-na-text mb-4">{module.title}</h3>
                <ul className="space-y-2">
                  {module.topics.map((topic) => (
                    <li key={topic} className="flex items-center gap-2 text-sm text-na-text-sec">
                      <div className="w-1.5 h-1.5 rounded-full bg-na-mint flex-shrink-0" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment CTA */}
      <section id="enroll" className="py-20 lg:py-24 bg-na-navy text-white" data-testid="course-enroll-section">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-tight font-medium mb-4">
              Ready to Build the Future?
            </h2>
            <p className="text-base text-white/60 mb-8 max-w-xl mx-auto">
              Limited seats per batch. Contact us to reserve your spot or discuss a custom 
              bootcamp for your institution.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://wa.me/919265802045?text=Hi%20Neural%20Axis%2C%20I%27m%20interested%20in%20the%20Generative%20AI%20Bootcamp.%20Please%20share%20details." target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#25D366] hover:bg-[#25D366]/90 text-white rounded-full px-8 py-6 text-sm font-medium" data-testid="course-enroll-whatsapp">
                  Enroll via WhatsApp
                </Button>
              </a>
              <a href="tel:+919265802045">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-sm font-medium" data-testid="course-enroll-call">
                  <Phone className="w-4 h-4 mr-2" /> +91 9265 802 045
                </Button>
              </a>
              <a href="mailto:raj.yadav9312@gmail.com">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-sm font-medium" data-testid="course-enroll-email">
                  <Mail className="w-4 h-4 mr-2" /> Email Us
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-na-navy border-t border-white/10 text-center">
        <Link to="/" className="text-sm text-white/40 hover:text-white/60 transition-colors" data-testid="course-back-home">
          ← Back to Homepage
        </Link>
      </footer>
    </div>
  );
}
