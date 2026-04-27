import { motion } from "framer-motion";
import { Code2, Brain, Layers, Sparkles, Workflow, Database, MessageSquare, Container } from "lucide-react";

const technologies = [
  {
    icon: Code2,
    title: "Python",
    desc: "Industry-standard programming with Scikit-Learn, Pandas, NumPy for data science and AI applications",
    color: "bg-na-mint-bg",
  },
  {
    icon: Brain,
    title: "Machine Learning",
    desc: "Supervised, unsupervised & reinforcement learning. Feature engineering, model evaluation, and XGBoost",
    color: "bg-na-blue-bg",
  },
  {
    icon: Layers,
    title: "Deep Learning",
    desc: "Neural networks, CNNs, RNNs, and Transformers using PyTorch, TensorFlow & Keras",
    color: "bg-na-sand",
  },
  {
    icon: Sparkles,
    title: "Generative AI & LLMs",
    desc: "OpenAI models, HuggingFace, LLM fine-tuning, prompt engineering, and RAG architecture",
    color: "bg-na-mint-bg",
  },
  {
    icon: Workflow,
    title: "Agentic AI Workflows",
    desc: "Building autonomous AI agents with LangChain, LangGraph, LlamaIndex, and CrewAI for production-ready applications",
    color: "bg-white",
  },
  {
    icon: Database,
    title: "RAG & Vector Databases",
    desc: "ChromaDB, vector embeddings, document ingestion pipelines, and enterprise-ready retrieval-augmented generation",
    color: "bg-na-blue-bg",
  },
  {
    icon: MessageSquare,
    title: "NLP & Computer Vision",
    desc: "Text classification, NER, sentiment analysis, text embeddings, image classification with CNNs",
    color: "bg-na-sand",
  },
  {
    icon: Container,
    title: "MLOps & Deployment",
    desc: "MLFlow, FEAST, Docker, GitHub Actions, FastAPI & Django for production AI model deployment",
    color: "bg-na-mint-bg",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
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
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-tight font-medium text-na-text mb-4">
            Highly Specialized<br />Tech Stack
          </h2>
          <p className="text-base leading-relaxed text-na-text-sec max-w-2xl">
            From foundational Python to cutting-edge Agentic AI &mdash; our curriculum covers the full spectrum 
            of technologies demanded by the modern AI industry.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {technologies.map((tech) => (
            <motion.div
              key={tech.title}
              variants={itemVariants}
              className={`group relative p-8 rounded-xl border border-[rgba(15,23,42,0.08)] ${tech.color} hover:-translate-y-1 hover:shadow-sm transition-all duration-300 cursor-default`}
              data-testid={`tech-card-${tech.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <tech.icon className="w-7 h-7 text-na-navy mb-4" />
              <h3 className="font-heading text-lg font-medium text-na-text mb-2">{tech.title}</h3>
              <p className="text-sm leading-relaxed text-na-text-sec">{tech.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
