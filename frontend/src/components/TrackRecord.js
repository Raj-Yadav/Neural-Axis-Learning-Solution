import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { Award, ExternalLink } from "lucide-react";

const partners = [
  "IBM", "TCS", "Wipro", "Capgemini", "NASSCOM", "Synergistic Compusoft",
  "TalentSprint", "TOPS Technologies", "LogicRays Academy",
];

const stats = [
  { value: "8+", label: "Years of Experience" },
  { value: "50+", label: "Institutions Trained" },
  { value: "10K+", label: "Students Impacted" },
  { value: "200+", label: "FDPs & Workshops" },
];

const certifications = [
  { title: "Programming with Python for Data Science", org: "Microsoft (edX)" },
  { title: "Machine Learning for Data Science & Analytics", org: "Columbia University (edX)" },
  { title: "Deep Learning Specialization", org: "deeplearning.ai" },
  { title: "ChatGPT Prompt Engineering for Developers", org: "deeplearning.ai" },
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
            Proven Track Record
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-tight font-medium text-na-text">
            Trusted by Industry &<br />Academia Alike
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-16"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-xl border border-[rgba(15,23,42,0.08)] bg-white"
              data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <p className="font-heading text-4xl sm:text-5xl font-medium tracking-tighter text-na-navy mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-na-text-sec">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Content + Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-16"
        >
          <div>
            <p className="text-base leading-relaxed text-na-text-sec mb-6">
              With over <strong className="text-na-text font-medium">8 years of specialized industry experience</strong>, 
              Neural Axis has delivered advanced AI training programs for corporate leaders 
              like <strong className="text-na-text font-medium">IBM, TCS, Wipro, and Capgemini</strong>, as well 
              as government initiatives through <strong className="text-na-text font-medium">NASSCOM</strong>.
            </p>
            <p className="text-base leading-relaxed text-na-text-sec mb-6">
              Our programs are designed by practitioners who have worked as <strong className="text-na-text font-medium">Machine Learning Engineers</strong> and 
              <strong className="text-na-text font-medium"> AI Architects</strong> &mdash; we build production-grade skills backed by real-world 
              project experience in RAG systems, LLM fine-tuning, and agentic AI workflows.
            </p>
            <p className="text-base leading-relaxed text-na-text-sec">
              Led by <strong className="text-na-text font-medium">Raj Yadav</strong>, a Data Science & AI expert with 
              certifications from <strong className="text-na-text font-medium">Microsoft, Columbia University, and deeplearning.ai</strong>, 
              our training ensures your institution stays ahead of the AI curve.
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

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-16"
        >
          <h3 className="font-heading text-xl font-medium text-na-text mb-6">Credentials & Certifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className="p-5 rounded-xl border border-[rgba(15,23,42,0.08)] bg-white flex gap-3"
                data-testid={`cert-${cert.org.toLowerCase().replace(/[^a-z]/g, "-")}`}
              >
                <Award className="w-5 h-5 text-na-mint flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-na-text leading-snug">{cert.title}</p>
                  <p className="text-xs text-na-text-sec mt-1">{cert.org}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Training Deliveries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="font-heading text-xl font-medium text-na-text mb-6">Recent Training Deliveries</h3>
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
