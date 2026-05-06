import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, Phone, ArrowRight, CheckCircle2, Video, BookOpen, Users, Award, HeadphonesIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const phases = [
  {
    id: "p1",
    badge: "Phase 1 · Days 1–7",
    title: "Build Your First AI Agent from the Ground Up",
    groups: [
      { label: "Cloud & API Foundation", items: ["Configure AWS IAM, S3, and launch your cloud environment", "Initialize Git repos and establish a version-controlled workflow", "Execute and debug Python REST API calls (GET / POST)"] },
      { label: "LLMs & Prompt Engineering", items: ["Understand transformer architecture and how LLMs generate text", "Zero-shot and few-shot prompting strategies via OpenAI / Bedrock API", "Control tone, format, and output structure through prompt design"] },
      { label: "Chatbot Architecture & Memory", items: ["Build a foundational CLI chatbot using structured prompt templates", "Engineer multi-step chains with LangChain", "Implement conversation history so the bot retains prior context"] },
      { label: "Embeddings & Semantic Search", items: ["Generate text embeddings with OpenAI Embeddings / HuggingFace models", "Store and query vectors locally using FAISS", "Build a similarity-search pipeline returning contextually relevant results"] },
    ],
    assessment: { icon: "📋", title: "Assessment 1 — Graded Lab Evaluation", desc: "End-to-end test covering APIs, prompt engineering, and vector search" },
    days: [
      { num: "DAY 1", title: "Cloud Setup & REST APIs", outcome: "Working AWS environment · API calls verified" },
      { num: "DAY 2", title: "LLMs & Prompt Engineering", outcome: "Successful generation with tone and format control" },
      { num: "DAY 3", title: "Basic Chatbot Architecture", outcome: "Functional CLI chatbot with prompt handling" },
      { num: "DAY 4", title: "Chains & Conversational Memory", outcome: "Bot retains and recalls prior context" },
      { num: "DAY 5", title: "Text Embeddings", outcome: "Text tokenized, embedded, and stored locally" },
      { num: "DAY 6", title: "Vector Search & Retrieval", outcome: "Semantic search returning relevant matches" },
      { num: "DAY 7", title: "Assessment 1 & Review", outcome: "Milestone: Foundations evaluated", isAssessment: true },
    ],
    tools: ["AWS IAM", "Python", "OpenAI API", "Bedrock", "LangChain", "FAISS", "HuggingFace"],
    color: "border-l-na-mint",
    badgeColor: "bg-na-mint-bg text-green-800",
    dotColor: "bg-na-mint",
  },
  {
    id: "p2",
    badge: "Phase 2 · Days 8–14",
    title: "Build a RAG-Powered Multi-Agent System on AWS",
    flip: true,
    groups: [
      { label: "RAG Pipeline Engineering", items: ["Text chunking strategies for document ingestion and indexing", "Build and tune a retrieval-augmented generation pipeline with LangChain + FAISS", "Reduce hallucinations using custom data and precise retrieval"] },
      { label: "AWS Serverless & Bedrock", items: ["Store datasets in S3 and deploy serverless functions via Lambda", "Expose cloud endpoints with API Gateway", "Access foundation models securely through AWS Bedrock SDK"] },
      { label: "Agentic Reasoning with LangGraph", items: ["Build a basic state-machine agent using LangGraph", "Develop multi-step reasoning agents that break down complex prompts", "Implement tool calling for autonomous decision routing"] },
      { label: "Multi-Agent Systems", items: ["Design specialized agent personas (Planner + Executor pattern)", "Enable agent-to-agent task handoff and collaboration", "Assemble and test a full end-to-end multi-agent pipeline"] },
    ],
    assessment: { icon: "📋", title: "Assessment 2 — Graded Lab Evaluation", desc: "Integrate RAG into a multi-agent framework · full pipeline demo" },
    days: [
      { num: "DAY 8", title: "Build & Tune RAG Pipelines", outcome: "Hallucination-resistant query responses" },
      { num: "DAY 9", title: "AWS Serverless Basics", outcome: "Live serverless endpoint responding to requests" },
      { num: "DAY 10", title: "Bedrock & Basic Agents", outcome: "LangGraph state machine executes tasks" },
      { num: "DAY 11", title: "Multi-Step Reasoning Agents", outcome: "Agent routes workflows autonomously" },
      { num: "DAY 12", title: "Multi-Agent Role Assignment", outcome: "AI personas hand off tasks successfully" },
      { num: "DAY 13", title: "Multi-Agent Orchestration", outcome: "Complex pipeline runs prompt-to-output" },
      { num: "DAY 14", title: "Assessment 2 & Review", outcome: "Milestone: RAG-backed agent demo evaluated", isAssessment: true },
    ],
    tools: ["AWS S3", "Lambda", "API Gateway", "Bedrock SDK", "LangGraph", "Tool Calling", "FAISS"],
    color: "border-l-na-blue",
    badgeColor: "bg-na-blue-bg text-blue-800",
    dotColor: "bg-na-blue",
  },
  {
    id: "p3",
    badge: "Phase 3 · Days 15–21",
    title: "Deploy a Full-Stack AI Application to the Cloud",
    groups: [
      { label: "LLM Evaluation & Safety", items: ["Implement custom accuracy metrics and hallucination tracking", "Add input/output safety filters using NeMo Guardrails", "Validate structured outputs with JSON Schema enforcement"] },
      { label: "Persistent Memory & Streaming", items: ["Connect vector databases for long-term personalised user memory", "Stream tokens to the console in real time via Python streaming", "Force agents to return strict JSON and call external REST APIs"] },
      { label: "Full-Stack Application Build", items: ["Build a FastAPI backend to serve the AI model as a REST service", "Connect a React / HTML frontend with fetch API calls", "Complete local full-stack app: frontend ↔ backend ↔ AI logic"] },
      { label: "Containerisation & Cloud Deployment", items: ["Write Dockerfiles to package the AI app and all dependencies", "Push the containerised stack to AWS EC2 / Lambda", "Application live via public IP/URL, stable and accessible"] },
    ],
    assessment: { icon: "📋", title: "Assessment 3 — Graded Lab Evaluation", desc: "End-to-end evaluation of the deployed AI stack on AWS" },
    days: [
      { num: "DAY 15", title: "LLM Evaluation & Guardrails", outcome: "Hallucination metrics + safety layer active" },
      { num: "DAY 16", title: "Tool-Using & Structured Output", outcome: "Agent pulls live data in strict JSON" },
      { num: "DAY 17", title: "Persistent Memory & Streaming", outcome: "Real-time generation with context recall" },
      { num: "DAY 18", title: "FastAPI Backend & React UI", outcome: "Full-stack app: frontend connected to AI" },
      { num: "DAY 19", title: "Docker Containerisation", outcome: "Containerised app running on localhost" },
      { num: "DAY 20", title: "AWS EC2 / Lambda Deployment", outcome: "Application live on public URL" },
      { num: "DAY 21", title: "Assessment 3 & Review", outcome: "Milestone: Cloud-deployed app tested", isAssessment: true },
    ],
    tools: ["FastAPI", "React", "Docker", "AWS EC2", "Vector DB", "NeMo", "LangGraph"],
    color: "border-l-amber-300",
    badgeColor: "bg-na-sand text-amber-800",
    dotColor: "bg-amber-400",
  },
  {
    id: "p4",
    badge: "Phase 4 · Days 22–28",
    title: "Capstone Project — Ship a Portfolio-Ready AI Product",
    flip: true,
    groups: [
      { label: "Scope, Architecture & Data", items: ["Define a real-world problem statement and design the data flow", "Clean and pipeline project datasets using Pandas + S3", "Produce an approved system design document"] },
      { label: "Production RAG & Agent Workflows", items: ["Configure a production LLM (Bedrock / OpenAI) with Pinecone or FAISS", "Build customised LangGraph logic for your capstone agent", "Expose core workflows via FastAPI + AWS Lambda endpoints"] },
      { label: "UI Integration & Optimisation", items: ["Develop the final React / HTML UI linked to the cloud backend", "Debug edge cases, profile latency, and stabilise the system", "Set up logging and basic AWS monitoring dashboards"] },
      { label: "Cloud Scaling & Documentation", items: ["Finalise live AWS deployments with scaling configuration", "Publish a professional README and push to GitHub", "Prepare a 10-minute capstone presentation and live demo"] },
    ],
    assessment: { icon: "🏆", title: "Assessment 4 + Final Project Demo", desc: "Defend your architecture, codebase, and live deployment — Day 28" },
    days: [
      { num: "DAY 22", title: "Scope, Architecture & Data", outcome: "Approved design doc + pipeline-ready dataset" },
      { num: "DAY 23", title: "Embeddings & RAG Integration", outcome: "Retrieval mechanism live with capstone data" },
      { num: "DAY 24", title: "Agent Workflows & API Dev", outcome: "Core agentic workflows + API endpoints ready" },
      { num: "DAY 25", title: "UI & Full System Integration", outcome: "Seamless frontend ↔ backend ↔ AI pipeline" },
      { num: "DAY 26", title: "Optimisation & Assessment 4", outcome: "Milestone: Production-ready, edge cases handled", isAssessment: true },
      { num: "DAY 27", title: "Cloud Scaling & Documentation", outcome: "Live app + professional README on GitHub" },
      { num: "DAY 28", title: "Final Project Demo & Review", outcome: "Capstone defended — portfolio ready", isAssessment: true },
    ],
    tools: ["Bedrock", "Pinecone", "LangGraph", "FastAPI", "React", "AWS EC2", "GitHub", "Docker"],
    color: "border-l-na-navy",
    badgeColor: "bg-na-blue-bg text-na-navy",
    dotColor: "bg-na-navy",
  },
];

function PhaseCard({ phase }) {
  const content = (
    <div className="flex-1 min-w-0">
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${phase.badgeColor}`}>
        <span className={`w-2 h-2 rounded-full ${phase.dotColor}`}></span>
        {phase.badge}
      </div>
      <h3 className="font-heading text-xl sm:text-2xl font-medium text-na-text mb-6 tracking-tight">{phase.title}</h3>
      <div className="space-y-5">
        {phase.groups.map((g) => (
          <div key={g.label}>
            <p className="text-sm font-semibold text-na-text mb-2">{g.label}</p>
            <ul className="space-y-1.5">
              {g.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-na-text-sec leading-relaxed">
                  <span className={`w-1.5 h-1.5 rounded-full ${phase.dotColor} mt-2 flex-shrink-0`}></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-start gap-3 p-4 rounded-lg bg-[#FAFAFA] border border-[rgba(15,23,42,0.05)]">
        <span className="text-lg">{phase.assessment.icon}</span>
        <div>
          <p className="text-sm font-semibold text-na-text">{phase.assessment.title}</p>
          <p className="text-xs text-na-text-sec mt-0.5">{phase.assessment.desc}</p>
        </div>
      </div>
    </div>
  );

  const visual = (
    <div className="flex-1 min-w-0">
      <div className="rounded-xl border border-[rgba(15,23,42,0.08)] bg-white p-5 shadow-sm">
        <div className="space-y-0">
          {phase.days.map((d) => (
            <div
              key={d.num}
              className={`flex items-start gap-3 py-3 border-b border-[rgba(15,23,42,0.04)] last:border-0 ${d.isAssessment ? "bg-na-mint-bg/30 -mx-2 px-2 rounded-lg" : ""}`}
            >
              <span className="text-[11px] font-bold text-na-navy tracking-wide whitespace-nowrap w-12 pt-0.5">{d.num}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-na-text">{d.title}</p>
                <p className="text-xs text-na-text-sec mt-0.5">{d.outcome}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-[rgba(15,23,42,0.06)]">
          {phase.tools.map((t) => (
            <span key={t} className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-[#FAFAFA] border border-[rgba(15,23,42,0.08)] text-na-text-sec">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className={`border-l-4 ${phase.color} rounded-xl bg-white p-6 sm:p-8 lg:p-10 shadow-sm border border-[rgba(15,23,42,0.06)]`}
      data-testid={`phase-${phase.id}`}
    >
      <div className={`flex flex-col ${phase.flip ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-12`}>
        {content}
        {visual}
      </div>
    </motion.div>
  );
}

export default function AgenticAICoursePage() {
  const scrollToEnroll = () => document.getElementById("enroll")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-[#FAFAFA]" data-testid="agentic-ai-course-page">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[rgba(15,23,42,0.08)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" data-testid="agentic-nav-logo">
            <Zap className="w-5 h-5 text-na-navy" />
            <span className="font-heading font-bold text-lg tracking-tight text-na-text">Neural Axis Learning Solution</span>
          </Link>
          <div className="flex items-center gap-4">
            <a href="tel:+919265802045" className="hidden sm:flex items-center gap-1.5 text-sm text-na-text-sec hover:text-na-text">
              <Phone className="w-3.5 h-3.5" /> +91 9265 802 045
            </a>
            <Button onClick={scrollToEnroll} className="bg-na-navy text-white hover:bg-na-navy/90 rounded-full px-6 text-sm" data-testid="agentic-nav-cta">
              Enroll Now
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden" data-testid="agentic-hero">
        <div className="absolute top-0 left-0 w-[40%] h-[60%] bg-[radial-gradient(circle,rgba(165,223,178,0.2)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[35%] h-[50%] bg-[radial-gradient(circle,rgba(138,180,248,0.15)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-na-text-sec mb-6">Cohort-Based Bootcamp</p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl tracking-tighter font-medium text-na-text leading-[1.1] mb-8">
              Learn by Doing.<br />
              <em className="text-na-navy not-italic">Become an Agentic AI Engineer.</em>
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-na-text-sec mb-10">
              <span className="px-3 py-1.5 rounded-full bg-[#FAFAFA] border border-[rgba(15,23,42,0.06)]">28 Days · Hands-On Bootcamp</span>
              <span className="px-3 py-1.5 rounded-full bg-[#FAFAFA] border border-[rgba(15,23,42,0.06)]">6 Hours / Day</span>
              <span className="px-3 py-1.5 rounded-full bg-[#FAFAFA] border border-[rgba(15,23,42,0.06)]">21 Days Core Training + 7 Days Capstone</span>
              <span className="px-3 py-1.5 rounded-full bg-[#FAFAFA] border border-[rgba(15,23,42,0.06)]">4 Graded Assessments + Final Project Demo</span>
            </div>
            <Button onClick={scrollToEnroll} className="bg-na-navy text-white hover:bg-na-navy/90 rounded-full px-8 py-6 text-sm font-medium" data-testid="agentic-hero-cta">
              Enroll Now <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            {/* Urgency */}
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100" data-testid="urgency-badge">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="text-sm font-medium text-red-700">Next Cohort: July 2026 — Only 15 seats remaining</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Header */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 text-center">
        <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-tight font-medium text-na-text mb-3">
          Course Outline <em className="not-italic text-na-text-sec font-normal text-xl sm:text-2xl">(Project-Based Learning)</em>
        </h2>
        <p className="text-base text-na-text-sec">Four phases. Real tools. Production deployments.</p>
      </div>

      {/* Phases */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 space-y-10">
        {phases.map((phase, idx) => (
          <div key={phase.id}>
            <PhaseCard phase={phase} />
            {/* Mid-page CTA after Phase 2 */}
            {idx === 1 && (
              <div className="mt-10 text-center py-10 rounded-2xl bg-na-mint-bg/40 border border-na-mint/20">
                <p className="text-base text-na-text-sec mb-4">Ready to build production AI agents?</p>
                <Button onClick={scrollToEnroll} className="bg-na-navy text-white hover:bg-na-navy/90 rounded-full px-8 py-5 text-sm font-medium" data-testid="mid-cta">
                  Reserve Your Seat <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-xs text-na-text-sec/60 mt-3">Only 15 seats per cohort</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Is This For You? */}
      <section className="py-20 lg:py-24 bg-white" data-testid="is-this-for-you">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-na-text-sec mb-3 block">Is This For You?</span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-tight font-medium text-na-text mb-6">
                This bootcamp is built for you if...
              </h2>
              <p className="text-base text-na-text-sec">
                Whether you're a university looking to upskill students, or a professional ready to transition into AI engineering — this program meets you where you are.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              {[
                "Your graduates struggle to get placed in AI/ML roles because they lack hands-on project experience",
                "Your institution wants to offer an industry-grade AI program but doesn't have in-house expertise",
                "Your faculty needs upskilling in Generative AI, RAG, and Agentic workflows",
                "You want students building and deploying real AI systems — not just reading theory",
                "You need a program that aligns with NAAC/NBA outcome-based education frameworks",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl bg-na-mint-bg/40 border border-na-mint/20"
                  data-testid={`for-you-${i}`}
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-na-text leading-relaxed">{item}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="py-20 lg:py-24 bg-[#FAFAFA]" data-testid="what-youll-get">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-na-text-sec mb-3 block">What's Included</span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-tight font-medium text-na-text">
              What You'll Get
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Video, title: "Live & Interactive Sessions", desc: "6 hours/day of hands-on, instructor-led training. Ask questions, get real-time feedback, and code along." },
              { icon: BookOpen, title: "Complete Course Material", desc: "Slides, code repositories, project templates, and reference documentation — yours to keep forever." },
              { icon: Users, title: "Peer Learning Community", desc: "Join a cohort of motivated learners. Collaborate on projects, share insights, and build your network." },
              { icon: Award, title: "Certificate of Completion", desc: "Industry-recognized certificate showcasing your Agentic AI engineering skills. LinkedIn-ready." },
              { icon: HeadphonesIcon, title: "30-Day Post-Training Support", desc: "Doubt resolution, project guidance, and career advice for 30 days after the bootcamp ends." },
              { icon: Clock, title: "Lifetime Access to Recordings", desc: "Missed a session? All live classes are recorded. Revisit any module anytime, at your own pace." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="p-7 rounded-xl bg-white border border-[rgba(15,23,42,0.08)] hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300"
                data-testid={`get-card-${i}`}
              >
                <div className="w-10 h-10 rounded-lg bg-na-mint-bg flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-na-navy" />
                </div>
                <h3 className="font-heading text-base font-medium text-na-text mb-2">{item.title}</h3>
                <p className="text-sm text-na-text-sec leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA after What You'll Get */}
          <div className="text-center mt-14">
            <Button onClick={scrollToEnroll} className="bg-na-navy text-white hover:bg-na-navy/90 rounded-full px-8 py-6 text-sm font-medium" data-testid="get-section-cta">
              Enroll Now — Limited Seats <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Enrollment CTA */}
      <section id="enroll" className="py-20 lg:py-24 bg-na-navy text-white" data-testid="agentic-enroll-section">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="text-3xl mb-4">🏆</p>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-tight font-medium mb-4">
              Ready to Become an Agentic AI Engineer?
            </h2>
            <p className="text-base text-white/60 mb-4 max-w-xl mx-auto">
              28 days from zero to deploying production AI agents on AWS. Limited seats per cohort.
            </p>
            {/* Urgency */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400"></span>
              </span>
              <span className="text-sm font-medium text-white/90">Next Cohort: July 2026 — Only 15 seats remaining</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://wa.me/919265802045?text=Hi%20Neural%20Axis%2C%20I%27m%20interested%20in%20the%2028-Day%20Agentic%20AI%20Engineer%20Bootcamp.%20Please%20share%20enrollment%20details." target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#25D366] hover:bg-[#25D366]/90 text-white rounded-full px-8 py-6 text-sm font-medium" data-testid="agentic-enroll-whatsapp">
                  Enroll via WhatsApp
                </Button>
              </a>
              <a href="tel:+919265802045">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-sm font-medium" data-testid="agentic-enroll-call">
                  <Phone className="w-4 h-4 mr-2" /> +91 9265 802 045
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-na-navy border-t border-white/10 text-center">
        <div className="flex items-center justify-center gap-6">
          <Link to="/" className="text-sm text-white/40 hover:text-white/60 transition-colors">← Back to Homepage</Link>
          <Link to="/courses/generative-ai" className="text-sm text-white/40 hover:text-white/60 transition-colors">Other Courses</Link>
        </div>
      </footer>
    </div>
  );
}
