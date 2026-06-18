import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Neural Axis delivered an AI training program that was leagues ahead of what we'd seen from other vendors. Our faculty went from theoretical knowledge to building RAG pipelines within a week.",
    name: "Dr. Anand Sharma",
    role: "Dean, School of Computing",
    org: "Bhilai University",
  },
  {
    quote: "The Generative AI bootcamp for our engineering students was exceptional. 87% of the batch built deployable capstone projects — that's unheard of in a 2-week program.",
    name: "Prof. Meera Iyer",
    role: "HOD, Computer Science",
    org: "NIT Raipur",
  },
  {
    quote: "We needed a training partner who understood both NAAC compliance and industry-grade AI. Neural Axis checked both boxes and helped us redesign three semesters of curriculum.",
    name: "Mr. Vikram Patel",
    role: "Training & Placement Officer",
    org: "GGU Bilaspur",
  },
  {
    quote: "What sets Neural Axis apart is that their trainers have actually built production ML systems. The program they delivered for our AI team was practical, current, and immediately applicable.",
    name: "Sanjay Mehta",
    role: "Learning & Development Lead",
    org: "IBM India",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-[#FAFAFA]" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-na-text-sec mb-3 block">
            What They Say
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-tight font-medium text-na-text">
            Trusted by Decision-Makers<br />Across India
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={itemVariants}
              className="p-8 rounded-xl border border-[rgba(15,23,42,0.08)] bg-white hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300"
              data-testid={`testimonial-${t.name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <Quote className="w-6 h-6 text-na-mint mb-4" />
              <p className="text-sm leading-relaxed text-na-text-sec mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="text-sm font-medium text-na-text">{t.name}</p>
                <p className="text-xs text-na-text-sec">{t.role}</p>
                <p className="text-xs text-na-text-sec font-medium">{t.org}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
