import { motion } from "framer-motion";
import { GraduationCap, Users, Award } from "lucide-react";

const models = [
  {
    icon: GraduationCap,
    title: "Faculty Development Programs",
    subtitle: "FDPs",
    desc: "Upskill professors with hands-on AI and Data Science training. From Python fundamentals to advanced Generative AI, we bring industry expertise directly to your faculty.",
    highlights: ["5-day intensive workshops", "Hands-on lab sessions", "Certificate of completion", "Post-training support"],
    color: "hover:bg-na-mint-bg/50",
  },
  {
    icon: Users,
    title: "Intensive Student Bootcamps",
    subtitle: "Bootcamps",
    desc: "Transform students into deployment-ready engineers through project-based learning. Each bootcamp culminates in a real-world capstone project suitable for portfolios.",
    highlights: ["Deployable capstone projects", "Industry mentorship", "Placement preparation", "GitHub portfolio building"],
    color: "hover:bg-na-blue-bg/50",
  },
  {
    icon: Award,
    title: "Curriculum Integration",
    subtitle: "Accreditation",
    desc: "Seamlessly integrate cutting-edge AI modules into your existing curriculum. Designed to meet NAAC/NBA accreditation standards and outcome-based education frameworks.",
    highlights: ["NAAC/NBA compliance", "OBE-aligned modules", "Assessment frameworks", "Industry-validated content"],
    color: "hover:bg-na-sand",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PartnershipModels() {
  return (
    <section id="solutions" className="py-24 lg:py-32 bg-white relative" data-testid="partnership-models">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-na-text-sec mb-3 block">
            Our Solutions
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-tight font-medium text-na-text">
            Partnership Models
          </h2>
          <p className="text-base leading-relaxed text-na-text-sec mt-4 max-w-2xl">
            Flexible engagement models designed for Indian universities and institutions. 
            Each program is customizable to your department&apos;s specific needs.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {models.map((model) => (
            <motion.div
              key={model.title}
              variants={itemVariants}
              className={`group relative p-8 rounded-xl border border-[rgba(15,23,42,0.08)] bg-white ${model.color} hover:-translate-y-1 hover:shadow-sm transition-all duration-300`}
              data-testid={`solution-card-${model.subtitle.toLowerCase()}`}
            >
              <div className="w-12 h-12 rounded-lg bg-na-mint-bg flex items-center justify-center mb-6">
                <model.icon className="w-6 h-6 text-na-navy" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-na-text-sec mb-2">
                {model.subtitle}
              </p>
              <h3 className="font-heading text-xl font-medium text-na-text mb-3">{model.title}</h3>
              <p className="text-sm leading-relaxed text-na-text-sec mb-6">{model.desc}</p>
              <ul className="space-y-2">
                {model.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-na-text-sec">
                    <div className="w-1.5 h-1.5 rounded-full bg-na-mint flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
