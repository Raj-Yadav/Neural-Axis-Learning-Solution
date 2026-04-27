import { motion } from "framer-motion";
import { Code2, Brain, Layers, Sparkles, Workflow } from "lucide-react";

const technologies = [
  {
    icon: Code2,
    title: "Python",
    desc: "Industry-standard programming for data science and AI applications",
    color: "bg-na-mint-bg",
    span: "md:col-span-1",
  },
  {
    icon: Brain,
    title: "Machine Learning",
    desc: "Supervised, unsupervised, and reinforcement learning with scikit-learn and XGBoost",
    color: "bg-na-blue-bg",
    span: "md:col-span-1",
  },
  {
    icon: Layers,
    title: "Deep Learning",
    desc: "Neural networks, CNNs, RNNs, and Transformers using PyTorch and TensorFlow",
    color: "bg-na-sand",
    span: "md:col-span-1",
  },
  {
    icon: Sparkles,
    title: "Generative AI",
    desc: "Large Language Models, prompt engineering, RAG systems, and fine-tuning techniques",
    color: "bg-na-mint-bg",
    span: "md:col-span-1",
  },
  {
    icon: Workflow,
    title: "Agentic AI Workflows",
    desc: "Building autonomous AI agents with LangChain, LangGraph, and CrewAI for production-ready applications",
    color: "bg-white",
    span: "md:col-span-2",
    featured: true,
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

export default function CoreTechnologies() {
  return (
    <section id="technologies" className="py-24 lg:py-32 bg-[#FAFAFA]" data-testid="core-technologies">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-na-text-sec mb-3 block">
            Core Technologies
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-tight font-medium text-na-text">
            Highly Specialized<br />Tech Stack
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {technologies.map((tech) => (
            <motion.div
              key={tech.title}
              variants={itemVariants}
              className={`${tech.span} ${
                tech.featured ? "lg:col-span-2" : ""
              } group relative p-8 rounded-xl border border-[rgba(15,23,42,0.08)] ${tech.color} hover:-translate-y-1 hover:shadow-sm transition-all duration-300 cursor-default`}
              data-testid={`tech-card-${tech.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {tech.featured && (
                <img
                  src="https://static.prod-images.emergentagent.com/jobs/232eb2ab-127e-45ab-8692-12dac3629dce/images/e6e1b7f24d7b124d34ed52d5fc27f3a94d22889c2693a628d280c3427be0ac4a.png"
                  alt="Data workflow"
                  className="absolute top-4 right-4 w-24 h-24 opacity-20 group-hover:opacity-30 transition-opacity"
                />
              )}
              <tech.icon className="w-8 h-8 text-na-navy mb-4" />
              <h3 className="font-heading text-xl font-medium text-na-text mb-2">{tech.title}</h3>
              <p className="text-sm leading-relaxed text-na-text-sec">{tech.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
