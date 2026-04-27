import { motion } from "framer-motion";
import { Bot, FileSearch, GitBranch, BarChart3, Eye, MessageCircle } from "lucide-react";

const projects = [
  {
    icon: Bot,
    title: "Generative AI Chatbot using RAG",
    role: "AI Architect & Mentor",
    tech: ["LangChain", "LlamaIndex", "OpenAI", "ChromaDB"],
    highlights: [
      "Designed enterprise-ready RAG pipelines",
      "Implemented document ingestion and vector search",
      "Optimized response accuracy using prompt engineering",
    ],
    color: "bg-na-mint-bg",
  },
  {
    icon: GitBranch,
    title: "Agentic Chat Application",
    role: "AI Solution Designer",
    tech: ["LangGraph", "LangChain", "OpenAI GPT", "FastAPI", "ChromaDB", "Redis"],
    highlights: [
      "Production-grade RAG with agentic state-machine orchestration",
      "Reduced latency 40-60% via Redis caching",
      "Sub-2 second response time at scale",
    ],
    color: "bg-na-blue-bg",
  },
  {
    icon: FileSearch,
    title: "Intelligent Resume Screening",
    role: "AI Solution Designer",
    tech: ["Python", "NLP", "HuggingFace", "Text Embeddings"],
    highlights: [
      "Automated resume ranking using semantic similarity",
      "Reduced manual screening effort significantly",
    ],
    color: "bg-na-sand",
  },
  {
    icon: BarChart3,
    title: "Customer Sentiment Analysis",
    role: "ML Lead",
    tech: ["Scikit-Learn", "NLP", "Deep Learning"],
    highlights: [
      "Built sentiment classification models",
      "Delivered actionable insights from customer feedback",
    ],
    color: "bg-white",
  },
  {
    icon: Eye,
    title: "Image Classification System",
    role: "Deep Learning Engineer",
    tech: ["CNN", "TensorFlow", "Keras"],
    highlights: [
      "Designed image recognition pipelines",
      "Achieved high accuracy with optimized CNNs",
    ],
    color: "bg-na-mint-bg",
  },
  {
    icon: MessageCircle,
    title: "AI-Driven Interview Prep Tool",
    role: "AI Trainer & Consultant",
    tech: ["LLMs", "Prompt Engineering", "Python"],
    highlights: [
      "Built AI-based mock interview engine",
      "Integrated feedback and scoring mechanisms",
    ],
    color: "bg-na-blue-bg",
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

export default function ProjectPortfolio() {
  return (
    <section id="projects" className="py-24 lg:py-32 bg-white" data-testid="project-portfolio">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-na-text-sec mb-3 block">
            Real-World Projects
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-tight font-medium text-na-text mb-4">
            What Our Students Build
          </h2>
          <p className="text-base leading-relaxed text-na-text-sec max-w-2xl">
            Every bootcamp and training program culminates in production-grade capstone projects. 
            Here are examples of the caliber of work our students deliver.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className={`group p-7 rounded-xl border border-[rgba(15,23,42,0.08)] ${project.color} hover:-translate-y-1 hover:shadow-sm transition-all duration-300`}
              data-testid={`project-card-${project.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <project.icon className="w-7 h-7 text-na-navy mb-4" />
              <h3 className="font-heading text-lg font-medium text-na-text mb-1">{project.title}</h3>
              <p className="text-xs text-na-text-sec mb-4">{project.role}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-white/70 border border-[rgba(15,23,42,0.06)] text-na-text-sec"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <ul className="space-y-1.5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-na-text-sec">
                    <div className="w-1 h-1 rounded-full bg-na-mint mt-2 flex-shrink-0" />
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
