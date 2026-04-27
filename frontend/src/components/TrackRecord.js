import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Marquee from "react-fast-marquee";
import { Target, Handshake, ShieldCheck, Lightbulb } from "lucide-react";

function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(target);
    const duration = 1500;
    const step = Math.max(1, Math.floor(end / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const partners = [
  "IBM", "TCS", "Wipro", "Capgemini", "NASSCOM", "Synergistic Compusoft",
  "TalentSprint", "TOPS Technologies", "LogicRays Academy",
];

const stats = [
  { value: "12", suffix: "+", label: "Years of Experience" },
  { value: "50", suffix: "+", label: "Institutions Trained" },
  { value: "10", suffix: "K+", label: "Students Impacted" },
  { value: "200", suffix: "+", label: "FDPs & Workshops" },
];

const pillars = [
  {
    icon: Target,
    title: "Industry-First Curriculum",
    desc: "Every module is reverse-engineered from actual job descriptions and enterprise workflows — not textbook theory. Our content mirrors what companies like IBM and TCS expect on day one.",
  },
  {
    icon: Handshake,
    title: "Corporate & Government Trust",
    desc: "From delivering AI programs for IBM and Wipro to government-backed faculty training through NASSCOM — our credibility is built on results, not promises.",
  },
  {
    icon: ShieldCheck,
    title: "Accreditation-Ready Design",
    desc: "Programs are structured to meet NAAC, NBA, and AICTE outcome-based education frameworks — helping institutions score higher on quality assessments.",
  },
  {
    icon: Lightbulb,
    title: "Practitioner-Led Training",
    desc: "Our trainers are not just educators — they are ML engineers, AI architects, and data scientists with real deployment experience across production systems.",
  },
];

const recentTrainings = [
  { name: "Data Science and Artificial Intelligence", client: "IBM", audience: "AI Graduates", date: "Apr 2026" },
  { name: "Big Data & Data Lake, Data Warehouse", client: "NASSCOM Govt.", audience: "Faculty", date: "Feb 2026" },
  { name: "Advanced AI & Machine Learning", client: "Synergistic Compusoft", audience: "Graduates", date: "Dec 2025" },
  { name: "Generative AI & LLMs with RAG", client: "IBM", audience: "AI Engineers", date: "Oct 2025" },
  { name: "Applied Machine Learning using Python", client: "Wipro", audience: "IT Professionals", date: "Sep 2025" },
  { name: "Deep Learning & NLP with Python", client: "Capgemini", audience: "PG Students", date: "Jul 2025" },
  { name: "AI for Data Science & Interview Readiness", client: "TCS", audience: "Professionals", date: "May 2025" },
];

export default function TrackRecord() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-[#FAFAFA] relative overflow-hidden" data-testid="track-record">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-na-text-sec mb-3 block">
            About Neural Axis
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-tight font-medium text-na-text mb-4">
            12+ Years of Bridging<br />Industry & Academia
          </h2>
          <p className="text-base leading-relaxed text-na-text-sec max-w-3xl">
            Neural Axis was founded on a single observation: universities teach AI theory, 
            but the industry demands deployment-ready engineers. We exist to close that gap 
            &mdash; at scale, across institutions.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-20"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-xl border border-[rgba(15,23,42,0.08)] bg-white"
              data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <p className="font-heading text-4xl sm:text-5xl font-medium tracking-tighter text-na-navy mb-1">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm text-na-text-sec">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Why Neural Axis — 4 Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-20"
        >
          <h3 className="font-heading text-xl sm:text-2xl font-medium text-na-text mb-8">
            Why Institutions Choose Us
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="p-7 rounded-xl border border-[rgba(15,23,42,0.08)] bg-white hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300"
                data-testid={`pillar-${pillar.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <pillar.icon className="w-7 h-7 text-na-navy mb-4" />
                <h4 className="font-heading text-lg font-medium text-na-text mb-2">{pillar.title}</h4>
                <p className="text-sm leading-relaxed text-na-text-sec">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Content + Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <div>
            <p className="text-base leading-relaxed text-na-text-sec mb-6">
              Over the past <strong className="text-na-text font-medium">12 years</strong>, Neural Axis 
              has become a trusted training delivery partner for corporate giants 
              like <strong className="text-na-text font-medium">IBM, TCS, Wipro, and Capgemini</strong>, 
              as well as government-backed faculty programs through <strong className="text-na-text font-medium">NASSCOM</strong>.
            </p>
            <p className="text-base leading-relaxed text-na-text-sec">
              Our team comprises ML engineers, AI architects, and data scientists with 
              real deployment experience — people who've built production RAG systems, 
              fine-tuned LLMs, and shipped agentic AI workflows. That real-world DNA is 
              embedded in every program we design for your institution.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden border border-[rgba(15,23,42,0.08)]">
            <img
              src="https://images.unsplash.com/photo-1775933802859-27889463db79?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwY2FtcHVzJTIwZ2xhc3MlMjBidWlsZGluZ3xlbnwwfHx8fDE3NzcyNzUxOTN8MA&ixlib=rb-4.1.0&q=85"
              alt="Modern university campus"
              className="w-full h-64 lg:h-80 object-cover"
              data-testid="campus-image"
            />
          </div>
        </motion.div>

        {/* Recent Training Deliveries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-16"
        >
          <h3 className="font-heading text-xl sm:text-2xl font-medium text-na-text mb-6">Recent Training Deliveries</h3>
          <div className="rounded-xl border border-[rgba(15,23,42,0.08)] bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm" data-testid="trainings-table">
                <thead>
                  <tr className="border-b border-[rgba(15,23,42,0.06)] bg-[#FAFAFA]">
                    <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-na-text-sec">Program</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-na-text-sec">Client</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-na-text-sec hidden sm:table-cell">Audience</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-na-text-sec">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTrainings.map((t, i) => (
                    <tr key={i} className="border-b border-[rgba(15,23,42,0.04)] last:border-0 hover:bg-[#FAFAFA] transition-colors">
                      <td className="px-5 py-3.5 text-na-text font-medium">{t.name}</td>
                      <td className="px-5 py-3.5 text-na-text-sec">{t.client}</td>
                      <td className="px-5 py-3.5 text-na-text-sec hidden sm:table-cell">{t.audience}</td>
                      <td className="px-5 py-3.5 text-na-text-sec whitespace-nowrap">{t.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Partner Marquee */}
        <div className="py-8 border-t border-b border-[rgba(15,23,42,0.08)]">
          <Marquee speed={30} gradient={true} gradientColor="#FAFAFA" gradientWidth={80}>
            {partners.map((partner) => (
              <span
                key={partner}
                className="mx-12 text-lg font-heading font-medium text-na-text-sec/40 tracking-tight whitespace-nowrap"
              >
                {partner}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
